import type { Media } from "@/shared/api";

type Format = keyof NonNullable<Media["formats"]>;

/** Size for next/image when the API has none (only non-image files lack one). */
const FALLBACK = { width: 1200, height: 800 };

/**
 * An uploaded file's absolute URL. Always the public API address
 * (NEXT_PUBLIC_API_URL): the server and the browser must render the same
 * `src`, and browsers can't reach an internal one.
 */
export function mediaUrl(path: string): string {
  return path.startsWith("/") ? `${process.env.NEXT_PUBLIC_API_URL ?? ""}${path}` : path;
}

/**
 * Props for next/image: a smaller variant when asked for and present (the
 * original otherwise), its size, and the alt text (empty when the editor
 * gave none: a decorative image).
 */
export function imageProps(
  media: Media,
  format?: Format,
): { src: string; width: number; height: number; alt: string } {
  const variant = format ? media.formats?.[format] : undefined;
  const source = variant ?? media;
  return {
    src: mediaUrl(source.url),
    width: source.width ?? FALLBACK.width,
    height: source.height ?? FALLBACK.height,
    alt: media.alt ?? "",
  };
}

/** Points `/uploads/…` images in editor HTML at the API. */
export function prefixContentImages(html: string): string {
  return html.replace(/src="(\/uploads\/[^"]+)"/g, (_, path: string) => `src="${mediaUrl(path)}"`);
}
