import React, { JSX } from "react";
import clsx from "clsx";
import Link from "next/link";
import FooterNav from "./FooterNav/FooterNav";
import styles from "./Footer.module.scss";
import { FooterMenu, SiteOptions } from "@/shared/types/types";

interface FooterProps {
  siteOptions: SiteOptions;
  footerMenu: FooterMenu;
}

export default function Footer(props: FooterProps): JSX.Element {
  const { siteOptions, footerMenu } = props;

  return (
    <footer className={styles["page-footer"]}>
      <div className="container mr-auto ml-auto max-w-6xl max-w-7xl">
        <div className="flex flex-row">
          <div className={clsx(styles["flogo"], "basis-3/12")}>
            <div className={styles["times"]}>
              <svg width="24" height="26" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />
              </svg>
              <p>
                Замовлення приймаються:
                <br />
                {siteOptions?.data.takingOrdersHours} | без вихідних
              </p>
            </div>
          </div>
          <div className={clsx(styles["fmenu"], "basis-7/12")}>
            <FooterNav footerMenu={footerMenu} />
          </div>
          <div className={clsx(styles["fsoc"], "basis-2/12")}>
            <ul>
              <li className={styles["menu-soc"]}>
                <Link target="_blank" href={siteOptions?.data.facebook || "#"}>
                  <em className={clsx("icon, icon-facebook")}></em>
                </Link>
              </li>
              <li className={styles["menu-soc"]}>
                <Link target="_blank" href={siteOptions?.data.instagram || "#"}>
                  <em className={clsx("icon, icon-instagram")}></em>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
