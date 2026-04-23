"use client";

import { useQuery } from "@tanstack/react-query";
import { singleTypePageSectionsQuery, singleTypePageSectionQuery } from "./queries";

export const useSingleTypePageSectionsQuery = (slug: string) => {
  return useQuery(singleTypePageSectionsQuery(slug));
};

export const useSingleTypePageSectionQuery = (slug: string, section_slug: string) => {
  return useQuery(singleTypePageSectionQuery(slug, section_slug));
};
