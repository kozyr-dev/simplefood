import clsx from "clsx";
import React, { JSX, useState } from "react";
import styles from "./NavbarCollapseBtn.module.scss";

export default function NavbarCollapseBtn(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const navBarCollapseBtnToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={clsx(styles["navbar-collapse-btn"], styles["menu-button"], { [styles["menu-opened"]]: isOpen })}
      onClick={navBarCollapseBtnToggle}
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
