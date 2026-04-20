"use client";

import { useQuery } from "@tanstack/react-query";
import {
  singleTypePageSectionsQuery,
  singleTypePageSectionQuery,
  pageDataQuery,
  pageDynamicDataQuery,
} from "./queries";

export const useSingleTypePageSectionsQuery = (slug: string) => {
  return useQuery(singleTypePageSectionsQuery(slug));
};

export const useSingleTypePageSectionQuery = (slug: string, section_slug: string) => {
  return useQuery(singleTypePageSectionQuery(slug, section_slug));
};

export const usePageDynamicDataQuery = (slug: string) => {
  return useQuery(pageDynamicDataQuery(slug));
};

export const usePageDataQuery = (slug: string) => {
  return useQuery(pageDataQuery(slug));
};
