import { settingsApi } from "../api/api";

export const settingsQuery = () => ({
  queryKey: ["settings"],
  queryFn: settingsApi.get,
});
