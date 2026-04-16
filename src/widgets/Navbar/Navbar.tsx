"use client";

import clsx from "clsx";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { useHeaderMenuQuery, useDropDownMenuQuery } from "@/entities/Menu";
import NavbarCenter from "../../shared/ui/partials/Navbar/NavbarCenter/NavbarCenter";
import NavbarLogin from "../../shared/ui/partials/Navbar/NavbarLogin/NavbarLogin";
import NavbarTel from "../../shared/ui/partials/Navbar/NavbarTel/NavbarTel";
import NavbarCollapse from "../../shared/ui/partials/Navbar/NavbarCollapse/NavbarCollapse";
import NavbarCollapseDropdownMenu from "../../shared/ui/partials/Navbar/NavbarCollapseDropdownMenu/NavbarCollapseDropdownMenu";
import styles from "./Navbar.module.scss";
import {
  defaultCartState,
  defaultDropDownMenu,
  defaultHeaderMenu,
  defaultSiteOptions,
} from "@/shared/constants/constants";
import { SiteOptions } from "@/shared/types/types";

interface NavbarProps {
  siteOptions?: SiteOptions;
}

export const Navbar = (props: NavbarProps): JSX.Element => {
  const { siteOptions = defaultSiteOptions } = props;
  const { data: headerMenuData } = useHeaderMenuQuery();
  const { data: dropDownMenuData } = useDropDownMenuQuery();

  const headerMenu = headerMenuData?.data?.menuItem || defaultHeaderMenu;
  const dropDownMenu = dropDownMenuData?.data?.menuItem || defaultDropDownMenu;

  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [navBarCollapseDropdownMenuOpen, setNavBarCollapseDropdownMenuOpen] = useState(false);

  const navBarTop = useRef<HTMLDivElement | null>(null);

  const toggleNavBar = useCallback(
    (scrollPos: number) => {
      if (navBarTop.current) {
        if (scrollPos > 100) {
          navBarTop.current.classList.add("hide");
          setNavbarCollapsed(true);
        } else {
          navBarTop.current.classList.remove("hide");
          setNavbarCollapsed(false);
        }
      }
    },
    [navBarTop],
  );

  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    addEventListener("scroll", () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleNavBar(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    });

    return () => {
      navBarTop.current = null;
    };
  }, [toggleNavBar]);

  return (
    <div className={clsx(styles["navbar"], "basis-3/12", "md:visible", "bg-primary")}>
      <div className={clsx(styles["navbar_top"])} ref={navBarTop}>
        <NavbarTel {...siteOptions} />
        <NavbarCenter {...siteOptions} />
        <NavbarLogin />
      </div>
      <NavbarCollapse headerMenu={headerMenu} cart={defaultCartState} />
      <NavbarCollapseDropdownMenu
        navbarCollapsed={navbarCollapsed}
        dropDownMenuOpen={navBarCollapseDropdownMenuOpen}
        siteOptions={siteOptions}
        dropDownMenu={dropDownMenu}
      />
    </div>
  );
};
