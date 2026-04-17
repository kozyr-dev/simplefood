import clsx from "clsx";
import { JSX, useEffect } from "react";
import { useIsDropdownMenuOpen, useSetDropdownMenuOpen } from "@/entities/NavBar";
import styles from "./NavbarCollapseBtn.module.scss";

export default function NavbarCollapseBtn(): JSX.Element {
  const isOpen = useIsDropdownMenuOpen();
  const navBarCollapseBtnToggle = useSetDropdownMenuOpen();

  return (
    <div
      className={clsx(styles["navbar-collapse-btn"], styles["menu-button"], { [styles["menu-opened"]]: isOpen })}
      onClick={() => navBarCollapseBtnToggle(!isOpen)}
    >
      <button type="button" className={clsx(styles["navbar-toggle"], styles["burger-container"])}>
        <span id={styles["burger"]}>
          <span className={clsx(styles["icon-bar"], styles["bar"], styles["topBar"])}></span>
          <span className={clsx(styles["icon-bar"], styles["bar"], styles["midBar"])}></span>
          <span className={clsx(styles["icon-bar"], styles["bar"], styles["btmBar"])}></span>
        </span>
      </button>
    </div>
  );
}
