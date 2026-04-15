import { fetchAPI } from "@/shared/utils/helpers/api";
import { SiteOptions } from "../model/types";

const globalOptionsApi = {
  get: (): Promise<SiteOptions> =>
    fetchAPI("/site-option", {
      populate: "*",
    }),
};

export default globalOptionsApi;
