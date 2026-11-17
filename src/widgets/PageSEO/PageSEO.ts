import type { Metadata } from "next";
import { blogApi } from "@/entities/Blog";
import { pageApi } from "@/entities/Page";
import { settingsApi } from "@/entities/Settings";
import type { Media, Seo, Settings } from "@/shared/api";
import { notFoundOn404 } from "@/shared/lib/notFoundOn404";
import { imageProps } from "@/shared/utils/helpers/media";

/**
 * Title, description and share image: the item's own SEO fields first,
 * then its title (and excerpt), then the site's defaults.
 */
function metadata(settings: Settings, seo: Seo, fallback: { title: string; description?: string; image?: Media | null }): Metadata {
  const name = seo.title ?? fallback.title;
  const title = name && name !== settings.siteName ? `${name} | ${settings.siteName}` : settings.siteName;
  const description = seo.description ?? fallback.description ?? settings.seo.description ?? undefined;
  const image = seo.shareImage ?? fallback.image ?? settings.seo.shareImage;
  const images = image ? [imageProps(image).src] : undefined;

  return {
    title,
    description,
    openGraph: { title, description, ...(images && { images }) },
    twitter: { title, description, ...(images && { images }) },
  };
}

/** A CMS page's metadata; Next's not-found page for unknown slugs. */
export async function generatePageMetadata(slug: string): Promise<Metadata> {
  // The same requests as the page's own: Next memoizes them within a render.
  const [settings, page] = await Promise.all([settingsApi.get(), notFoundOn404(pageApi.get(slug))]);
  return metadata(settings, page.seo, { title: page.title });
}

/** A blog post's metadata; Next's not-found page for unknown or unpublished posts. */
export async function generatePostMetadata(slug: string): Promise<Metadata> {
  const [settings, post] = await Promise.all([settingsApi.get(), notFoundOn404(blogApi.get(slug))]);
  return metadata(settings, post.seo, { title: post.title, description: post.excerpt, image: post.image });
}
