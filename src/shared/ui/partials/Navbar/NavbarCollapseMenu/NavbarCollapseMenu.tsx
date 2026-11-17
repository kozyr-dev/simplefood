import { JSX } from "react";
import clsx from "clsx";
import Link from "next/link";
import type { MenuItem } from "@/shared/api";
import styles from "./NavbarCollapseMenu.module.scss";

interface NavbarCollapseMenuProps {
  headerMenu?: MenuItem[];
}

export default function NavbarCollapseMenu({ headerMenu }: NavbarCollapseMenuProps): JSX.Element {
  return (
    <div className={styles["navbar-collapse-menu"]}>
      {headerMenu && (
        <ul>
          {headerMenu.map((item) => (
            <li className={clsx(styles["menu-item"], item.className && styles[item.className])} key={item.id}>
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
