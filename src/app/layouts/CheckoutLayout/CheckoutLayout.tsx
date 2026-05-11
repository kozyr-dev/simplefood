import { JSX } from "react";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { optionsQuery } from "@/entities/Options";
import FooterWidget from "@/widgets/FooterWidget";
import HeaderCheckoutWidget from "@/widgets/HeaderCheckoutWidget";
import styles from "./CheckoutLayout.module.scss";

interface CheckoutLayoutProps {
  children?: React.ReactNode;
}

export default async function CheckoutLayout({ children }: CheckoutLayoutProps): Promise<JSX.Element> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(optionsQuery());

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
