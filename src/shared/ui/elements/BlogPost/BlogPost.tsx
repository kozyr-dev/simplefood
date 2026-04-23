import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import helpers from "@/shared/utils/helpers/base";
import { ImageProps } from "@/shared/types/types";
import styles from "./BlogPost.module.scss";

export interface BlogPostProps {
  id: number;
  slug: string;
  Title: string;
  Text: string;
  Image: ImageProps;
}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  const postExcerpt = `${helpers.truncate(props.Text, 45)} ...`;

  return (
    <div className={styles["blog-post"]}>
      {props.Image && (
        <div className={styles["blog-post__image"]}>
          <Image
            src={process.env.API_URL + (props.Image.formats?.medium?.url || props.Image.url)}
            width={props.Image.width}
            height={props.Image.height}
            alt={props.Image.alternativeText}
          />
        </div>
      )}
      <div className={styles["blog-post__description"]}>
        <h6 className={styles["blog-post__title"]}>{props.Title}</h6>
        <div className={styles["blog-post__excerpt"]}>
          <ReactMarkdown>{postExcerpt}</ReactMarkdown>
        </div>
        <Link href={`/news/${props.slug}`} className={styles["blog-post__read-more"]}>
          читати далі
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
