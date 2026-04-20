import qs from "qs";
import { fetchAPI } from "@/shared/utils/helpers/api";
import { PageData } from "../types/types";

export const pageDataApi = {
  getSingleTypePageSections: (slug: string): Promise<PageData> =>
    fetchAPI("/" + slug, {
      "populate[Body][populate]": "*",
    }),
  getSingleTypePageSection: (slug: string, section_slug: string): Promise<PageData> =>
    fetchAPI("/" + slug, {
      populate: qs.stringify(
        {
          Body: {
            on: {
              [section_slug]: {
                populate: "*",
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        },
      ),
    }),
  get: (slug: string): Promise<PageData> =>
    fetchAPI("/" + slug, {
      populate: "*",
    }),
  getDynamic: (slug: string): Promise<PageData> =>
    fetchAPI("/pages", {
      filters: qs.stringify({ slug: slug }, { encodeValuesOnly: true }),
      populate: "*",
    }),
};
