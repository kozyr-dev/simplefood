import { pageDataApi } from "../api/api";

export const singleTypePageSectionsQuery = (slug: string, enabled: boolean) => ({
  queryKey: ["singleTypePageSections", slug],
  queryFn: () => pageDataApi.getSingleTypePageSections(slug),
  enabled,
});

export const dynamicTypePageSectionsQuery = (slug: string, enabled: boolean) => ({
  queryKey: ["dynamicTypePageSection", slug],
  queryFn: () => pageDataApi.getDynamicTypePageSections(slug),
  enabled,
});
