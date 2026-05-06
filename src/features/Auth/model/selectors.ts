import { useAuthStore } from "./store";

export const useToken = () => useAuthStore((state) => state.token);

export const useSetToken = () => useAuthStore((state) => state.setToken);

export const useResetToken = () => useAuthStore((state) => state.resetToken);
