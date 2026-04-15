"use client";

import { useQuery } from "@tanstack/react-query";
import globalOptionsApi from "../api/api";

export const useOptionsQuery = () => {
  return useQuery({
    queryKey: ["options"],
    queryFn: globalOptionsApi.get,
  });
};
