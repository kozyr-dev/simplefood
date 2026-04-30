"use client";

import React, { JSX, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { NewsWidgetProps } from "../model/types";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import { useState } from "react";
import Pagination from "@/shared/ui/elements/Pagination/Pagination";
import BlogPost from "@/shared/ui/elements/BlogPost/BlogPost";
import styles from "./NewsWidget.module.scss";
import { useBlogDataByCategoryQuery } from "@/entities/BlogData";

export function NewsWidget(props: NewsWidgetProps): JSX.Element {
  const { title, layout, blog_category } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: blogData, isLoading } = useBlogDataByCategoryQuery(blog_category.Name, currentPage);

  const handlePageChange = (page: number) => {
    if (page && page === currentPage) return;
    setCurrentPage(page);
  };

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
                  {blogData?.data?.map((post) => (
                    <div key={post.id} className={styles["news-list__el"]}>
                      <BlogPost {...post} layout="list" />
                    </div>
                  ))}
                </div>

                <Pagination {...blogData?.meta?.pagination} onPageChange={(page) => handlePageChange(page)} />
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
                {blogData?.data?.map((post) => (
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
