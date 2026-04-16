import { headerMenuApi, dropdownMenuApi, footerMenuApi } from "../api/api";

export const headerMenuQuery = () => ({
  queryKey: ["header-menu"],
  queryFn: headerMenuApi.get,
});

export const footerMenuQuery = () => ({
  queryKey: ["footer-menu"],
  queryFn: footerMenuApi.get,
});

export const dropdownMenuQuery = () => ({
  queryKey: ["dropdown-menu"],
  queryFn: dropdownMenuApi.get,
});
