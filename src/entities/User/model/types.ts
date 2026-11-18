import type { User } from "@/shared/api";

export type { User };

export type UserStoreState = {
  /** The signed-in account's profile; in memory only, like the token. */
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
};
