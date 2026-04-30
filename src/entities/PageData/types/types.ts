import { SEO } from "@/shared/types/types";

export interface PageData {
  data: object;
}
export interface SingleTypePageSectionsData {
  data: {
    id: number;
    Body: {
      __component: string;
      id: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: string | any;
    }[];
    Slug: string;
    Title: string;
    SEO: SEO;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}
export interface DynamicTypePageSectionsData {
  data: [
    {
      id: number;

      body: {
        __component: string;
        id: number;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: string | any;
      }[];
      slug: string;
      title: string;
      SEO: SEO;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
    },
  ];
  meta: object;
}
