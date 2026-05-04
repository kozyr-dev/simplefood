import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStoreState } from "./types";

export const useUserStore = create(
  persist<UserStoreState>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
