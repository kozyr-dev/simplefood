"use client";

import { useQuery } from "@tanstack/react-query";
import { headerMenuApi, dropdownMenuApi, footerMenuApi } from "../api/api";

export const useHeaderMenuQuery = () => {
  return useQuery({
    queryKey: ["header-menu"],
    queryFn: headerMenuApi.get,
  });
};

export const useFooterMenuQuery = () => {
  return useQuery({
    queryKey: ["footer-menu"],
    queryFn: footerMenuApi.get,
  });
};

export const useDropDownMenuQuery = () => {
  return useQuery({
    queryKey: ["dropdown-menu"],
    queryFn: dropdownMenuApi.get,
  });
};
