import { ImageProps } from "@/shared/types/types";

export interface ProductsType {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Product {
  id: number;
  attributes: {
    slug: string;
    title: string;
    image: ImageProps;
    description: string;
    weight: number;
    calories: number;
    available: boolean;
    featured: boolean;
    favorite: boolean;
    price: number;
    category: string;
  };
}
