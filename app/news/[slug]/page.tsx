import type { Metadata } from "next";
import { NewsPost } from "@/pages/newsPost";
import { generatePageMetadata } from "@/widgets/PageSEO/PageSEO";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generatePageMetadata(slug, true);
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <NewsPost pageSlug={slug} />;
}
