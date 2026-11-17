import { renderHook } from "@testing-library/react";
import { useHashToken } from "./useHashToken";

// Effects run twice, as in `next dev` (a <StrictMode> wrapper alone doesn't do that here).
const strict = { reactStrictMode: true };

describe("useHashToken", () => {
  afterEach(() => window.history.replaceState(null, "", "/"));

  it("reads #token once, then removes it from the address bar, even in StrictMode", () => {
    window.history.replaceState(null, "", "/reset-password?x=1#token=abc_DEF-123");

    const { result } = renderHook(() => useHashToken(), strict);

    expect(result.current).toBe("abc_DEF-123");
    expect(window.location.hash).toBe("");
    expect(window.location.pathname + window.location.search).toBe("/reset-password?x=1");
  });

  it("is null for a link without a token", () => {
    window.history.replaceState(null, "", "/verify-email");

    const { result } = renderHook(() => useHashToken(), strict);

    expect(result.current).toBeNull();
  });
});
