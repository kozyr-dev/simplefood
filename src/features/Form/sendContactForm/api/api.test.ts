import { contactFormApi } from "./api";
import type { ContactUsFormValues } from "../model/types/types";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const mockData: ContactUsFormValues = {
  name: "John Doe",
  email: "john@example.com",
  message: "Hello there",
};

describe("contactFormApi.send", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("POSTs to /api/contact", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    await contactFormApi.send(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("sends the form data as a JSON body with Content-Type header", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });
    await contactFormApi.send(mockData);
    const [, options] = mockFetch.mock.calls[0];
    expect(options.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(options.body)).toEqual(mockData);
  });

  it("returns status 200 on a successful response", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({ data: { id: 1 } }) });
    const result = await contactFormApi.send(mockData);
    expect(result.status).toBe(200);
  });

  it("returns status 400 when the response is not ok", async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({ error: "Bad request" }) });
    const result = await contactFormApi.send(mockData);
    expect(result.status).toBe(400);
  });

  it("returns status 400 without throwing when fetch rejects", async () => {
    mockFetch.mockRejectedValue(new Error("Network failure"));
    const result = await contactFormApi.send(mockData);
    expect(result.status).toBe(400);
  });

  it("merges server JSON into the returned object", async () => {
    const serverPayload = {
      data: {
        id: 5,
        documentId: "doc5",
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        createdAt: "",
        updatedAt: "",
        publishedAt: "",
      },
      meta: {},
    };
    mockFetch.mockResolvedValue({ ok: true, json: async () => serverPayload });
    const result = await contactFormApi.send(mockData);
    expect(result.data).toEqual(serverPayload.data);
    expect(result.meta).toEqual(serverPayload.meta);
  });
});
