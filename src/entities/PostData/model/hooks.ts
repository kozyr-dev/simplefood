"use client";

import { useQuery } from "@tanstack/react-query";
import { postDataQuery, postDataDynamicQuery } from "./queries";

export const usePostDataQuery = (slug: string) => {
  return useQuery(postDataQuery(slug));
};

export const usePostDataDynamicQuery = (slug: string) => {
  return useQuery(postDataDynamicQuery(slug));
};
