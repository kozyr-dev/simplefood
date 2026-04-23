/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (phase: string, { defaultConfig }: any) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
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
      remotePatterns: [
        { protocol: "http", hostname: "localhost", port: "1338" },
        { protocol: "http", hostname: "simplefood-backend" },
        { protocol: "https", hostname: "api-simplefood.kozyr.info" },
      ],
    },
  };
};
