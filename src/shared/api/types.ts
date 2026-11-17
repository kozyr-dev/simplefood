import type { components } from "./schema";

/*
 * Names for the API's shapes. schema.ts is generated from the API's OpenAPI
 * spec (`npm run api:types` with the API running): a renamed field there
 * breaks the type check instead of a page.
 */
type Schemas = components["schemas"];

export type Media = Schemas["MediaDto"];
export type Seo = Schemas["SeoDto"];
export type ButtonLink = Schemas["ButtonDto"];
export type PaginationMeta = Schemas["PaginationMetaDto"];
export type Settings = Schemas["SettingsDto"];
export type MenuKey = Schemas["MenuDto"]["key"];
export type MenuItem = Schemas["MenuItemDto"];
export type Product = Schemas["ProductDto"];
export type Page = Schemas["PageDto"];
export type PageSection = Page["sections"][number];
export type SectionType = PageSection["type"];
/** One section type's fields: `SectionOf<"products">`. */
export type SectionOf<T extends SectionType> = Extract<PageSection, { type: T }>;
export type SectionItem = Schemas["SectionItemDto"];
export type BlogCategory = Schemas["BlogCategoryDto"];
export type BlogPostSummary = Schemas["BlogPostSummaryDto"];
export type BlogPost = Schemas["BlogPostDto"];
export type User = Schemas["UserDto"];
export type AuthResult = Schemas["AuthResultDto"];
export type Order = Schemas["OrderDto"];
export type CreateOrder = Schemas["CreateOrderDto"];
export type ShippingMethod = CreateOrder["shippingMethod"];

/** A response body: `{data}`. */
export interface DataResponse<T> {
  data: T;
}

/** A page of a list: `{data, meta}`. */
export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}
