"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import styles from "./FooterNav.module.scss";
import { FooterMenu } from "@/shared/types/types";

export default function FooterNav(props: { footerMenu: FooterMenu }): JSX.Element {
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
              <li className={"menu-item " + (item?.Classname || "")} key={item.id}>
                <Link href={item.Link} className={currentRoute === item.Link?.replace("/", "") ? "active" : ""}>
                  {item.Title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
