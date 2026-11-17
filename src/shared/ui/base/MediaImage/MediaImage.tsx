import Image, { type ImageProps } from "next/image";
import type { Media } from "@/shared/api";
import { imageProps } from "@/shared/utils/helpers/media";

interface MediaImageProps extends Omit<ImageProps, "src" | "width" | "height" | "alt"> {
  media: Media;
  /** A smaller variant when it exists (`medium` for cards); the original otherwise. */
  format?: "thumbnail" | "small" | "medium" | "large";
}

/** An uploaded image: its URL on the API, its size, and the editor's alt text. */
export default function MediaImage({ media, format, ...rest }: MediaImageProps) {
  const { src, width, height, alt } = imageProps(media, format);
  return <Image src={src} width={width} height={height} alt={alt} {...rest} />;
}
