import { useUserStore } from "./store";

export const useUser = () => useUserStore((state) => state.user);

export const useSetUser = () => useUserStore((state) => state.setUser);

export const useResetUser = () => useUserStore((state) => state.resetUser);
