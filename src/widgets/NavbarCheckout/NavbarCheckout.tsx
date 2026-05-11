import { JSX } from "react";
import Link from "next/link";
import styles from "./NavbarCheckout.module.scss";

export const NavbarCheckout = (): JSX.Element => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-top"]}>
        <div className="container mx-auto max-w-6xl">
          <Link href="/simple-menu" className={styles["navbar-back-link"]}>
            <em className="icon-left icon"></em>Назад до меню
          </Link>
        </div>
      </div>
    </nav>
  );
};
