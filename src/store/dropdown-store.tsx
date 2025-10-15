import { create } from "zustand";

interface DropdownState {
  selectedValues: Record<string, string | null>;
  setSelected: (key: string, value: string) => void;
  resetAll: () => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  selectedValues: {},
  setSelected: (key, value) =>
    set((state) => ({
      selectedValues: { ...state.selectedValues, [key]: value },
    })),
  resetAll: () => set({ selectedValues: {} }),
}));
