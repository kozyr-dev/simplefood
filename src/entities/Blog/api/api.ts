import { apiFetch, type BlogPost, type BlogPostSummary, type DataResponse, type Paginated } from "@/shared/api";

export interface BlogPostsQuery {
  /** A blog category's slug; all categories when left out. */
  category?: string;
  page?: number;
  pageSize?: number;
}

export const blogApi = {
  /** Published posts, newest first, with an excerpt instead of the text. */
  list: ({ category, page = 1, pageSize = 10 }: BlogPostsQuery = {}): Promise<Paginated<BlogPostSummary>> =>
    apiFetch<Paginated<BlogPostSummary>>("/blog-posts", { query: { category, page, pageSize } }),

  /** A published post; ApiError 404 for unknown, draft or scheduled ones. */
  get: async (slug: string): Promise<BlogPost> =>
    (await apiFetch<DataResponse<BlogPost>>(`/blog-posts/${encodeURIComponent(slug)}`)).data,
};
