import { ImageProps } from "@/shared/types/types";

export interface NewsWidgetProps {
  title: string;
  blog_category: BlogCategory;
  layout: string;
}

export interface BlogCategory {
  id: number;
  documentId: string;
  Name: string;
  Slug: string;
}
