import { getStrapiURL } from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getStrapiMedia(media: any): string {
  const { url } = media;
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export function prefixContentImages(html: string): string {
  return html.replace(/src="(\/uploads\/[^"]+)"/g, (_, path) => `src="${getStrapiURL(path)}"`);
}
