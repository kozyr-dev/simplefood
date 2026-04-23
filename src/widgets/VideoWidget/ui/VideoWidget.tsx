import Image from "next/image";
import { VideoWidgetProps } from "../model/types";
import styles from "./VideoWidget.module.scss";
import Fancybox from "@/shared/ui/base/Fancybox/Fancybox";

export function VideoWidget(props: VideoWidgetProps) {
  return (
    <section className="page-section section-video">
      <div className="w-full">
        <div className={styles["video-block"]}>
          <div className={styles["video-block__image"]}>
            <Image
              src={process.env.API_URL + props.image.url}
              width={props.image.width}
              height={props.image.height}
              alt={props.image.alternativeText}
            />
          </div>
          <div className={styles["video-block__text"]}>
            <div className={styles["play_blk"]}>
              <div className={styles["hx white play_hx"]}>{props.title}</div>
              <div className={styles["play_blk"]}>
                <Fancybox>
                  <a className={styles["play"]} data-fancybox="" href={props.videoUrl}></a>
                </Fancybox>
              </div>
              <div className={styles["play_text"]} dangerouslySetInnerHTML={{ __html: props.description }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
