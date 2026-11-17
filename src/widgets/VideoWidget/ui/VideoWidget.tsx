import { VideoWidgetProps } from "../model/types";
import styles from "./VideoWidget.module.scss";
import Fancybox from "@/shared/ui/base/Fancybox/Fancybox";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import { prefixContentImages } from "@/shared/utils/helpers/media";

export function VideoWidget(props: VideoWidgetProps) {
  return (
    <section className="page-section section-video">
      <div className="w-full">
        <div className={styles["video-block"]}>
          <div className={styles["video-block__image"]}>
            {props.placeholderImage && <MediaImage media={props.placeholderImage} />}
          </div>
          <div className={styles["video-block__text"]}>
            <div className={styles["play_blk"]}>
              <div className={styles["hx white play_hx"]}>{props.title}</div>
              <div className={styles["play_blk"]}>
                {props.videoUrl && (
                  <Fancybox>
                    <a className={styles["play"]} data-fancybox="" href={props.videoUrl}></a>
                  </Fancybox>
                )}
              </div>
              {props.description && (
                <div
                  className={styles["play_text"]}
                  dangerouslySetInnerHTML={{ __html: prefixContentImages(props.description) }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
