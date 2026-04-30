import { ImageProps } from "@/shared/types/types";
import { SEO } from "@/shared/types/types";

export interface PostData {
  Image: ImageProps;
  SEO: SEO;
  Text: string;
  Title: string;
  blog_categories: { Name: string }[];
  id: number;
  slug: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}

export interface DynamicPostData {
  data: [PostData];
  meta: object;
}
