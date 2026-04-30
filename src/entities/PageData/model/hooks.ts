"use client";

import { useQuery } from "@tanstack/react-query";
import { singleTypePageSectionsQuery, dynamicTypePageSectionsQuery } from "./queries";

export const useSingleTypePageSectionsQuery = (slug: string, enabled: boolean) => {
  return useQuery(singleTypePageSectionsQuery(slug, enabled));
};

export const useDynamicTypePageSectionsQuery = (slug: string, enabled: boolean) => {
  return useQuery(dynamicTypePageSectionsQuery(slug, enabled));
};
