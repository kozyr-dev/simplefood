"use client";

import { JSX } from "react";
import { useSettingsQuery } from "@/entities/Settings";
import { defaultSettings } from "@/shared/constants/constants";
import { Navbar } from "@/widgets/Navbar/Navbar";
import styles from "./HeaderWidget.module.scss";

export function HeaderWidget(): JSX.Element {
  const { data: settings } = useSettingsQuery();

  return (
    <header className={styles["page-header"]}>
      <Navbar settings={settings ?? defaultSettings} />
    </header>
  );
}
