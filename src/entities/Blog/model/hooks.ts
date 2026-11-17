"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { BlogPostsQuery } from "../api/api";
import { blogPostQuery, blogPostsQuery } from "./queries";

/** Keeps the previous page on screen while the next one loads. */
export const useBlogPostsQuery = (query: BlogPostsQuery, enabled = true) =>
  useQuery({ ...blogPostsQuery(query), enabled, placeholderData: keepPreviousData });

export const useBlogPostQuery = (slug: string) => useQuery(blogPostQuery(slug));
