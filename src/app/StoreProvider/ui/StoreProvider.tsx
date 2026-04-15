"use client";

import { useState, type ReactNode } from "react";
import { createSiteOptionsStore, SiteOptionsState, StoreContext, SiteOptionsStore } from "@/entities/Options";

type StoreProviderProps = {
  children: ReactNode;
  initialState?: Partial<SiteOptionsState>;
};

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  const [store] = useState<SiteOptionsStore>(() => createSiteOptionsStore(initialState));

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
