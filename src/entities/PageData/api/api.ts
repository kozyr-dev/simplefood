import { fetchAPI } from "@/shared/utils/helpers/api";
import { DynamicTypePageSectionsData, SingleTypePageSectionsData } from "../types/types";

export const pageDataApi = {
  getSingleTypePageSections: (slug: string): Promise<SingleTypePageSectionsData> =>
    fetchAPI("/" + slug, { populate: "*" }),
  getDynamicTypePageSections: (slug: string): Promise<DynamicTypePageSectionsData> =>
    fetchAPI("/pages", {
      filters: {
        slug: slug,
      },
      populate: "*",
    }),
};
