import { pageDataApi } from "../api/api";

export const pageDynamicDataQuery = (slug: string) => ({
  queryKey: ["pageData", slug],
  queryFn: () => pageDataApi.getDynamic(slug),
});

export const pageDataQuery = (slug: string) => ({
  queryKey: ["pageData", slug],
  queryFn: () => pageDataApi.get(slug),
});
