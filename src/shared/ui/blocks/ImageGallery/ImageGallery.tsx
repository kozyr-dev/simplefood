import React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import type { SectionOf } from "@/shared/api";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import styles from "./ImageGallery.module.scss";

export type ImageGalleryProps = SectionOf<"image-gallery">;

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  return (
    <section className="page-section section-padding section-gallery">
      <div className="w-full">
        <div className="basis-full">
          {props.title && (
            <h2 className="section-title">
              <ReactMarkdown skipHtml={true}>{props.title}</ReactMarkdown>
            </h2>
          )}
          <Splide
            className={styles["gallery-slider"]}
            options={{
              arrows: true,
              perPage: 3,
              type: "loop",
              padding: "5rem",
              start: 2,
            }}
          >
            {props.images.map((image) => (
              <SplideSlide key={image.id} className={styles["gallery-slider__slide"]}>
                <MediaImage media={image} format="medium" priority={true} />
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
