import type { Metadata } from "next";
import { NewsPost } from "@/pages/newsPost";
import { generatePostMetadata } from "@/widgets/PageSEO/PageSEO";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return generatePostMetadata(slug);
}

export default async function InnerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <NewsPost pageSlug={slug} />;
}
