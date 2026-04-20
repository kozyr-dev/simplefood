import qs from "qs";
import { fetchAPI } from "@/shared/utils/helpers/api";
import { BlogData } from "../types/types";

export const blogDataApi = {
  get: (): Promise<BlogData> =>
    fetchAPI("/blog-posts", {
      populate: "*",
    }),
  getByCategory: (category: string): Promise<BlogData> =>
    fetchAPI("/blog-posts", {
      filters: qs.stringify({ "[$and][0][blog_categories][Name][$eq]": category }, { encodeValuesOnly: true }),
      populate: "*",
    }),
};
