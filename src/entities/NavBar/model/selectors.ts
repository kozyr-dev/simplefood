import { useNavBarStore } from "./store";
import { NavBarState } from "./types";

export const useIsDropdownMenuOpen = () => {
  return useNavBarStore((state: NavBarState) => state.isDropdownMenuOpen);
};

export const useSetDropdownMenuOpen = () => {
  return useNavBarStore((state: NavBarState) => state.setDropdownMenuOpen);
};
