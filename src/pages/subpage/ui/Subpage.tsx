import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { pageQuery } from "@/entities/Page";
import { SectionWizard } from "@/widgets/SectionWizard";
import { notFoundOn404 } from "@/shared/lib/notFoundOn404";

/** A CMS page by slug (the homepage too); 404 for unknown or unpublished ones. */
export async function Subpage({ pageSlug }: { pageSlug: string }): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  // Sections arrive resolved: products, images and categories are embedded.
  await notFoundOn404(queryClient.fetchQuery(pageQuery(pageSlug)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SectionWizard pageSlug={pageSlug} />
    </HydrationBoundary>
  );
}
