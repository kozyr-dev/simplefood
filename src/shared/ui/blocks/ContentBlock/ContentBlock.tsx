import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./ContentBlock.module.scss";
import type { SectionOf } from "@/shared/api";
import { prefixContentImages } from "@/shared/utils/helpers/media";

/**
 * `image` isn't shown: the Strapi site never showed it either (two pages
 * have one).
 */
export type ContentBlockProps = SectionOf<"content">;

const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  return (
    <section className="page-section section-padding section-content">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {props.title && (
              <div className="section-title">
                <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
              </div>
            )}
            {props.content && (
              <div className="section-content" dangerouslySetInnerHTML={{ __html: prefixContentImages(props.content) }} />
            )}
            {props.embedCode && (
              <div className={styles.embedCode} dangerouslySetInnerHTML={{ __html: props.embedCode }} />
            )}
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
};

export default ContentBlock;
