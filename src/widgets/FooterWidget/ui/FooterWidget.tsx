"use client";

import { JSX } from "react";
import { useOptionsQuery } from "@/entities/Options";
import { useFooterMenuQuery } from "@/entities/Menu";
import styles from "./FooterWidget.module.scss";
import Footer from "@/shared/ui/partials/Footer/Footer";
import { defaultFooterMenu, defaultSiteOptions } from "@/shared/constants/constants";

export function FooterWidget(): JSX.Element {
  const { data: options } = useOptionsQuery();
  const { data: footerMenuData } = useFooterMenuQuery();

  console.log("FooterWidget options:", options?.data);

  const siteOptions = options || defaultSiteOptions;
  const footerMenu = footerMenuData?.data?.menuItem || defaultFooterMenu;

  return (
    <footer className={styles["page-footer"]}>
      <Footer siteOptions={siteOptions} footerMenu={footerMenu} />
    </footer>
  );
}
