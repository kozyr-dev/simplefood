import { Order } from "@/entities/Order/model/types";
import { checkoutFormApi } from "../../api/api";
import { ServerResponse } from "../types/types";

export function useSendOrder() {
  const sendOrder = async (data: Order): Promise<ServerResponse> => {
    return await checkoutFormApi.placeOrder(data);
  };

  return sendOrder;
}
