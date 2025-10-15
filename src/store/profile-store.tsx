import { create } from "zustand";
import type { UserProfileCardProps } from "@/components/mypage/Profile"; // profile.tsx에서 타입을 가져옵니다.

interface ProfileState {
  userData: UserProfileCardProps | null;
  isModalOpen: boolean;
}

interface ProfileActions {
  setInitialState: (initialData: UserProfileCardProps) => void;
  updateProfile: (
    updatedData: Omit<UserProfileCardProps, "projectCounts">,
  ) => void;
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
  updateProfile: (updatedData) =>
    set((state) => ({
      userData: state.userData ? { ...state.userData, ...updatedData } : null,
    })),

  // 모달을 여는 함수
  openModal: () => set({ isModalOpen: true }),

  // 모달을 닫는 함수
  closeModal: () => set({ isModalOpen: false }),
}));

export default useProfileStore;
