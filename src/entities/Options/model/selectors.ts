import { useSiteOptionsStore } from "./store";
import { SiteOptionsState } from "./types";

const getSiteOptions = (state: SiteOptionsState) => state.siteOptions;
const setSiteOptions = (state: SiteOptionsState) => state.setSiteOptions;
const clearSiteOptions = (state: SiteOptionsState) => state.clearSiteOptions;

export const useGetSiteOptions = () => useSiteOptionsStore(getSiteOptions);
export const useSetSiteOptions = () => useSiteOptionsStore(setSiteOptions);
export const useClearSiteOptions = () => useSiteOptionsStore(clearSiteOptions);
