import { ImageProps } from "@/shared/types/types";
export interface BlogData {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
export interface BlogPost {
  id: number;
  Title: string;
  Text: string;
  Image: ImageProps;
  slug: string;
}
