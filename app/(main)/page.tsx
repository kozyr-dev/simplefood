import type { Metadata } from "next";
import { Home } from "@/pages/home";
import { generatePageMetadata } from "@/widgets/PageSEO/PageSEO";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata("homepage", false);
}

export default function HomePage(): React.JSX.Element {
  return <Home />;
}
