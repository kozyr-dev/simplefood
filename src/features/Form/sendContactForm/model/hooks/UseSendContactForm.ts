import { contactFormApi } from "../../api/api";
import { ContactUsFormValues } from "../types/types";

export function UseSendContactForm() {
  return (data: ContactUsFormValues, website?: string): Promise<void> => contactFormApi.send(data, website);
}
