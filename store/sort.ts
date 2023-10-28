import { create } from "zustand";

type SortOptions = {
  value: string;
  label: string;
};

interface State {
  selectedSort: SortOptions;
}

interface Actions {
  setSort: (selectedSort: SortOptions) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  selectedSort: {
    value: "",
    label: "",
  },
};

export const useSortStore = create<State & Actions>((set) => ({
  selectedSort: INITIAL_STATE.selectedSort,
  setSort: (selectedSort) => set({ selectedSort: selectedSort }),
}));
