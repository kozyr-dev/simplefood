import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStoreState } from "./types";

export const useAuthStore = create(
  persist<AuthStoreState>(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      resetedToken: () => set({ token: null }),
    }),
    {
      name: "token-storage",
    },
  ),
);
