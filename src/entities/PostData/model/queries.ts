import { postDataApi } from "../api/api";

export const postDataQuery = (slug: string, enabled: boolean = true) => ({
  queryKey: ["postData", slug],
  queryFn: () => postDataApi.get(slug),
  enabled,
});

export const postDataDynamicQuery = (slug: string, enabled: boolean = true) => ({
  queryKey: ["postDataDynamic", slug],
  queryFn: () => postDataApi.getDynamic(slug),
  enabled,
});
