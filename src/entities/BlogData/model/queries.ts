import { blogDataApi } from "../api/api";

export const blogDataByCategoryQuery = (category: string, page: number = 1, pageSize: number = 10) => ({
  queryKey: ["blogDataByCategory", category, page, pageSize],
  queryFn: () => blogDataApi.getByCategory(category, page, pageSize),
});

export const blogDataQuery = (page: number = 1, pageSize: number = 10) => ({
  queryKey: ["blogData", page, pageSize],
  queryFn: () => blogDataApi.get(page, pageSize),
});
