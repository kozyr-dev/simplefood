import type { MenuKey } from "@/shared/api";
import { menuApi } from "../api/api";

export const menuQuery = (key: MenuKey) => ({
  queryKey: ["menu", key],
  queryFn: () => menuApi.get(key),
});
