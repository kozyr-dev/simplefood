import type { Metadata } from "next";
import { globalOptionsApi } from "@/entities/Options";
import { pageDataApi } from "@/entities/PageData";
import { getStrapiMedia } from "@/shared/utils/helpers/media";

export async function generatePageMetadata(pageSlug: string, isPageDynamic: boolean): Promise<Metadata> {
  const [siteOptions, pageData] = await Promise.all([
    globalOptionsApi.get(),
    isPageDynamic ? pageDataApi.getDynamicTypePageSections(pageSlug) : pageDataApi.getSingleTypePageSections(pageSlug),
  ]);

  const { SEO: defaultSeo, SiteName } = siteOptions.data;

  const pageSEO = isPageDynamic
    ? (pageData as Awaited<ReturnType<typeof pageDataApi.getDynamicTypePageSections>>).data[0]?.SEO
    : (pageData as Awaited<ReturnType<typeof pageDataApi.getSingleTypePageSections>>).data?.SEO;

  const seoWithDefaults = { ...defaultSeo, ...pageSEO };

  const title = seoWithDefaults.seo_title ? `${seoWithDefaults.seo_title} | ${SiteName}` : SiteName;
  const description = seoWithDefaults.seo_description ?? undefined;
  const imageUrl = seoWithDefaults.shareImage ? getStrapiMedia(seoWithDefaults.shareImage) : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
    twitter: {
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
