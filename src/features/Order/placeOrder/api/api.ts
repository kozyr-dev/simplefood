import { fetchWithAuth } from "@/features/Auth";
import { ServerResponse } from "../model/types/types";
import { Order } from "@/entities/Order";

export const checkoutFormApi = {
  placeOrder: (data: Order): Promise<ServerResponse> => {
    const payload = {
      address: data.address,
      name: data.name,
      email: data.email,
      phone: data.phone,
      dishes: data.dishes,
      amount: data.amount,
      users_permissions_user: data.userId,
      comments: data.comments,
    };
    return fetchWithAuth(
      "/orders",
      {},
      {
        method: "POST",
        body: JSON.stringify({ data: payload }),
      },
    ) as Promise<ServerResponse>;
  },
};
