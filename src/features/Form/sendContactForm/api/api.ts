import { ContactUsFormValues, ContactFormServerResponse } from "../model/types/types";

export const contactFormApi = {
  send: async (data: ContactUsFormValues): Promise<ContactFormServerResponse> => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return { ...json, status: response.ok ? 200 : 400 };
    } catch {
      return { status: 400 };
    }
  },
};
