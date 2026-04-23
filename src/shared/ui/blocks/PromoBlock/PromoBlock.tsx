import React from "react";
import clsx from "clsx";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./PromoBlock.module.scss";
import { ImageProps } from "@/shared/types/types";
import { ButtonProps } from "@/shared/types/types";

export interface PromoBlockProps {
  title: string;
  text: string;
  invert: boolean;
  button: ButtonProps;
  icon: ImageProps;
  image: ImageProps;
}

const PromoBlock: React.FC<PromoBlockProps> = (props) => {
  return (
    <section
      className={clsx("page-section section-padding", styles["section-promo"], {
        [styles["invert-layout"]]: props.invert,
      })}
    >
      <div className={styles["section-promo__image"]}>
        {props.image && (
          <Image
            src={process.env.API_URL + props.image.url}
            width={props.image.width}
            height={props.image.height}
            alt={props.image.alternativeText}
          />
        )}
      </div>
      <div className={styles["section-promo__body"]}>
        <div className="container mx-auto max-w-6xl">
          <div className={clsx("flex flex-row", styles["flex-row"])}>
            <div className={styles["section-promo__block"]}>
              <div className={styles["section-promo__icon"]}>
                {props.icon && (
                  <Image
                    src={process.env.API_URL + props.icon.url}
                    width={props.icon.width}
                    height={props.icon.height}
                    alt={props.icon.alternativeText}
                  />
                )}
              </div>
              <div className={styles["section-promo__text"]}>
                {props.title && (
                  <div className={styles["title"]}>
                    <ReactMarkdown components={{ p: "h2" }}>{props.title}</ReactMarkdown>
                  </div>
                )}
                <div className={styles["text"]}>
                  <ReactMarkdown>{props.text}</ReactMarkdown>
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
