import globalOptionsApi from "../api/api";

export const optionsQuery = () => ({
  queryKey: ["options"],
  queryFn: globalOptionsApi.get,
});
