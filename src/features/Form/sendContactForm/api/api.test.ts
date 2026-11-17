import { apiError, fakeResponse } from "@/shared/lib/testing/fakeResponse";
import { contactFormApi } from "./api";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const message = { name: "Олена", email: "o@example.com", message: "Чи доставляєте ви в Корабельний район?" };

describe("contactFormApi.send", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    process.env.NEXT_PUBLIC_API_URL = "http://api.test";
  });

  it("posts to the API directly, with the empty honeypot field", async () => {
    mockFetch.mockResolvedValue(fakeResponse(204));

    await expect(contactFormApi.send(message)).resolves.toBeUndefined();

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/contact");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ ...message, website: "" });
  });

  it("passes on what a bot typed into the honeypot (the API drops the message)", async () => {
    mockFetch.mockResolvedValue(fakeResponse(204));

    await contactFormApi.send(message, "http://spam.example");

    expect(JSON.parse(mockFetch.mock.calls[0][1].body).website).toBe("http://spam.example");
  });

  it("throws the API's error, e.g. a 429 with its wait", async () => {
    mockFetch.mockResolvedValue(fakeResponse(429, apiError(429, "TOO_MANY_REQUESTS"), { "Retry-After": "600" }));

    await expect(contactFormApi.send(message)).rejects.toMatchObject({ status: 429, retryAfter: 600 });
  });
});
