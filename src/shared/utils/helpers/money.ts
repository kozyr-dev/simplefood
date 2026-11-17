/*
 * No thousands separator (as the old site): Node's and the browser's ICU
 * data differ in which space they put there, and server-rendered prices
 * must match the browser's exactly.
 */
const HRYVNIAS = new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 2, useGrouping: false });
const WITH_KOPIYKAS = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: false,
});

/**
 * A price for display, in hryvnias without the currency sign: "85",
 * "1250", "85,50". The API and the cart keep integer kopiykas; only
 * display divides.
 */
export function formatPrice(kopiykas: number): string {
  return (kopiykas % 100 === 0 ? HRYVNIAS : WITH_KOPIYKAS).format(kopiykas / 100);
}
