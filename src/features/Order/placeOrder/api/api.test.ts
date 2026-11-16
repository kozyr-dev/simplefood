import { checkoutFormApi } from "./api";
import { fetchWithAuth } from "@/features/Auth";
import type { Order } from "@/entities/Order";
import type { ServerResponse } from "../model/types/types";

jest.mock("@/features/Auth", () => ({
  fetchWithAuth: jest.fn(),
}));

const mockedFetchWithAuth = fetchWithAuth as jest.MockedFunction<typeof fetchWithAuth>;

const mockOrder: Order = {
  address: "123 Main St",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  dishes: "pizza, burger",
  amount: 25.99,
  comments: "No onions",
  userId: 42,
};

const mockResponse: ServerResponse = {
  data: {
    id: 1,
    address: "123 Main St",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    dishes: "pizza, burger",
    amount: 25.99,
    comments: "No onions",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    publishedAt: "2024-01-01T00:00:00.000Z",
    documentId: "abc123",
  },
  meta: {},
};

describe("checkoutFormApi.placeOrder", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedFetchWithAuth.mockResolvedValue(mockResponse);
  });

  it("calls fetchWithAuth with the /orders endpoint", async () => {
    await checkoutFormApi.placeOrder(mockOrder);
    expect(mockedFetchWithAuth).toHaveBeenCalledWith("/orders", {}, expect.objectContaining({ method: "POST" }));
  });

  it("wraps the payload under a data key", async () => {
    await checkoutFormApi.placeOrder(mockOrder);
    const [, , options] = mockedFetchWithAuth.mock.calls[0];
    const body = JSON.parse(options!.body as string);
    expect(body).toHaveProperty("data");
  });

  it("maps userId to users_permissions_user and omits userId from payload", async () => {
    await checkoutFormApi.placeOrder(mockOrder);
    const [, , options] = mockedFetchWithAuth.mock.calls[0];
    const { data } = JSON.parse(options!.body as string);
    expect(data.users_permissions_user).toBe(42);
    expect(data).not.toHaveProperty("userId");
  });

  it("sends all order fields in the payload", async () => {
    await checkoutFormApi.placeOrder(mockOrder);
    const [, , options] = mockedFetchWithAuth.mock.calls[0];
    const { data } = JSON.parse(options!.body as string);
    expect(data).toMatchObject({
      address: mockOrder.address,
      name: mockOrder.name,
      email: mockOrder.email,
      phone: mockOrder.phone,
      dishes: mockOrder.dishes,
      amount: mockOrder.amount,
      comments: mockOrder.comments,
    });
  });

  it("returns the server response", async () => {
    const result = await checkoutFormApi.placeOrder(mockOrder);
    expect(result).toBe(mockResponse);
  });

  it("handles null userId", async () => {
    await checkoutFormApi.placeOrder({ ...mockOrder, userId: null });
    const [, , options] = mockedFetchWithAuth.mock.calls[0];
    const { data } = JSON.parse(options!.body as string);
    expect(data.users_permissions_user).toBeNull();
  });

  it("propagates errors thrown by fetchWithAuth", async () => {
    mockedFetchWithAuth.mockRejectedValue(new Error("Network error"));
    await expect(checkoutFormApi.placeOrder(mockOrder)).rejects.toThrow("Network error");
  });
});
