import { JSX } from "react";
import { HOME_PAGE_SLUG } from "@/entities/Page";
import { Subpage } from "@/pages/subpage";

/** The homepage is the CMS page with the slug `home`. */
export function Home(): JSX.Element {
  return <Subpage pageSlug={HOME_PAGE_SLUG} />;
}
