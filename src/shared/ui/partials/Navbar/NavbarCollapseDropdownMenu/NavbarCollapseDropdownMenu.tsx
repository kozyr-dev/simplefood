import clsx from "clsx";
import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavbarCollapseDropdownMenu.module.scss";
import type { MenuItem, Settings } from "@/shared/api";

interface NavbarCollapseDropdownMenuProps {
  dropDownMenuOpen: boolean;
  navbarCollapsed: boolean;
  settings: Settings;
  dropDownMenu1?: MenuItem[];
  dropDownMenu2?: MenuItem[];
}

export default function NavbarCollapseDropdownMenu({
  dropDownMenuOpen,
  navbarCollapsed,
  settings,
  dropDownMenu1,
  dropDownMenu2,
}: NavbarCollapseDropdownMenuProps): JSX.Element {
  return (
    <div
      className={clsx([styles["menus"]], { [styles["open"]]: dropDownMenuOpen, [styles["shrink"]]: navbarCollapsed })}
    >
      <div className={styles["menus__wrap"]}>
        <div className={styles["menus__main"]}>
          <div className={clsx(styles["menus__group"], styles["menus__group--top"])}>
            <ul className={styles["menu-list"]}>
              <li className={styles["menu-list__item"]}>
                <Link href="/">Головна сторінка</Link>
              </li>
            </ul>
          </div>
          <hr />
          <div className={clsx(styles["menus__group"], styles["menus__group--main"])}>
            {dropDownMenu1 && (
              <ul className={styles["menu-list"]}>
                {dropDownMenu1.map((item) => (
                  <li className={clsx(styles["menu-list__item"], styles[item.className || ""])} key={item.id}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr />
          <div className={clsx(styles["menus__group"], styles["menus__group--bottom"])}>
            {dropDownMenu2 && (
              <ul className={styles["menu-list"]}>
                {dropDownMenu2.map((item) => (
                  <li
                    className={clsx(
                      styles["menu-list__item"],
                      ...(item.className || "").split(" ").map((cls) => styles[cls]),
                    )}
                    key={item.id}
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr />
        <div className={styles["menus__contact"]}>
          <div className={styles["menus__contact__phone"]}>
            <a href={`tel:${settings.phone || ""}`}>
              <Image src="/phone1.png" alt="" width="35" height="35" />
              {settings.phone}
            </a>
          </div>
          <div className={styles["menus__contact__social"]}>
            <div className={styles["fsoc"]}>
              <div className={styles["fsoc__item"]}>
                <Link target="_blank" href={settings.facebook || ""}>
                  <em className="icon icon-facebook"></em>
                </Link>
              </div>
              <div className={styles["fsoc__item"]}>
                <Link target="_blank" href={settings.instagram || ""}>
                  <em className="icon icon-instagram"></em>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
