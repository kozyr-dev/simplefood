import { Product } from "@/entities/Product";

export interface ProductListProps {
  rawData: ProductsRawData;
  rawProducts: Array<Product>;
}

export interface ProductsRawData {
  title: string;
  source: string;
  layout: string;
  products: Array<Product>;
  product_category: object;
  custom_Class: string;
  custom_ID: string;
}
