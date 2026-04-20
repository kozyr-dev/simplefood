import { productsApi } from "../api/api";

export const productsQuery = () => ({
  queryKey: ["products"],
  queryFn: productsApi.get,
});
