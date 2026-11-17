"use client";

import { JSX } from "react";
import { useSettingsQuery } from "@/entities/Settings";
import { useMenuQuery } from "@/entities/Menu";
import styles from "./FooterWidget.module.scss";
import Footer from "@/shared/ui/partials/Footer/Footer";
import { defaultFooterMenu, defaultSettings } from "@/shared/constants/constants";

export function FooterWidget(): JSX.Element {
  const { data: settings = defaultSettings } = useSettingsQuery();
  const { data: footerMenu = defaultFooterMenu } = useMenuQuery("footer");

  return (
    <footer className={styles["page-footer"]}>
      <Footer settings={settings} footerMenu={footerMenu} />
    </footer>
  );
}
