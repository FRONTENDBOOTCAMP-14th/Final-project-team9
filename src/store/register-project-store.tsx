import { create } from "zustand";

export interface FormData {
  projectName: string;
  category: string;
  deadline: string;
  description: string;
}

export interface FormErrors {
  projectName: string;
  category: string;
  deadline: string;
  description: string;
}

interface RegisterProjectState {
  formData: FormData;
  errors: FormErrors;
  setFormData: (data: Partial<FormData>) => void;
  setErrors: (errors: Partial<FormErrors>) => void;
  updateField: (field: keyof FormData, value: string) => void;
  clearError: (field: keyof FormErrors) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

const initialFormData: FormData = {
  projectName: "",
  category: "",
  deadline: "",
  description: "",
};

const initialErrors: FormErrors = {
  projectName: "",
  category: "",
  deadline: "",
  description: "",
};

export const useRegisterProjectStore = create<RegisterProjectState>(
  (set, get) => ({
    formData: initialFormData,
    errors: initialErrors,

    setFormData: (data) =>
      set((state) => ({
        formData: { ...state.formData, ...data },
      })),

    setErrors: (errors) =>
      set((state) => ({
        errors: { ...state.errors, ...errors },
      })),

    updateField: (field, value) => {
      const state = get();

      // 글자 수 제한 검증
      if (field === "projectName" && value.length > 30) {
        return;
      }
      if (field === "description" && value.length > 100) {
        return;
      }

      // 필드 업데이트 및 해당 오류 메시지 초기화
      set({
        formData: { ...state.formData, [field]: value },
        errors: { ...state.errors, [field]: "" },
      });
    },

    clearError: (field) =>
      set((state) => ({
        errors: { ...state.errors, [field]: "" },
      })),

    validateForm: () => {
      const { formData } = get();
      let hasError = false;
      const newErrors: FormErrors = {
        projectName: "",
        category: "",
        deadline: "",
        description: "",
      };

      // 프로젝트 이름 검증
      if (formData.projectName.trim() === "") {
        newErrors.projectName = "프로젝트 이름을 입력해주세요";
        hasError = true;
      }

      // 분야 선택 검증
      if (formData.category.trim() === "") {
        newErrors.category = "분야를 선택해주세요";
        hasError = true;
      }

      // 모집 마감일 검증
      if (formData.deadline === "") {
        newErrors.deadline = "모집 마감일을 선택해주세요";
        hasError = true;
      }

      // 프로젝트 간단 소개 최소 글자 수 검증
      if (formData.description.length < 10) {
        newErrors.description = "최소 10자 이상 입력해주세요";
        hasError = true;
      }

      set({ errors: newErrors });
      return !hasError;
    },

    resetForm: () =>
      set({
        formData: initialFormData,
        errors: initialErrors,
      }),
  }),
);
