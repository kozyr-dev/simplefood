"use client";

import { useQuery } from "@tanstack/react-query";
import { blogDataApi } from "../api/api";

export const useBlogDataQuery = () => {
  return useQuery({
    queryKey: ["blogData"],
    queryFn: () => blogDataApi.get(),
  });
};

export const useBlogDataByCategoryQuery = (category: string) => {
  return useQuery({
    queryKey: ["blogDataByCategory", category],
    queryFn: () => blogDataApi.getByCategory(category),
  });
};
