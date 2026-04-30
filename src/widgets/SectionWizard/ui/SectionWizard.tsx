"use client";

import { useSingleTypePageSectionsQuery, useDynamicTypePageSectionsQuery } from "@/entities/PageData";
import { ImageBanner } from "@/widgets/ImageBanner";
import { ProductList } from "@/widgets/ProductList";
import { BenefitsList } from "@/widgets/BenefitsList";
import { ArticlesList } from "@/widgets/ArticlesList";
import { VideoWidget } from "@/widgets/VideoWidget";
import { NewsWidget } from "@/widgets/NewsWidget";
import { ProductsRawData } from "@/widgets/ProductList";
import { Product } from "@/entities/Product";
import { useProductsQuery } from "@/entities/Product";
import ImageGallery from "@/shared/ui/blocks/ImageGallery/ImageGallery";
import PromoBlock from "@/shared/ui/blocks/PromoBlock/PromoBlock";
import ContentBlock from "@/shared/ui/blocks/ContentBlock/ContentBlock";

interface SectionWizardProps {
  pageSlug: string;
  isPageDynamic: boolean;
}

export function SectionWizard(props: SectionWizardProps) {
  const { data: dynamicTypePageData } = useDynamicTypePageSectionsQuery(props.pageSlug, props.isPageDynamic);
  const { data: singleTypePageData } = useSingleTypePageSectionsQuery(props.pageSlug, !props.isPageDynamic);

  const { data: rawProducts } = useProductsQuery();

  const data = props.isPageDynamic ? dynamicTypePageData : singleTypePageData;

  if (!data) {
    return "Could not load sections";
  }

  const pageSections = props.isPageDynamic ? dynamicTypePageData?.data[0].body : singleTypePageData?.data.Body;

  return (
    <>
      {pageSections &&
        pageSections.map((section, index) => {
          const sectionId = section.__component;

          if (sectionId === "sections.image-banner") {
            return (
              <ImageBanner
                title={section.title}
                text={section.text}
                image={section.image}
                bgColor={section.background_color}
                button={section.button}
                key={index}
              />
            );
          }

          if (sectionId === "sections.products") {
            return (
              <ProductList
                rawData={section as ProductsRawData & (typeof pageSections)[number]}
                rawProducts={rawProducts?.data as unknown as Product[]}
                key={index}
              />
            );
          }

          if (sectionId === "sections.benefits") {
            return (
              <BenefitsList title={section.title} articles={section.Benefit} button={section.button} key={index} />
            );
          }

          if (sectionId === "sections.promo-block") {
            return (
              <PromoBlock
                title={section.title}
                text={section.text}
                button={section.button}
                icon={section.icon}
                image={section.image}
                invert={section.invert_layout}
                key={index}
              />
            );
          }

          if (sectionId === "sections.articles") {
            return (
              <ArticlesList
                articles={section.article}
                title={section.title}
                button={section.button}
                id={section.custom_ID}
                class={section.custom_Class}
                key={index}
              />
            );
          }

          if (sectionId === "sections.image-gallery") {
            return <ImageGallery images={section.images} title={section.Title} key={index} />;
          }

          if (sectionId === "sections.video-block") {
            return (
              <VideoWidget
                title={section.title}
                description={section.description}
                videoUrl={section.embed_video_url}
                image={section.placeholder_image}
                key={index}
              />
            );
          }

          if (sectionId === "sections.news-section") {
            return (
              <NewsWidget
                title={section.title}
                layout={section.layout}
                blog_category={section.blog_category}
                key={index}
              />
            );
          }

          if (sectionId === "sections.content") {
            return (
              <ContentBlock
                title={section.title}
                content={section.content}
                embed_code={section.embed_code}
                button={section.button}
                key={index}
              />
            );
          }

          // if (sectionId === "sections.contact") {
          //   return (
          //     <SectionContact
          //       title={section.title}
          //       content={section.content}
          //       content2={section.content2}
          //       form={{ title: section.form_title, enable: section.form }}
          //       embed_code={section.map_embed_code}
          //       key={index}
          //     />
          //   );
          // }
        })}
    </>
  );
}
