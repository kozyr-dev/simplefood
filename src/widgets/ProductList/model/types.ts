import type { SectionOf } from "@/shared/api";

/** The products arrive resolved by the API: available ones only, in display order. */
export type ProductListProps = SectionOf<"products">;
