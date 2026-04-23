import { pageDataApi } from "../api/api";

export const singleTypePageSectionsQuery = (slug: string) => ({
  queryKey: ["singleTypePageSections", slug],
  queryFn: () => pageDataApi.getSingleTypePageSections(slug),
});

export const singleTypePageSectionQuery = (slug: string, section_slug: string) => ({
  queryKey: ["singleTypePageSection", slug, section_slug],
  queryFn: () => pageDataApi.getSingleTypePageSection(slug, section_slug),
});
