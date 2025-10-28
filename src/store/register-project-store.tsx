import { create } from "zustand";
import {
  sanitizeProjectName,
  sanitizeDescription,
  normalizeWhitespace,
  isValidFutureDate,
  meetsMinLength,
} from "@/utils/sanitize";

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

      // 입력값 살균처리
      let sanitizedValue = value;

      if (field === "projectName") {
        // 프로젝트 이름: HTML 태그 제거, 공백 정규화, 길이 제한
        sanitizedValue = sanitizeProjectName(value, 30);
      } else if (field === "description") {
        // 설명: HTML 태그 제거, 과도한 줄바꿈 제거, 길이 제한
        sanitizedValue = sanitizeDescription(value, 100);
      } else if (field === "category") {
        // 카테고리: 공백 정규화
        sanitizedValue = normalizeWhitespace(value);
      }

      // 필드 업데이트 및 해당 오류 메시지 초기화
      set({
        formData: { ...state.formData, [field]: sanitizedValue },
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
      const trimmedProjectName = formData.projectName.trim();
      if (trimmedProjectName === "") {
        newErrors.projectName = "프로젝트 이름을 입력해주세요";
        hasError = true;
      } else if (trimmedProjectName.length < 2) {
        newErrors.projectName = "프로젝트 이름은 최소 2자 이상이어야 합니다";
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
      } else if (!isValidFutureDate(formData.deadline)) {
        newErrors.deadline = "마감일은 오늘 이후의 날짜여야 합니다";
        hasError = true;
      }

      // 프로젝트 간단 소개 최소 글자 수 검증
      if (!meetsMinLength(formData.description, 10)) {
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
