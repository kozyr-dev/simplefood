"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The `#token=…` of an emailed link, read once and then removed from the
 * address bar (and so from history and screenshots). The fragment never
 * reaches the server or a Referer header. `undefined` until read; `null`
 * when the link had none.
 *
 * Read once per mount: React's development mode runs effects twice, and
 * the second run would find the address already cleaned.
 */
export function useHashToken(): string | null | undefined {
  const read = useRef<string | null | undefined>(undefined);
  const [token, setToken] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (read.current === undefined) {
      read.current = new URLSearchParams(window.location.hash.slice(1)).get("token");
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }
    // Reading the URL is only possible after mounting.
    setToken(read.current);
  }, []);

  return token;
}
