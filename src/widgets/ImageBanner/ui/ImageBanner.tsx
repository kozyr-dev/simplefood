import clsx from "clsx";
import { JSX } from "react";
import ReactMarkdown from "react-markdown";
import Button from "@/shared/ui/base/Button/Button";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import { prefixContentImages } from "@/shared/utils/helpers/media";
import styles from "./ImageBanner.module.scss";
import { ImageBannerProps } from "../model/types";

export function ImageBanner(props: ImageBannerProps): JSX.Element {
  const { title, text, image, backgroundColor, button } = props;

  return (
    <div
      className={clsx(styles["page-section"], styles["section-padding"], styles["image-banner"])}
      style={{ backgroundColor: backgroundColor ?? undefined }}
    >
      <div className={clsx(styles["image-banner__image"])}>
        {image && <MediaImage media={image} loading="eager" />}
      </div>
      <div className={clsx(styles["image-banner__content"])}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-row justify-center">
            <div className={clsx(styles["image-banner__text"], "py-28", "max-w-xl")}>
              {title && (
                <h1 className={clsx(styles["section-title"])}>
                  <ReactMarkdown>{title}</ReactMarkdown>
                </h1>
              )}
              {text && (
                <div className={clsx(styles["text"])} dangerouslySetInnerHTML={{ __html: prefixContentImages(text) }} />
              )}
              {button && (
                <div className="cta">
                  <Button className="button button--white button--large" url={button.url}>
                    {button.text}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
