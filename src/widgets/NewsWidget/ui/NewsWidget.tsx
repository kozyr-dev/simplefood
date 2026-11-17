"use client";

import React, { JSX, useState } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import { useBlogPostsQuery } from "@/entities/Blog";
import Pagination from "@/shared/ui/elements/Pagination/Pagination";
import BlogPost from "@/shared/ui/elements/BlogPost/BlogPost";
import { NewsWidgetProps } from "../model/types";
import styles from "./NewsWidget.module.scss";

/** A blog category's posts, paged; nothing when the category was deleted. */
export function NewsWidget(props: NewsWidgetProps): JSX.Element | null {
  const { title, layout, blogCategory } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogData, isLoading } = useBlogPostsQuery(
    { category: blogCategory?.slug, page: currentPage },
    blogCategory !== null,
  );

  if (!blogCategory) return null;

  //Todo: add skeleton loader for better UX
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page-section section-padding section-news">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {title && (
              <h2 className="section-title">
                <ReactMarkdown>{title}</ReactMarkdown>
              </h2>
            )}

            {layout === "list" && (
              <>
                <div className={styles["news-list"]}>
                  {blogData?.data.map((post) => (
                    <div key={post.id} className={styles["news-list__el"]}>
                      <BlogPost {...post} layout="list" />
                    </div>
                  ))}
                </div>

                <Pagination {...blogData?.meta} onPageChange={setCurrentPage} />
              </>
            )}

            {layout === "slider" && (
              <Splide
                className={styles["news-slider"]}
                options={{
                  arrows: true,
                  perPage: 2,
                }}
              >
                {blogData?.data.map((post) => (
                  <SplideSlide key={post.id} className={styles["news-slider__slide"]}>
                    <BlogPost {...post} layout="slider" />
                  </SplideSlide>
                ))}
              </Splide>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
