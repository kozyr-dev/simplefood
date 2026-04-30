import React from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./ContentBlock.module.scss";
import { ButtonProps } from "@/shared/types/types";

export interface ContentBlockProps {
  title: string;
  content: string;
  embed_code: string;
  button: ButtonProps;
  id?: string;
  class?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  return (
    <section className={"page-section section-padding section-content " + (props.class || "")} id={props.id}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row">
          <div className="basis-full">
            {props.title && (
              <div className="section-title">
                <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
              </div>
            )}
            {props.content && (
              <div className="section-content" dangerouslySetInnerHTML={{ __html: props.content }}></div>
            )}
            {props.embed_code && (
              <div className={styles.embedCode} dangerouslySetInnerHTML={{ __html: props.embed_code }} />
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
