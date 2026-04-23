import React from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import ArticlePost from "@/shared/ui/blocks/ArticlePost/ArticlePost";
import { ArticlesListProps } from "../model/types";
import styles from "./ArticlesList.module.scss";

export function ArticlesList(props: ArticlesListProps) {
  return (
    <section className={"page-section section-padding section-articles " + (props.class || "")} id={props.id}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {props.title && (
              <div className="section-title">
                <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
              </div>
            )}
            <div className={clsx("flex flex-row space-x-6", styles["articles-grid"])}>
              {props.articles.map((article) => (
                <div className="basis-full md:basis-1/2 lg:basis-1/3" key={article.id}>
                  <ArticlePost {...article} />
                </div>
              ))}
            </div>
            {props.button && (
              <div className="cta">
                <Button className="button--grey" url={props.button.url}>
                  {props.button.text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
