"use client";

import { JSX } from "react";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import { usePostDataDynamicQuery } from "@/entities/PostData";
import styles from "./PostDetails.module.scss";

interface PostDetailsProps {
  pageSlug: string;
}

export function PostDetails(props: PostDetailsProps): JSX.Element {
  const { data } = usePostDataDynamicQuery(props.pageSlug);

  const postData = data?.data[0];

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
                {postData.Title && (
                  <div className="section-title single-post__title">
                    <ReactMarkdown components={{ p: "h2" }}>{postData.Title}</ReactMarkdown>
                  </div>
                )}
                {postData.Image && (
                  <div className={styles["single-post__image"]}>
                    <Image
                      src={process.env.API_URL + postData.Image.url}
                      width={postData.Image.width}
                      height={postData.Image.height}
                      alt={postData.Image.alternativeText}
                    />
                  </div>
                )}
                <div className={styles["single-post__text"]}>
                  <ReactMarkdown>{postData.Text}</ReactMarkdown>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
