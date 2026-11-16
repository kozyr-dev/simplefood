import { UseSendContactForm } from "./UseSendContactForm";
import { contactFormApi } from "../../api/api";
import type { ContactUsFormValues } from "../types/types";

jest.mock("../../api/api", () => ({
  contactFormApi: { send: jest.fn() },
}));

const mockedSend = contactFormApi.send as jest.MockedFunction<typeof contactFormApi.send>;

const mockData: ContactUsFormValues = {
  name: "Jane",
  email: "jane@example.com",
  message: "Test message",
};

const mockResponse = {
  status: 200,
  data: {
    id: 1,
    documentId: "d1",
    name: "Jane",
    email: "jane@example.com",
    message: "Test message",
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
};

describe("UseSendContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedSend.mockResolvedValue(mockResponse);
  });

  it("returns a function", () => {
    expect(typeof UseSendContactForm()).toBe("function");
  });

  it("delegates to contactFormApi.send with the form data", async () => {
    const sendForm = UseSendContactForm();
    await sendForm(mockData);
    expect(mockedSend).toHaveBeenCalledWith(mockData);
    expect(mockedSend).toHaveBeenCalledTimes(1);
  });

  it("returns the response from contactFormApi.send", async () => {
    const sendForm = UseSendContactForm();
    const result = await sendForm(mockData);
    expect(result).toBe(mockResponse);
  });
});
