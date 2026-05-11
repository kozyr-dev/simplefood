import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import { Suspense } from "react";
import { QueryProvider } from "@/app/QueryProvider";
import MainLayout from "@/app/layouts/MainLayout/MainLayout";
import { NavigationProgress } from "@/shared/ui/partials/NavigationProgress/NavigationProgress";
import "@/shared/styles/globals.scss";

const openSans = localFont({
  src: [
    {
      path: "../src/shared/fonts/OpenSansRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/OpenSansMedium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/OpenSansSemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/OpenSansBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-open-sans",
});

const geometria = localFont({
  src: [
    {
      path: "../src/shared/fonts/Geometria-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/Geometria-LightItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../src/shared/fonts/Geometria.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/Geometria-Italic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../src/shared/fonts/Geometria-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../src/shared/fonts/Geometria-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/Geometria-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../src/shared/fonts/Geometria-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-geometria",
});

export const metadata: Metadata = {
  title: "Simple Food",
  description: "Food ordering app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${openSans.variable} ${geometria.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        <QueryProvider>{children}</QueryProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
