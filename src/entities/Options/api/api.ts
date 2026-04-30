import { fetchAPI } from "@/shared/utils/helpers/api";
import { SiteOptions } from "@/shared/types/types";

export const globalOptionsApi = {
  get: (): Promise<SiteOptions> =>
    fetchAPI("/site-option", {
      populate: "*",
    }),
};
