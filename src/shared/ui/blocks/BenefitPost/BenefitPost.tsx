import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import styles from "./BenefitPost.module.scss";
import { ImageProps } from "@/shared/types/types";

export interface BenefitPostProps {
  id: string;
  title: string;
  text: string;
  icon?: ImageProps;
}

const BenefitPost: React.FC<BenefitPostProps> = (props) => {
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

export default BenefitPost;
