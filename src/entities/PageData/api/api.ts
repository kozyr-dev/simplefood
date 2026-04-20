import qs from "qs";
import { fetchAPI } from "@/shared/utils/helpers/api";
import { PageData } from "../types/types";

export const pageDataApi = {
  get: (slug: string): Promise<PageData> =>
    fetchAPI("/" + slug, {
      populate: "deep",
    }),
  getDynamic: (slug: string): Promise<PageData> =>
    fetchAPI("/pages", {
      filters: qs.stringify({ slug: slug }, { encodeValuesOnly: true }),
      populate: "deep",
    }),
};
