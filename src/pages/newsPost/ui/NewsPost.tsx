import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { postDataDynamicQuery } from "@/entities/PostData";
import { PostDetails } from "@/widgets/PostDetails";

export async function NewsPost({ pageSlug }: { pageSlug: string }): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(postDataDynamicQuery(pageSlug, true));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetails pageSlug={pageSlug} />
    </HydrationBoundary>
  );
}
