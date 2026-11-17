import { contactFormApi } from "../../api/api";
import { UseSendContactForm } from "./UseSendContactForm";

jest.mock("../../api/api", () => ({ contactFormApi: { send: jest.fn() } }));

const send = contactFormApi.send as jest.MockedFunction<typeof contactFormApi.send>;

describe("UseSendContactForm", () => {
  it("sends the message and the honeypot value", async () => {
    send.mockResolvedValue(undefined);
    const values = { name: "Олена", email: "o@example.com", message: "Привіт" };

    await UseSendContactForm()(values, "");

    expect(send).toHaveBeenCalledWith(values, "");
  });
});
