import { fetchAPI } from "@/shared/utils/helpers/api";
import { BlogData } from "../types/types";

export const blogDataApi = {
  get: (page: number, pageSize: number): Promise<BlogData> =>
    fetchAPI("/blog-posts", {
      pagination: {
        page,
        pageSize,
      },
      populate: "*",
    }),
  getByCategory: (category: string, page: number, pageSize: number): Promise<BlogData> =>
    fetchAPI("/blog-posts", {
      filters: {
        $and: [{ blog_categories: { Name: { $eq: category } } }],
      },
      pagination: {
        page,
        pageSize,
      },
      populate: "*",
    }),
};
