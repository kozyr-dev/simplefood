import qs from "qs";
import { fetchAPI } from "@/shared/utils/helpers/api";
import { PageData, SingleTypePageSectionsData } from "../types/types";

export const singleTypePageSectionsPopulate = {
  Body: {
    on: {
      "sections.image-banner": {
        populate: { image: true, button: true },
      },
      "sections.products": {
        populate: {
          products: {
            populate: { image: true },
          },
        },
      },
      "sections.benefits": {
        populate: {
          Benefit: {
            populate: { icon: true },
          },
          button: true,
        },
      },
      "sections.promo-block": {
        populate: { icon: true, image: true, button: true },
      },
      "sections.articles": {
        populate: {
          article: {
            populate: { icon: true },
          },
          button: true,
        },
      },
    },
  },
};

export const singleTypePageSectionPopulate = (section_slug: string) => ({
  Body: {
    on: {
      [section_slug]: {
        populate: "*",
      },
    },
  },
});

export const pageDataApi = {
  getSingleTypePageSections: (
    slug: string,
    populate: Record<string, unknown> = singleTypePageSectionsPopulate,
  ): Promise<SingleTypePageSectionsData> => fetchAPI("/" + slug, { populate }),
  getSingleTypePageSection: (
    slug: string,
    section_slug: string,
    populate: Record<string, unknown> = singleTypePageSectionPopulate(section_slug),
  ): Promise<PageData> =>
    fetchAPI("/" + slug, {
      populate: qs.stringify(populate, {
        encodeValuesOnly: true,
      }),
    }),
};
