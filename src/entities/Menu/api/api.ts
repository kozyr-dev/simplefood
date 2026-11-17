import { apiFetch, type DataResponse, type MenuItem, type MenuKey } from "@/shared/api";

export const menuApi = {
  /** The menu's items, `main` group first, each in the editor's order. */
  get: async (key: MenuKey): Promise<MenuItem[]> =>
    (await apiFetch<DataResponse<{ items: MenuItem[] }>>(`/menus/${key}`)).data.items,
};
