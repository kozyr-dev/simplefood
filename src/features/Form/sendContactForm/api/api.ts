import { apiFetch } from "@/shared/api";
import { ContactUsFormValues } from "../model/types/types";

export const contactFormApi = {
  /**
   * Straight to the API: saved, then the shop is emailed. 204; throws
   * ApiError. `website` is the honeypot: always empty from people; a bot
   * that fills it gets a 204 and is dropped.
   */
  send: (data: ContactUsFormValues, website = ""): Promise<void> =>
    apiFetch<void>("/contact", { method: "POST", body: { ...data, website } }),
};
