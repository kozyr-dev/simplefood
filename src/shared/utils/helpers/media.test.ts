import type { Media } from "@/shared/api";
import { imageProps, mediaUrl, prefixContentImages } from "./media";

const photo: Media = {
  id: "m1",
  url: "/uploads/borsch.jpg",
  alt: "Борщ",
  width: 1600,
  height: 1200,
  formats: { medium: { url: "/uploads/medium_borsch.jpg", width: 750, height: 563 } },
};

describe("media helpers", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = "https://api.example";
  });

  it("puts uploads on the API's public address; absolute URLs stay", () => {
    expect(mediaUrl("/uploads/a.jpg")).toBe("https://api.example/uploads/a.jpg");
    expect(mediaUrl("https://cdn.example/a.jpg")).toBe("https://cdn.example/a.jpg");
  });

  it("uses a variant when asked and present, the original otherwise", () => {
    expect(imageProps(photo, "medium")).toEqual({
      src: "https://api.example/uploads/medium_borsch.jpg",
      width: 750,
      height: 563,
      alt: "Борщ",
    });
    expect(imageProps(photo, "small").src).toBe("https://api.example/uploads/borsch.jpg");
  });

  it("has an empty alt and a fallback size when the API has none", () => {
    expect(imageProps({ ...photo, alt: null, width: null, height: null, formats: null })).toMatchObject({
      alt: "",
      width: 1200,
      height: 800,
    });
  });

  it("prefixes /uploads images in editor HTML, nothing else", () => {
    expect(prefixContentImages('<img src="/uploads/a.jpg"><img src="https://x.example/b.jpg">')).toBe(
      '<img src="https://api.example/uploads/a.jpg"><img src="https://x.example/b.jpg">',
    );
  });
});
