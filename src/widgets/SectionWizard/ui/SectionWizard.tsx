"use client";

import { ImageBanner } from "@/widgets/ImageBanner";
import { ProductList } from "@/widgets/ProductList";
import { BenefitsList } from "@/widgets/BenefitsList";
import { ArticlesList } from "@/widgets/ArticlesList";
import { VideoWidget } from "@/widgets/VideoWidget";
import { NewsWidget } from "@/widgets/NewsWidget";
import { ContactUs } from "@/widgets/ContactUs";
import { usePageQuery } from "@/entities/Page";
import type { PageSection } from "@/shared/api";
import ImageGallery from "@/shared/ui/blocks/ImageGallery/ImageGallery";
import PromoBlock from "@/shared/ui/blocks/PromoBlock/PromoBlock";
import ContentBlock from "@/shared/ui/blocks/ContentBlock/ContentBlock";

interface SectionWizardProps {
  pageSlug: string;
}

/** One section by its type; a type this site doesn't know renders nothing. */
function Section({ section }: { section: PageSection }) {
  switch (section.type) {
    case "image-banner":
      return <ImageBanner {...section} />;
    case "products":
      return <ProductList {...section} />;
    case "benefits":
      return <BenefitsList {...section} />;
    case "promo":
      return <PromoBlock {...section} />;
    case "articles":
      return <ArticlesList {...section} />;
    case "image-gallery":
      return <ImageGallery {...section} />;
    case "video":
      return <VideoWidget {...section} />;
    case "news":
      return <NewsWidget {...section} />;
    case "content":
      return <ContentBlock {...section} />;
    case "contact":
      return <ContactUs {...section} />;
    default:
      return null;
  }
}

/** A page's sections in order. The page itself is loaded on the server first (404s there). */
export function SectionWizard({ pageSlug }: SectionWizardProps) {
  const { data: page } = usePageQuery(pageSlug);

  return (
    <>
      {page?.sections.map((section) => (
        <Section section={section} key={section.id} />
      ))}
    </>
  );
}
