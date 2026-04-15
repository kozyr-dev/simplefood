import { JSX } from "react";
import styles from "./MainLayout.module.scss";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { optionsQuery } from "@/entities/Options/model/queries";
import FooterWidget from "@/widgets/FooterWidget";
import HeaderWidget from "@/widgets/HeaderWidget";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(optionsQuery());

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
