"use client";

import { useQuery } from "@tanstack/react-query";
import { blogDataApi } from "../api/api";

export const useBlogDataQuery = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ["blogData", page, pageSize],
    queryFn: () => blogDataApi.get(page, pageSize),
  });
};

export const useBlogDataByCategoryQuery = (category: string, page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ["blogDataByCategory", category, page, pageSize],
    queryFn: () => blogDataApi.getByCategory(category, page, pageSize),
  });
};
