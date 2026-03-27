import clsx from "clsx";
import { JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NavbarCollapseDropdownMenu.module.scss";
import { SiteOptions, DropDownMenu } from "@/shared/types/types";

interface NavbarCollapseDropdownMenuProps {
  dropDownMenuOpen: boolean;
  navbarCollapsed: boolean;
  siteOptions?: SiteOptions;
  dropDownMenu?: DropDownMenu;
}

export default function NavbarCollapseDropdownMenu({
  dropDownMenuOpen,
  navbarCollapsed,
  siteOptions,
  dropDownMenu,
}: NavbarCollapseDropdownMenuProps): JSX.Element {
  return (
    <div className={clsx([styles.menus], { open: dropDownMenuOpen, shrink: navbarCollapsed })}>
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
            {dropDownMenu?.menuItem && (
              <ul className={styles["menu-list"]}>
                {dropDownMenu.menuItem.map((item) => (
                  <li className={clsx(styles["menu-list__item"], styles[item.Classname || ""])} key={item.id}>
                    <Link href={item.Link}>{item.Title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <hr />
          <div className={clsx(styles["menus__group"], styles["menus__group--bottom"])}>
            {dropDownMenu?.menuListItem && (
              <ul className={styles["menu-list"]}>
                {dropDownMenu.menuListItem.map((item) => (
                  <li
                    className={clsx(styles["menu-list__item"], styles["menu_img"], styles[item.Classname || ""])}
                    key={item.id}
                  >
                    <Link href={item.Link}>{item.Title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <hr />
        <div className={styles["menus__contact"]}>
          <div className={styles["menus__contact__phone"]}>
            <a href={`tel:${siteOptions?.phone || ""}`}>
              <Image src="/phone1.png" alt="" width="35" height="35" />
              {siteOptions?.phone}
            </a>
          </div>
          <div className={styles["menus__contact__social"]}>
            <div className={styles["fsoc"]}>
              <div className={styles["fsoc__item"]}>
                <Link target="_blank" href={siteOptions?.facebook || ""}>
                  <em className="icon icon-facebook"></em>
                </Link>
              </div>
              <div className={styles["fsoc__item"]}>
                <Link target="_blank" href={siteOptions?.instagram || ""}>
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
