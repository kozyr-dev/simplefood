"use client";

import { useSingleTypePageSectionsQuery } from "@/entities/PageData";
import { ImageBanner } from "@/widgets/ImageBanner";
import { ProductsRawData } from "@/widgets/ProductList/model/types";
import { ProductList } from "@/widgets/ProductList";
import { BenefitsList } from "@/widgets/BenefitsList";
import PromoBlock from "@/shared/ui/blocks/PromoBlock/PromoBlock";
import { ArticlesList } from "@/widgets/ArticlesList";

interface SectionWizardProps {
  pageSlug: string;
}

export function SectionWizard(props: SectionWizardProps) {
  const { data } = useSingleTypePageSectionsQuery(props.pageSlug);
  if (!data) {
    return "Could not load sections";
  }

  console.log("SectionWizard data:", data);

  return (
    <>
      {data.data.Body &&
        data.data.Body.map((section, index) => {
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
                rawData={section as ProductsRawData & (typeof data.data.Body)[number]}
                rawProducts={section.products}
                key={index}
              />
            );
          }

          if (sectionId === "sections.benefits") {
            return (
              <BenefitsList articles={section.Benefit} title={section.title} button={section.button} key={index} />
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

          // if (sectionId === "sections.image-gallery") {
          //   return <SectionGallery images={section.images.data} title={section.Title} key={index} />;
          // }

          // if (sectionId === "sections.video-block") {
          //   return (
          //     <SectionVideo
          //       title={section.title}
          //       description={section.description}
          //       videoUrl={section.embed_video_url}
          //       image={section.placeholder_image.data}
          //       key={index}
          //     />
          //   );
          // }

          // if (sectionId === "sections.news-section") {
          //   return <SectionNews rawData={section} blogData={rawBlog} key={index} />;
          // }

          // if (sectionId === "sections.content") {
          //   return (
          //     <SectionContent
          //       title={section.title}
          //       content={section.content}
          //       embed_code={section.embed_code}
          //       button={section.button}
          //       key={index}
          //     />
          //   );
          // }

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
