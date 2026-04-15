import { SiteOptions } from "@/shared/types/types";

export type SiteOptionsState = {
  siteOptions: SiteOptions | null;
  setSiteOptions: (options: SiteOptions) => void;
  clearSiteOptions: () => void;
};
