"use client";

import { JSX } from "react";
import { useOptionsQuery } from "@/entities/Options";
import { Navbar } from "@/widgets/Navbar/Navbar";
import styles from "./HeaderWidget.module.scss";

export function HeaderWidget(): JSX.Element {
  const { data: options } = useOptionsQuery();

  return (
    <header className={styles["page-header"]}>
      <Navbar siteOptions={options ?? undefined} />
    </header>
  );
}
