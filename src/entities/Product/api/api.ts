import { fetchAPI } from "@/shared/utils/helpers/api";
import { ProductsType } from "../types/types";

export const productsApi = {
  get: (): Promise<ProductsType> =>
    fetchAPI("/products", {
      populate: "*",
    }),
};
