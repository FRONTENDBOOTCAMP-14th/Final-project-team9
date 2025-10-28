import { create } from "zustand";
import {
  sanitizeHTML,
  normalizeWhitespace,
  sanitizeArray,
} from "@/utils/sanitize";

export interface TeamData {
  domain: string;
  schedule: string;
  techStack: string[];
  positions: { role: string; count: number }[];
  requirements: string[];
  preferences: string[];
}

interface TeamFormState {
  // 메인 데이터
  teamData: TeamData;

  // 입력 중인 임시 데이터
  techStackInput: string;
  preferencesInput: string;

  // 에러 상태
  errors: {
    domain: string;
    schedule: string;
    techStack: string;
    positions: string;
  };

  // 드롭다운 상태
  domainDropdownOpen: boolean;
  scheduleDropdownOpen: boolean;
  positionDropdownOpen: boolean[];

  // 액션들
  updateTeamData: (
    field: keyof TeamData,
    value: TeamData[keyof TeamData],
  ) => void;
  setTechStackInput: (value: string) => void;
  setPreferencesInput: (value: string) => void;

  // 에러 관리
  setError: (field: keyof TeamFormState["errors"], message: string) => void;
  clearError: (field: keyof TeamFormState["errors"]) => void;
  clearAllErrors: () => void;

  // 드롭다운 관리
  setDomainDropdownOpen: (open: boolean) => void;
  setScheduleDropdownOpen: (open: boolean) => void;
  setPositionDropdownOpen: (dropdowns: boolean[]) => void;
  updatePositionDropdownOpen: (index: number, open: boolean) => void;

  // 배열 관리 액션들
  addTechStack: (tech: string) => void;
  removeTechStack: (tech: string) => void;
  addPosition: () => void;
  removePosition: (index: number) => void;
  updatePositionRole: (index: number, role: string) => void;
  updatePositionCount: (index: number, change: number) => void;
  addRequirement: () => void;
  updateRequirement: (index: number, value: string) => void;
  addPreference: (preference: string) => void;
  removePreference: (preference: string) => void;

  // 폼 리셋
  resetForm: () => void;
}

const initialTeamData: TeamData = {
  domain: "",
  schedule: "",
  techStack: [],
  positions: [{ role: "", count: 1 }],
  requirements: [""],
  preferences: [],
};

export const useTeamFormStore = create<TeamFormState>((set, _get) => ({
  // 초기 상태
  teamData: initialTeamData,
  techStackInput: "",
  preferencesInput: "",
  errors: {
    domain: "",
    schedule: "",
    techStack: "",
    positions: "",
  },
  domainDropdownOpen: false,
  scheduleDropdownOpen: false,
  positionDropdownOpen: [],

  // 기본 액션들
  updateTeamData: (field, value) =>
    set((state) => ({
      teamData: { ...state.teamData, [field]: value },
    })),

  setTechStackInput: (value) => set({ techStackInput: value }),
  setPreferencesInput: (value) => set({ preferencesInput: value }),

  // 에러 관리
  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),
  clearError: (field) =>
    set((state) => ({
      errors: { ...state.errors, [field]: "" },
    })),
  clearAllErrors: () =>
    set({
      errors: {
        domain: "",
        schedule: "",
        techStack: "",
        positions: "",
      },
    }),

  // 드롭다운 관리
  setDomainDropdownOpen: (open) => set({ domainDropdownOpen: open }),
  setScheduleDropdownOpen: (open) => set({ scheduleDropdownOpen: open }),
  setPositionDropdownOpen: (dropdowns) =>
    set({ positionDropdownOpen: dropdowns }),
  updatePositionDropdownOpen: (index, open) =>
    set((state) => {
      const newDropdowns = [...state.positionDropdownOpen];
      newDropdowns[index] = open;
      return { positionDropdownOpen: newDropdowns };
    }),

  // 기술 스택 관리
  addTechStack: (tech) =>
    set((state) => {
      // 입력값 살균처리
      const sanitizedTech = normalizeWhitespace(sanitizeHTML(tech));

      if (sanitizedTech && !state.teamData.techStack.includes(sanitizedTech)) {
        return {
          teamData: {
            ...state.teamData,
            techStack: sanitizeArray([
              ...state.teamData.techStack,
              sanitizedTech,
            ]),
          },
          techStackInput: "",
          errors: { ...state.errors, techStack: "" },
        };
      }
      return state;
    }),

  removeTechStack: (tech) =>
    set((state) => ({
      teamData: {
        ...state.teamData,
        techStack: state.teamData.techStack.filter((t) => t !== tech),
      },
    })),

  // 포지션 관리
  addPosition: () =>
    set((state) => ({
      teamData: {
        ...state.teamData,
        positions: [...state.teamData.positions, { role: "", count: 1 }],
      },
      positionDropdownOpen: [...state.positionDropdownOpen, false],
      errors: { ...state.errors, positions: "" },
    })),

  removePosition: (index) =>
    set((state) => {
      if (state.teamData.positions.length > 1) {
        return {
          teamData: {
            ...state.teamData,
            positions: state.teamData.positions.filter((_, i) => i !== index),
          },
          positionDropdownOpen: state.positionDropdownOpen.filter(
            (_, i) => i !== index,
          ),
        };
      }
      return state;
    }),

  updatePositionRole: (index, role) =>
    set((state) => {
      // 역할명 살균처리
      const sanitizedRole = normalizeWhitespace(sanitizeHTML(role));
      const newPositions = [...state.teamData.positions];
      newPositions[index] = { ...newPositions[index], role: sanitizedRole };
      return {
        teamData: { ...state.teamData, positions: newPositions },
        errors: { ...state.errors, positions: "" },
      };
    }),

  updatePositionCount: (index, change) =>
    set((state) => {
      const newPositions = [...state.teamData.positions];
      newPositions[index] = {
        ...newPositions[index],
        count: Math.max(1, newPositions[index].count + change),
      };
      return {
        teamData: { ...state.teamData, positions: newPositions },
      };
    }),

  // 요구사항 관리
  addRequirement: () =>
    set((state) => ({
      teamData: {
        ...state.teamData,
        requirements: [...state.teamData.requirements, ""],
      },
    })),

  updateRequirement: (index, value) =>
    set((state) => {
      // 요구사항 살균처리
      const sanitizedValue = sanitizeHTML(value);
      const newRequirements = [...state.teamData.requirements];
      newRequirements[index] = sanitizedValue;
      return {
        teamData: { ...state.teamData, requirements: newRequirements },
      };
    }),

  // 우대사항 관리
  addPreference: (preference) =>
    set((state) => {
      // 우대사항 살균처리
      const sanitizedPreference = normalizeWhitespace(sanitizeHTML(preference));

      if (
        sanitizedPreference &&
        !state.teamData.preferences.includes(sanitizedPreference)
      ) {
        return {
          teamData: {
            ...state.teamData,
            preferences: sanitizeArray([
              ...state.teamData.preferences,
              sanitizedPreference,
            ]),
          },
          preferencesInput: "",
        };
      }
      return state;
    }),

  removePreference: (preference) =>
    set((state) => ({
      teamData: {
        ...state.teamData,
        preferences: state.teamData.preferences.filter((p) => p !== preference),
      },
    })),

  // 폼 리셋
  resetForm: () =>
    set({
      teamData: initialTeamData,
      techStackInput: "",
      preferencesInput: "",
      domainDropdownOpen: false,
      scheduleDropdownOpen: false,
      positionDropdownOpen: [],
    }),
}));
