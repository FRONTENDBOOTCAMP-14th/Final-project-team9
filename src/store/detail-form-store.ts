import { create } from "zustand";
import { sanitizeDescription, meetsMinLength } from "@/utils/sanitize";

export interface DetailData {
  plan: string;
}

interface DetailFormState {
  // 메인 데이터
  detailData: DetailData;

  // 에러 상태
  errors: Partial<DetailData>;

  // 액션들
  updateDetailData: (field: keyof DetailData, value: string) => void;
  setErrors: (errors: Partial<DetailData>) => void;
  clearError: (field: keyof DetailData) => void;

  // validation
  validateForm: () => boolean;

  // 폼 리셋
  resetForm: () => void;
}

const initialDetailData: DetailData = {
  plan: "",
};

export const useDetailFormStore = create<DetailFormState>((set, get) => ({
  // 초기 상태
  detailData: initialDetailData,
  errors: {},

  // 기본 액션들
  updateDetailData: (field, value) => {
    // 입력값 살균처리 - HTML 태그 제거, 과도한 줄바꿈 정리
    const sanitizedValue = sanitizeDescription(value, 1000);

    set((state) => ({
      detailData: { ...state.detailData, [field]: sanitizedValue },
      errors: { ...state.errors, [field]: "" }, // 입력 시 에러 제거
    }));
  },

  setErrors: (errors) => set({ errors }),

  clearError: (field) =>
    set((state) => ({
      errors: { ...state.errors, [field]: "" },
    })),

  // validation 로직
  validateForm: () => {
    const { detailData } = get();
    const newErrors: Partial<DetailData> = {};
    let hasError = false;

    // 프로젝트 상세 계획 검증
    const trimmedPlan = detailData.plan.trim();
    if (!trimmedPlan) {
      newErrors.plan = "프로젝트 상세 계획을 입력해주세요";
      hasError = true;
    } else if (!meetsMinLength(trimmedPlan, 50)) {
      newErrors.plan = "프로젝트 상세 계획을 50자 이상 입력해주세요";
      hasError = true;
    } else if (trimmedPlan.length > 1000) {
      newErrors.plan = "프로젝트 상세 계획은 1000자 이하로 입력해주세요";
      hasError = true;
    }

    set({ errors: newErrors });
    return !hasError;
  },

  // 폼 리셋
  resetForm: () =>
    set({
      detailData: initialDetailData,
      errors: {},
    }),
}));
