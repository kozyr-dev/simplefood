import { formatPrice } from "./money";

describe("formatPrice", () => {
  it.each([
    [8500, "85"],
    [8550, "85,50"],
    [8505, "85,05"],
    // No thousands separator: Node and browsers disagree on which space to use.
    [125000, "1250"],
    [0, "0"],
  ])("shows %i kopiykas as %s", (kopiykas, text) => {
    expect(formatPrice(kopiykas)).toBe(text);
  });
});
