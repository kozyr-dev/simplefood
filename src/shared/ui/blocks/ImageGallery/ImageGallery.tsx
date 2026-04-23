import React from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
// @ts-ignore
import "@splidejs/react-splide/css";
import Image from "next/image";
import styles from "./ImageGallery.module.scss";
import { ImageProps } from "@/shared/types/types";

export interface ImageGalleryProps {
  title: string;
  images: ImageProps[];
}

const ImageGallery: React.FC<ImageGalleryProps> = (props) => {
  console.log("ImageGallery props:", props);

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
            {props.images &&
              props.images.map((image, index) => (
                <SplideSlide key={index} className={styles["gallery-slider__slide"]}>
                  <Image
                    priority={true}
                    src={process.env.API_URL + (image?.formats?.medium?.url || image.url)}
                    width={image.width}
                    height={image.height}
                    alt={image.alternativeText}
                  />
                </SplideSlide>
              ))}
          </Splide>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
