import { fetchAPI } from "@/shared/utils/helpers/api";
import { HeaderMenuResponseType, FooterMenuResponseType, DropdownMenuResponseType } from "../types/types";

export const headerMenuApi = {
  get: (): Promise<HeaderMenuResponseType> =>
    fetchAPI("/header-menu", {
      populate: "*",
    }),
};

export const footerMenuApi = {
  get: (): Promise<FooterMenuResponseType> =>
    fetchAPI("/footer-menu", {
      populate: "*",
    }),
};

export const dropdownMenuApi = {
  get: (): Promise<DropdownMenuResponseType> =>
    fetchAPI("/dropdown-menu", {
      populate: "*",
    }),
};
