import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./ArticlePost.module.scss";
import type { SectionItem } from "@/shared/api";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";

/** An entry of a benefits or articles list. */
export type ArticlePostProps = SectionItem;

const ArticlePost: React.FC<ArticlePostProps> = (props) => {
  return (
    <article className={styles.article}>
      {props.icon && (
        <div className={styles.article__image}>
          <MediaImage media={props.icon} />
        </div>
      )}
      <div className={styles.article__description}>
        <h6 className={styles.title}>{props.title}</h6>
        <div className={styles.text}>
          <ReactMarkdown>{props.text ?? ""}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default ArticlePost;
