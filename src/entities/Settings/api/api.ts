import { apiFetch, type DataResponse, type Settings } from "@/shared/api";

export const settingsApi = {
  get: async (): Promise<Settings> => (await apiFetch<DataResponse<Settings>>("/settings")).data,
};
