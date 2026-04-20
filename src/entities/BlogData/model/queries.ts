import { blogDataApi } from "../api/api";

export const blogDataByCategoryQuery = (category: string) => ({
  queryKey: ["blogDataByCategory", category],
  queryFn: () => blogDataApi.getByCategory(category),
});

export const blogDataQuery = () => ({
  queryKey: ["blogData"],
  queryFn: () => blogDataApi.get(),
});
