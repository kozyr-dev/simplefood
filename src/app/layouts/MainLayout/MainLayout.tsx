import { JSX } from "react";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { menuQuery } from "@/entities/Menu";
import { settingsQuery } from "@/entities/Settings";
import FooterWidget from "@/widgets/FooterWidget";
import HeaderWidget from "@/widgets/HeaderWidget";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children?: React.ReactNode;
}

/**
 * Header and footer with the shop's settings and menus, loaded on the
 * server so the first paint has them. If the API fails the widgets fall
 * back to the defaults in shared/constants.
 */
export default async function MainLayout({ children }: MainLayoutProps): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(settingsQuery()),
    queryClient.prefetchQuery(menuQuery("header")),
    queryClient.prefetchQuery(menuQuery("dropdown")),
    queryClient.prefetchQuery(menuQuery("footer")),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles["main-layout"]}>
        <HeaderWidget />
        <main className={styles["page-content"]}>{children}</main>
        <FooterWidget />
      </div>
    </HydrationBoundary>
  );
}
