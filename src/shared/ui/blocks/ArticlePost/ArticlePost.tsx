import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./ArticlePost.module.scss";
import { ImageProps } from "@/shared/types/types";

export interface ArticlePostProps {
  id: number;
  title: string;
  text: string;
  icon: ImageProps;
}

const ArticlePost: React.FC<ArticlePostProps> = (props) => {
  return (
    <article className={styles.article}>
      {props.icon && (
        <div className={styles.article__image}>
          <Image
            src={process.env.API_URL + props.icon.url}
            width={props.icon.width}
            height={props.icon.height}
            alt={props.icon.alternativeText}
          />
        </div>
      )}
      <div className={styles.article__description}>
        <h6 className={styles.title}>{props.title}</h6>
        <div className={styles.text}>
          <ReactMarkdown>{props.text}</ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default ArticlePost;
