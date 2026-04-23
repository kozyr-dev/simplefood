import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import BenefitPost from "@/shared/ui/elements/BenefitPost/BenefitPost";
import { BenefitsListProps } from "../model/types";
import styles from "./BenefitsList.module.scss";

export function BenefitsList(props: BenefitsListProps) {
  return (
    <section className="page-section section-padding section-benefits">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {props.title && (
              <div className="section-title">
                <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
              </div>
            )}
            <div className={`flex flex-row ${styles["articles-grid"]} space-x-6`}>
              {props.articles?.map((article) => (
                <div className="basis-full md:basis-1/2 lg:basis-1/3" key={article.id}>
                  <BenefitPost {...article} />
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
