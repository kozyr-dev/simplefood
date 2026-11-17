"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import styles from "./FooterNav.module.scss";
import type { MenuItem } from "@/shared/api";

export default function FooterNav(props: { footerMenu: MenuItem[] }): JSX.Element {
  const { footerMenu } = props;

  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  const currentRoute = params?.slug || pathname;

  return (
    <div className={styles["page-footer-nav"]}>
      <div className="menu-footer-menu-container">
        {footerMenu && (
          <ul>
            {footerMenu.map((item) => (
              <li className={"menu-item " + (item.className || "")} key={item.id}>
                <Link href={item.link} className={currentRoute === item.link.replace("/", "") ? "active" : ""}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
