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
        const { error: tableError } = await supabase
          .from("users")
          .update({
            introduction: updatedData.bio,
            field: updatedData.positions,
            tech_stacks: updatedData.experience,
            skills: updatedData.skills,
            profile_image: finalImageUrl,
          })
          .eq("id", user.id);

        if (tableError) {
          // users 테이블 컬럼 불일치 등으로 실패할 수 있음. 로그만 남기고 UI는 유지합니다.
          console.warn("users 테이블 업데이트 경고:", tableError);
        }
      } catch (e) {
        console.warn("users 테이블 업데이트 중 예외 발생:", e);
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
