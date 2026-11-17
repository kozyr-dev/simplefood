import type { Metadata } from "next";
import { Home } from "@/pages/home";
import { HOME_PAGE_SLUG } from "@/entities/Page";
import { generatePageMetadata } from "@/widgets/PageSEO/PageSEO";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(HOME_PAGE_SLUG);
}

export default function HomePage(): React.JSX.Element {
  return <Home />;
}
