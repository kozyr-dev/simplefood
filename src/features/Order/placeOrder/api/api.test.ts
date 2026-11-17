import type { CreateOrder } from "@/entities/Order";
import { authFetch } from "@/shared/session";
import { checkoutFormApi } from "./api";

jest.mock("@/shared/session", () => ({ authFetch: jest.fn() }));

const mockedAuthFetch = authFetch as jest.MockedFunction<typeof authFetch>;

const order: CreateOrder = {
  items: [{ productId: "019a-borsch", quantity: 2 }],
  name: "Олена",
  email: "o@example.com",
  phone: "+380 67 123 45 67",
  shippingMethod: "pickup",
};

describe("checkoutFormApi.placeOrder", () => {
  beforeEach(() => {
    mockedAuthFetch.mockReset();
    mockedAuthFetch.mockResolvedValue({ data: { number: 8, subtotal: 17000 } });
  });

  it("posts the lines and contact details as they are, with an optional token", async () => {
    const placed = await checkoutFormApi.placeOrder(order);

    expect(mockedAuthFetch).toHaveBeenCalledWith("/orders", { method: "POST", body: order, optional: true });
    expect(placed).toEqual({ number: 8, subtotal: 17000 });
  });

  it("never sends a price: the API prices the order itself", async () => {
    await checkoutFormApi.placeOrder(order);

    expect(JSON.stringify(mockedAuthFetch.mock.calls[0][1])).not.toMatch(/price|amount|subtotal/);
  });

  it("passes the API's errors on", async () => {
    mockedAuthFetch.mockRejectedValue(new Error("409"));

    await expect(checkoutFormApi.placeOrder(order)).rejects.toThrow("409");
  });
});
