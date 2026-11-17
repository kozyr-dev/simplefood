import { JSX } from "react";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { menuQuery } from "@/entities/Menu";
import { settingsQuery } from "@/entities/Settings";
import FooterWidget from "@/widgets/FooterWidget";
import HeaderCheckoutWidget from "@/widgets/HeaderCheckoutWidget";
import styles from "./CheckoutLayout.module.scss";

interface CheckoutLayoutProps {
  children?: React.ReactNode;
}

export default async function CheckoutLayout({ children }: CheckoutLayoutProps): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await Promise.all([queryClient.prefetchQuery(settingsQuery()), queryClient.prefetchQuery(menuQuery("footer"))]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={styles["checkout-layout"]}>
        <HeaderCheckoutWidget />
        <main className={styles["page-content"]}>{children}</main>
        <FooterWidget />
      </div>
    </HydrationBoundary>
  );
}
