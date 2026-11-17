"use client";

import { JSX } from "react";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { useBlogPostQuery } from "@/entities/Blog";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import styles from "./PostDetails.module.scss";

interface PostDetailsProps {
  pageSlug: string;
}

export function PostDetails(props: PostDetailsProps): JSX.Element {
  // Loaded on the server first (404s there).
  const { data: postData } = useBlogPostQuery(props.pageSlug);

  if (!postData) {
    return notFound();
  }

  return (
    <section className={"page-section section-padding section-post"}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {postData && (
              <article className={styles["single-post"]}>
                {postData.title && (
                  <div className="section-title single-post__title">
                    <ReactMarkdown components={{ p: "h2" }}>{postData.title}</ReactMarkdown>
                  </div>
                )}
                {postData.image && (
                  <div className={styles["single-post__image"]}>
                    <MediaImage media={postData.image} />
                  </div>
                )}
                <div className={styles["single-post__text"]}>
                  <ReactMarkdown>{postData.text}</ReactMarkdown>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
