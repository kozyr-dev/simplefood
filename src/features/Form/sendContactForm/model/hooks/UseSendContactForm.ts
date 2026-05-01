import { contactFormApi } from "../../api/api";
import { ContactFormAPIResponse, ContactUsFormValues } from "../types/types";

export function UseSendContactForm() {
  const sendContactForm = async (data: ContactUsFormValues): Promise<ContactFormAPIResponse> => {
    try {
      const response = await contactFormApi.send(data);
      return response;
    } catch (error) {
      console.error("Error sending contact form:", error);
      throw error;
    }
  };

  return sendContactForm;
}
