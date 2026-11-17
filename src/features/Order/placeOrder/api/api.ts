import type { CreateOrder, Order } from "@/entities/Order";
import type { DataResponse } from "@/shared/api";
import { authFetch } from "@/shared/session";

export const checkoutFormApi = {
  /**
   * Places the order; the API prices it from its own data. Signed-in
   * customers' orders are linked to their account, guests' aren't (no
   * token). Throws ApiError: 409 PRODUCTS_UNAVAILABLE names the bad lines.
   */
  placeOrder: async (order: CreateOrder): Promise<Order> =>
    (await authFetch<DataResponse<Order>>("/orders", { method: "POST", body: order, optional: true })).data,
};
