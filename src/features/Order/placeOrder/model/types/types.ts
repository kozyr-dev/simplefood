import { Order } from "@/entities/Order";
export interface PlaceOrderData extends Omit<Order, "userId"> {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId: string;
}

export interface ServerResponse {
  data: PlaceOrderData;
  meta: object;
}
