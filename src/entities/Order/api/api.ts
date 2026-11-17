import type { Order, Paginated } from "@/shared/api";
import { authFetch } from "@/shared/session";

export const ordersApi = {
  /** The signed-in customer's orders, newest first. */
  mine: (page = 1, pageSize = 10): Promise<Paginated<Order>> =>
    authFetch<Paginated<Order>>("/orders/me", { query: { page, pageSize } }),
};
