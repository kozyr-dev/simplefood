import { useContext } from "react";
import { useStore } from "zustand";
import { SiteOptionsState } from "./types";
import { StoreContext } from "./context";
import { createStore } from "@/shared/lib/zustand/create-store";

export const createSiteOptionsStore = (initProps?: Partial<SiteOptionsState>) => {
  const DEFAULT_PROPS: SiteOptionsState = {
    siteOptions: null,
    setSiteOptions: () => {},
    clearSiteOptions: () => {},
  };
  return createStore<SiteOptionsState>((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setSiteOptions: (options) => set({ siteOptions: options }),
    clearSiteOptions: () => set({ siteOptions: null }),
  }));
};

export const useSiteOptionsStore = <T>(selector: (state: SiteOptionsState) => T) => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("StoreProvider is missing");
  }

  return useStore(store, selector);
};
