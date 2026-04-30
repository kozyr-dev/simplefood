export interface ContactUsProps {
  title: string;
  content: string;
  content2?: string;
  embed_code: string;
  form: {
    title: string;
    enable: boolean;
  };
  id?: string;
  class?: string;
}
