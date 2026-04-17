import { NavBarState } from "./types";
import { createStore } from "@/shared/lib/zustand/create-store";

export const useNavBarStore = createStore<NavBarState>((set) => ({
  isDropdownMenuOpen: false,
  setDropdownMenuOpen: (isOpen) => set({ isDropdownMenuOpen: isOpen }),
}));
