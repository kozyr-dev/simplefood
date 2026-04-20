import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { singleTypePageSectionsQuery } from "@/entities/PageData";

export async function Home(): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(singleTypePageSectionsQuery("homepage"));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>This is homepage</div>
    </HydrationBoundary>
  );
}
