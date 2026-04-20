"use client";

import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../api/api";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsApi.get,
    staleTime: 60 * 1000, // 1 minute
  });
};
