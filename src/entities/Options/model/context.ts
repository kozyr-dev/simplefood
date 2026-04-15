import { createContext } from "react";
import { createSiteOptionsStore } from "./store";

export type SiteOptionsStore = ReturnType<typeof createSiteOptionsStore>;

export const StoreContext = createContext<SiteOptionsStore | null>(null);
