import React from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./PromoBlock.module.scss";
import type { SectionOf } from "@/shared/api";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";

export type PromoBlockProps = SectionOf<"promo">;

const PromoBlock: React.FC<PromoBlockProps> = (props) => {
  return (
    <section
      className={clsx("page-section section-padding", styles["section-promo"], {
        [styles["invert-layout"]]: props.invertLayout,
      })}
    >
      <div className={styles["section-promo__image"]}>
        {props.image && <MediaImage media={props.image} />}
      </div>
      <div className={styles["section-promo__body"]}>
        <div className="container mx-auto max-w-6xl">
          <div className={clsx("flex flex-row", styles["flex-row"])}>
            <div className={styles["section-promo__block"]}>
              <div className={styles["section-promo__icon"]}>
                {props.icon && <MediaImage media={props.icon} />}
              </div>
              <div className={styles["section-promo__text"]}>
                {props.title && (
                  <div className={styles["title"]}>
                    <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
                  </div>
                )}
                <div className={styles["text"]}>
                  <ReactMarkdown>{props.text ?? ""}</ReactMarkdown>
                </div>
                {props.button && (
                  <div className={styles["cta"]}>
                    <Button className="button--white" url={props.button.url}>
                      {props.button.text}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBlock;
