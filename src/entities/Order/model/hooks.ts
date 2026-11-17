"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export const useMyOrdersQuery = (page: number, enabled: boolean) =>
  useQuery({
    queryKey: ["myOrders", page],
    queryFn: () => ordersApi.mine(page),
    enabled,
    placeholderData: keepPreviousData,
    // Personal data: refetched each time the account page opens.
    staleTime: 0,
  });
