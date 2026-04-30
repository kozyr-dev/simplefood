import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { SectionWizard } from "@/widgets/SectionWizard";
import { dynamicTypePageSectionsQuery } from "@/entities/PageData";
import { productsQuery } from "@/entities/Product";

export async function Subpage({ pageSlug }: { pageSlug: string }): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(dynamicTypePageSectionsQuery(pageSlug, true));
  await queryClient.prefetchQuery(productsQuery());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SectionWizard pageSlug={pageSlug} isPageDynamic={true} />
    </HydrationBoundary>
  );
}
