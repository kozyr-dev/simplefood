import { JSX } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { blogPostQuery } from "@/entities/Blog";
import { PostDetails } from "@/widgets/PostDetails";
import { notFoundOn404 } from "@/shared/lib/notFoundOn404";

/** A published blog post; 404 for unknown, draft or scheduled ones. */
export async function NewsPost({ pageSlug }: { pageSlug: string }): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await notFoundOn404(queryClient.fetchQuery(blogPostQuery(pageSlug)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetails pageSlug={pageSlug} />
    </HydrationBoundary>
  );
}
