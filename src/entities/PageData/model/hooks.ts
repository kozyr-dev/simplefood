"use client";

import { useQuery } from "@tanstack/react-query";
import { pageDataApi } from "../api/api";

export const usePageDynamicDataQuery = (slug: string) => {
  return useQuery({
    queryKey: ["pageDynamicData", slug],
    queryFn: () => pageDataApi.getDynamic(slug),
  });
};

export const usePageDataQuery = (slug: string) => {
  return useQuery({
    queryKey: ["pageData", slug],
    queryFn: () => pageDataApi.get(slug),
  });
};
