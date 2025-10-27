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
    imageFile: File | null
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
      // users 테이블 업데이트는 환경에 따라 실패할 수 있으므로(스키마 불일치 등)
      // UI 반영을 위해 먼저 상태를 업데이트합니다.
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
        console.log("users 테이블 업데이트 시도:", {
          user_id: user.id,
          bio: updatedData.bio,
          profile_image: finalImageUrl,
          positions: updatedData.positions,
          careers: updatedData.careers,
        });

        // 업데이트할 데이터 준비
        const updateData: {
          bio: string;
          profile_image: string;
        } = {
          bio: updatedData.bio,
          profile_image: finalImageUrl,
        };

        console.log("최종 업데이트 데이터:", updateData);

        const { data: updateResult, error: tableError } = await supabase
          .from("users")
          .update(updateData)
          .eq("id", user.id)
          .select();

        console.log("users 테이블 업데이트 결과:", {
          updateResult,
          tableError,
        });

        if (tableError) {
          console.error("users 테이블 업데이트 실패:", tableError);
          alert(`프로필 업데이트 실패: ${tableError.message}`);
        } else {
          console.log("users 테이블 업데이트 성공!");
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
            console.error("user_metadata 업데이트 실패:", metadataError);
          } else {
            console.log("user_metadata 업데이트 성공!");
          }
        }

        // 기술스택 업데이트
        if (updatedData.tech_stacks && updatedData.tech_stacks.length > 0) {
          console.log("기술스택 업데이트 시작:", updatedData.tech_stacks);

          // 1. 기존 기술스택 삭제
          const { error: deleteError } = await supabase
            .from("user_tech_stacks")
            .delete()
            .eq("user_id", user.id);

          if (deleteError) {
            console.error("기존 기술스택 삭제 실패:", deleteError);
          } else {
            console.log("기존 기술스택 삭제 성공");
          }

          // 2. 기술스택 이름으로 ID 조회 (대소문자 구분 없이)
          const { data: stacksData, error: stacksError } = await supabase
            .from("tech_stacks")
            .select("id, name")
            .ilike("name", updatedData.tech_stacks.join("|"));

          console.log("기술스택 ID 조회 결과:", { stacksData, stacksError });
          console.log("검색한 기술스택 이름들:", updatedData.tech_stacks);

          // 각 기술스택마다 개별적으로 검색
          const stackIds: Array<{ id: number; name: string }> = [];
          for (const stackName of updatedData.tech_stacks) {
            const { data: foundStacks } = await supabase
              .from("tech_stacks")
              .select("id, name")
              .ilike("name", stackName);

            console.log(`"${stackName}" 검색 결과:`, foundStacks);

            if (foundStacks && foundStacks.length > 0) {
              stackIds.push(foundStacks[0]);
            }
          }

          console.log("최종 찾은 기술스택 ID들:", stackIds);

          if (stackIds.length > 0) {
            // 3. 새로운 기술스택 삽입
            const stacksToInsert = stackIds.map((stack) => ({
              user_id: user.id,
              tech_stack_id: stack.id,
            }));

            console.log("삽입할 기술스택:", stacksToInsert);

            const { error: insertError } = await supabase
              .from("user_tech_stacks")
              .insert(stacksToInsert);

            if (insertError) {
              console.error("기술스택 삽입 실패:", insertError);
            } else {
              console.log("기술스택 삽입 성공!");
            }
          } else {
            console.error("기술스택 ID를 찾을 수 없습니다!");
          }
        }
      } catch (e) {
        console.error("users 테이블 업데이트 중 예외 발생:", e);
        alert("프로필 업데이트 중 오류가 발생했습니다.");
      }

      // 3. (이미 위에서 상태를 업데이트했으므로 추가 작업은 없습니다.)
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
      alert("프로필 업데이트에 실패했습니다.");
    }
  },
  // 모달을 여는 함수
  openModal: () => set({ isModalOpen: true }),

  // 모달을 닫는 함수
  closeModal: () => set({ isModalOpen: false }),
}));

export default useProfileStore;
