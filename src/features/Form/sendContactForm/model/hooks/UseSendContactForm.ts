import { contactFormApi } from "../../api/api";
import { ContactFormServerResponse, ContactUsFormValues } from "../types/types";

export function UseSendContactForm() {
  const sendContactForm = async (data: ContactUsFormValues): Promise<ContactFormServerResponse> => {
    return await contactFormApi.send(data);
  };

  return sendContactForm;
}
