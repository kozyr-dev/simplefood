import { pageApi } from "../api/api";

export const pageQuery = (slug: string) => ({
  queryKey: ["page", slug],
  queryFn: () => pageApi.get(slug),
});
