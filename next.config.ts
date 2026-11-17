import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";

/*
 * The API's address, chosen when the app is built (the values are inlined):
 * - API_URL: for server-side calls; may be an internal address.
 * - NEXT_PUBLIC_API_URL: for the browser and for image URLs; must be public.
 * `next build` uses PROD_API_URL unless STAGING=1; `next dev` uses DEV_API_URL.
 */
module.exports = (phase: string): NextConfig => {
  // `next dev` or `npm run dev`, whatever STAGING says
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // `next build` or `npm run build`
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";

  const env = {
    API_URL: isProd ? process.env.PROD_API_URL : process.env.DEV_API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.DEV_API_URL,
  };

  return {
    output: "standalone",
    reactStrictMode: true,
    env,
    images: {
      unoptimized: isDev,
      // Where uploaded images come from (the Nest API serves /uploads).
      remotePatterns: [
        { protocol: "http", hostname: "localhost", port: "1339" },
        { protocol: "http", hostname: "simplefood-backend" },
        { protocol: "https", hostname: "api-simplefood.kozyr.info" },
      ],
    },
  };
};
