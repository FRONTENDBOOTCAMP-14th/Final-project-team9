import { create } from "zustand";

interface DropdownState {
  selected: string | null;
  setSelected: (value: string) => void;
}

export const useDropdownStore = create<DropdownState>((set) => ({
  selected: null,
  setSelected: (value) => set({ selected: value }),
}));
