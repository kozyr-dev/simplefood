import { apiFetch, type DataResponse, type Page } from "@/shared/api";

/** The homepage is the page with this slug. */
export const HOME_PAGE_SLUG = "home";

export const pageApi = {
  /** A published page with its sections resolved; ApiError 404 for unknown or unpublished ones. */
  get: async (slug: string): Promise<Page> =>
    (await apiFetch<DataResponse<Page>>(`/pages/${encodeURIComponent(slug)}`)).data,
};
