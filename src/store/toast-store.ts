import { create } from "zustand";

interface ToastState {
  isVisible: boolean;
  message: string;
  // (옵션) 'success' | 'error' | 'warning' 등 타입을 추가할 수 있습니다.
  type: "success" | "error";
  showToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isVisible: false,
  message: "",
  type: "success",
  showToast: (message, type = "success") =>
    set({ isVisible: true, message, type }),
  hideToast: () => set({ isVisible: false, message: "" }),
}));
