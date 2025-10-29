import { create } from "zustand";
import type { UserProfileCardProps } from "@/components/mypage/Profile"; // profile.tsx에서 타입을 가져옵니다.
import { supabase } from "@/lib/supabase";

// 스토어의 상태 타입을 정의
interface ProfileState {
  userData: UserProfileCardProps | null;
  isModalOpen: boolean;
}

// 수정 가능한 프로필 데이터 타입을 정의
type EditableProfileData = Omit<UserProfileCardProps, "projectCounts">;

interface ProfileActions {
  setInitialState: (initialData: UserProfileCardProps) => void;
  updateProfile: (
    updatedData: EditableProfileData,
    imageFile: File | null,
  ) => Promise<void>;
  openModal: () => void;
  closeModal: () => void;
}

// Zustand 스토어를 생성합니다.
const useProfileStore = create<ProfileState & ProfileActions>((set) => ({
  // 초기 상태 값
  userData: null,
  isModalOpen: false,

  // 액션 구현
  // 서버 컴포넌트에서 받은 초기 props로 상태를 설정하는 함수
  setInitialState: (initialData) => set({ userData: initialData }),

  // 프로필 정보를 업데이트하는 함수
  // src/store/profile-store.tsx

  // ... (다른 코드) ...

  // 프로필 정보를 업데이트하는 함수
  updateProfile: async (updatedData, imageFile) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      let finalImageUrl = updatedData.profile_image;

      // 1. 새로운 이미지 파일이 있으면 Supabase 스토리지에 업로드
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `profiles/${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("profile-images")
          .getPublicUrl(filePath);
        finalImageUrl = publicUrlData.publicUrl;
      }
      // 2. Supabase Auth의 user_metadata와 'users' 테이블을 업데이트합니다.
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          ...updatedData, // 한 줄 소개, 기술 스택 등 다른 메타데이터도 함께 업데이트
          profile_image: finalImageUrl,
        },
      });

      if (metadataError) throw metadataError;

      // Auth metadata 업데이트가 성공하면 클라이언트 상태는 우선 갱신합니다.
      set((state) => ({
        userData: state.userData
          ? {
              ...state.userData,
              ...updatedData,
              profile_image: finalImageUrl,
            }
          : null,
      }));

      try {
        // 업데이트할 데이터 준비
        const updateData: {
          bio: string;
          profile_image: string;
          nickname?: string;
        } = {
          bio: updatedData.bio,
          profile_image: finalImageUrl,
        };

        // nickname이 있으면 추가
        if (updatedData.nickname) {
          updateData.nickname = updatedData.nickname;
        }

        const { error: tableError } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", user.id)
          .select();

        if (tableError) {
          throw tableError; // alert() 삭제, 에러 던지기
        }

        // user_metadata에 positions와 careers 저장 (드롭다운 값 그대로 유지)
        if (updatedData.positions || updatedData.careers) {
          const { error: metadataError } = await supabase.auth.updateUser({
            data: {
              positions: updatedData.positions || "",
              careers: updatedData.careers || "",
            },
          });

          if (metadataError) {
            console.warn("user_metadata 업데이트 실패:", metadataError); // console.error 대신 warn 사용
          }

          // careers 값을 users 테이블의 career_id로 변환하여 저장
          if (updatedData.careers) {
            // 드롭다운 값을 DB 값으로 매핑
            const careerMapping: Record<string, string> = {
              "신입(1년 미만)": "1년 미만",
              "주니어(1~3년)": "1년",
              "미들(3~5년)": "3년",
              "시니어(5년 이상)": "5년 이상",
              "10년 이상": "10년 이상",
            };

            const dbCareerName =
              careerMapping[updatedData.careers] || updatedData.careers;

            // 모든 경력 정보를 가져와서 매칭
            const { data: allCareers } = await supabase
              .from("careers")
              .select("id, name");

            let careerData = null;
            if (allCareers) {
              // 매핑된 값으로 정확히 일치하는 것을 찾기
              careerData = allCareers.find((c) => c.name === dbCareerName);

              // 정확히 일치하지 않으면 유사한 것 찾기 (공백 제거 후 비교)
              if (!careerData) {
                const normalizedCareer = dbCareerName.replace(/\s/g, "");
                careerData = allCareers.find(
                  (c) => c.name.replace(/\s/g, "") === normalizedCareer,
                );
              }
            }

            if (careerData) {
              const { error: careerUpdateError } = await supabase
                .from("users")
                .update({ career_id: careerData.id })
                .eq("id", user.id);

              if (careerUpdateError) {
                console.warn("career_id 업데이트 실패:", careerUpdateError);
              }
            }
          }

          // positions 값을 users 테이블의 position_id로 변환하여 저장
          if (updatedData.positions) {
            // positions 테이블에서 해당 포지션 찾기
            const { data: positionData } = await supabase
              .from("positions")
              .select("id, name")
              .eq("name", updatedData.positions)
              .single();

            if (positionData) {
              const { error: positionUpdateError } = await supabase
                .from("users")
                .update({ position_id: positionData.id })
                .eq("id", user.id);

              if (positionUpdateError) {
                console.warn("position_id 업데이트 실패:", positionUpdateError);
              }
            }
          }
        }

        // 기술스택 업데이트
        if (updatedData.tech_stacks && updatedData.tech_stacks.length > 0) {
          // 1. 기존 기술스택 삭제
          const { error: deleteError } = await supabase
            .from("user_tech_stacks")
            .delete()
            .eq("user_id", user.id);

          if (deleteError) {
            console.warn("기존 기술스택 삭제 실패:", deleteError);
          }

          // 2. 각 기술스택마다 개별적으로 검색
          const stackIds: Array<{ id: number; name: string }> = [];
          for (const stackName of updatedData.tech_stacks) {
            const { data: foundStacks } = await supabase
              .from("tech_stacks")
              .select("id, name")
              .ilike("name", stackName);

            if (foundStacks && foundStacks.length > 0) {
              stackIds.push(foundStacks[0]);
            }
          }

          if (stackIds.length > 0) {
            // 3. 새로운 기술스택 삽입
            const stacksToInsert = stackIds.map((stack) => ({
              user_id: user.id,
              tech_stack_id: stack.id,
            }));

            const { error: insertError } = await supabase
              .from("user_tech_stacks")
              .insert(stacksToInsert);

            if (insertError) {
              console.warn("기술스택 삽입 실패:", insertError);
            }
          } else {
            console.warn("기술스택 ID를 찾을 수 없습니다!");
          }
        }
      } catch (e) {
        throw e; // alert() 삭제, 에러 던지기
      }
    } catch (error) {
      throw error; // alert() 삭제, 에러 던지기
    }
  },
  // 모달을 여는 함수
  openModal: () => set({ isModalOpen: true }),

  // 모달을 닫는 함수
  closeModal: () => set({ isModalOpen: false }),
}));

export default useProfileStore;
