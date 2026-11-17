import type { CreateOrder, Order } from "@/entities/Order";
import { checkoutFormApi } from "../../api/api";

export function useSendOrder() {
  return (order: CreateOrder): Promise<Order> => checkoutFormApi.placeOrder(order);
}
