import React from "react";
import Link from "next/link";
import type { BlogPostSummary } from "@/shared/api";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import styles from "./BlogPost.module.scss";

export interface BlogPostProps extends BlogPostSummary {
  layout?: "list" | "slider";
}

const BlogPost: React.FC<BlogPostProps> = (props) => {
  return (
    <div className={`${styles["blog-post"]} ${styles[`blog-post--${props.layout || "slider"}`]}`}>
      {props.image && (
        <div className={styles["blog-post__image"]}>
          <MediaImage media={props.image} format="medium" />
        </div>
      )}
      <div className={styles["blog-post__description"]}>
        <h6 className={styles["title"]}>{props.title}</h6>
        <div className={styles["excerpt"]}>
          {/* Plain text from the API: the markdown removed, "…" where it was cut. */}
          <p>{props.excerpt}</p>
        </div>
        <Link href={`/news/${props.slug}`} className={styles["read-more"]}>
          читати далі
        </Link>
      </div>
    </div>
  );
};

export default BlogPost;
