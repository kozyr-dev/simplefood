import type { CreateOrder } from "@/entities/Order";
import { checkoutFormApi } from "../../api/api";
import { useSendOrder } from "./useSendOrder";

jest.mock("../../api/api", () => ({ checkoutFormApi: { placeOrder: jest.fn() } }));

const placeOrder = checkoutFormApi.placeOrder as jest.MockedFunction<typeof checkoutFormApi.placeOrder>;

describe("useSendOrder", () => {
  it("places the order and returns the API's", async () => {
    const order = { items: [], name: "x", email: "x@example.com", phone: "1234567", shippingMethod: "pickup" };
    placeOrder.mockResolvedValue({ number: 1 } as Awaited<ReturnType<typeof placeOrder>>);

    await expect(useSendOrder()(order as CreateOrder)).resolves.toEqual({ number: 1 });
    expect(placeOrder).toHaveBeenCalledWith(order);
  });
});
