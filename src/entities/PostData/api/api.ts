import { fetchAPI } from "@/shared/utils/helpers/api";
import { PostData, DynamicPostData } from "../types/types";

export const postDataApi = {
  get: (slug: string): Promise<PostData> =>
    fetchAPI("/" + slug, {
      populate: "*",
    }),
  getDynamic: (slug: string): Promise<DynamicPostData> =>
    fetchAPI("/blog-posts", {
      filters: {
        slug: slug,
      },
      populate: "*",
    }),
};
