export interface ContactUsFormValues {
  name: string;
  message: string;
  email: string;
}

export interface ContactFormServerResponse {
  status: number;
  data?: {
    id: number;
    documentId: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  meta?: object;
  error?: string;
}
