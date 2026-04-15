"use client";

import { JSX } from "react";
import { useOptionsQuery } from "@/entities/Options";
import Footer from "@/shared/ui/partials/Footer/Footer";
import styles from "./FooterWidget.module.scss";

export function FooterWidget(): JSX.Element {
  const { data: options } = useOptionsQuery();

  return (
    <footer className={styles["page-footer"]}>
      <Footer siteOptions={options ?? undefined} />
    </footer>
  );
}
