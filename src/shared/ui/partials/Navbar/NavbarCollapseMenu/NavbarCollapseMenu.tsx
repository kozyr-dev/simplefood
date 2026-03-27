import { JSX } from "react";
import clsx from "clsx";
import Link from "next/link";
import { HeaderMenu } from "@/shared/types/types";
import styles from "./NavbarCollapseMenu.module.scss";

interface NavbarCollapseMenuProps {
  headerMenu?: HeaderMenu;
}

export default function NavbarCollapseMenu({ headerMenu }: NavbarCollapseMenuProps): JSX.Element {
  return (
    <div className={styles["navbar-collapse-menu"]}>
      {headerMenu && (
        <ul>
          {headerMenu.map((item) => (
            <li className={clsx(styles["menu-item"], item.Classname && styles[item.Classname])} key={item.id}>
              <Link href={item.Link}>{item.Title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
