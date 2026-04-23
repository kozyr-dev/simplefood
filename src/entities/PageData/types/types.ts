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
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
  meta: object;
}
