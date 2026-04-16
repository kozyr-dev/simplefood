import { fetchAPI } from "@/shared/utils/helpers/api";
import { SiteOptions } from "@/shared/types/types";

const globalOptionsApi = {
  get: (): Promise<SiteOptions> =>
    fetchAPI("/site-option", {
      populate: "*",
    }),
};

export default globalOptionsApi;
