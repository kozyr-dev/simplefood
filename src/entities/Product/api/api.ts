import { fetchAPI } from "@/shared/utils/helpers/api";
import { ProductsResponseType } from "../model/types";

export const productsApi = {
  get: (): Promise<ProductsResponseType> =>
    fetchAPI("/products", {
      populate: "*",
    }),
};
