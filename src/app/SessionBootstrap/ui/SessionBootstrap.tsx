"use client";

import { useSessionBootstrap } from "@/features/Auth";

/** Restores the signed-in session once per page load (the token lives only in memory). */
export function SessionBootstrap(): null {
  useSessionBootstrap();
  return null;
}
