import { blogApi, type BlogPostsQuery } from "../api/api";

export const blogPostsQuery = (query: BlogPostsQuery) => ({
  queryKey: ["blogPosts", query],
  queryFn: () => blogApi.list(query),
});

export const blogPostQuery = (slug: string) => ({
  queryKey: ["blogPost", slug],
  queryFn: () => blogApi.get(slug),
});
