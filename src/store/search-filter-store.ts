import { create } from "zustand";

export interface SearchFilters {
  searchQuery: string; // 검색어
  position: string; // 직무
  duration: string; // 기간
  field: string; // 분야
  domain: string; // 도메인
  tags: string[]; // 선택된 태그들
}

interface SearchFilterState {
  // 필터 데이터
  filters: SearchFilters;

  // 검색 결과 상태
  hasSearched: boolean;

  // Actions
  setSearchQuery: (query: string) => void;
  setPosition: (position: string) => void;
  setDuration: (duration: string) => void;
  setField: (field: string) => void;
  setDomain: (domain: string) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  resetFilters: () => void;
  setHasSearched: (value: boolean) => void;
}

const initialFilters: SearchFilters = {
  searchQuery: "",
  position: "",
  duration: "",
  field: "",
  domain: "",
  tags: [],
};

export const useSearchFilterStore = create<SearchFilterState>((set) => ({
  filters: initialFilters,
  hasSearched: false,

  setSearchQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    })),

  setPosition: (position) =>
    set((state) => ({
      filters: { ...state.filters, position },
    })),

  setDuration: (duration) =>
    set((state) => ({
      filters: { ...state.filters, duration },
    })),

  setField: (field) =>
    set((state) => ({
      filters: { ...state.filters, field },
    })),

  setDomain: (domain) =>
    set((state) => ({
      filters: { ...state.filters, domain },
    })),

  addTag: (tag) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tags: [...state.filters.tags, tag],
      },
    })),

  removeTag: (tag) =>
    set((state) => ({
      filters: {
        ...state.filters,
        tags: state.filters.tags.filter((t) => t !== tag),
      },
    })),

  resetFilters: () =>
    set({
      filters: initialFilters,
      hasSearched: false,
    }),

  setHasSearched: (value) =>
    set({
      hasSearched: value,
    }),
}));
