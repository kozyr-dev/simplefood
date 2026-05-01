import { ContactUsFormValues, ContactFormAPIResponse } from "../model/types/types";
import { fetchAPI } from "@/shared/utils/helpers/api";

export const contactFormApi = {
  send: (data: ContactUsFormValues): Promise<ContactFormAPIResponse> =>
    fetchAPI("/contact-submissions", undefined, {
      method: "POST",
      body: JSON.stringify({ data: data }),
    }),
};
