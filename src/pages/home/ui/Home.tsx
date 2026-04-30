import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { singleTypePageSectionsQuery } from "@/entities/PageData";
import { SectionWizard } from "@/widgets/SectionWizard";

export async function Home(): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(singleTypePageSectionsQuery("homepage", true));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SectionWizard pageSlug="homepage" isPageDynamic={false} />
    </HydrationBoundary>
  );
}
