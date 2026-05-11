"use client";

import { JSX } from "react";
import { NavbarCheckout } from "@/widgets/NavbarCheckout/NavbarCheckout";
import styles from "./HeaderCheckoutWidget.module.scss";

export function HeaderCheckoutWidget(): JSX.Element {
  return (
    <header className={styles["page-header"]}>
      <NavbarCheckout />
    </header>
  );
}
