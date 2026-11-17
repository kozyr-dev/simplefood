"use client";

import clsx from "clsx";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMenuQuery } from "@/entities/Menu";
import { useIsDropdownMenuOpen, useSetDropdownMenuOpen } from "@/entities/NavBar";
import { useCart } from "@/entities/Cart";
import { useUser } from "@/entities/User";
import NavbarCenter from "@/shared/ui/partials/Navbar/NavbarCenter/NavbarCenter";
import NavbarLogin from "@/shared/ui/partials/Navbar/NavbarLogin/NavbarLogin";
import NavbarTel from "@/shared/ui/partials/Navbar/NavbarTel/NavbarTel";
import NavbarCollapse from "@/shared/ui/partials/Navbar/NavbarCollapse/NavbarCollapse";
import NavbarCollapseDropdownMenu from "@/shared/ui/partials/Navbar/NavbarCollapseDropdownMenu/NavbarCollapseDropdownMenu";
import type { Settings } from "@/shared/api";
import { defaultDropdownMenu, defaultHeaderMenu } from "@/shared/constants/constants";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  settings: Settings;
}

export const Navbar = ({ settings }: NavbarProps): JSX.Element => {
  const { data: headerMenu = defaultHeaderMenu } = useMenuQuery("header");
  const { data: dropdownMenu = defaultDropdownMenu } = useMenuQuery("dropdown");
  const user = useUser();

  // The dropdown's two lists: `main` links on top, `list` ones (with icons) below.
  const dropDownMenu1 = dropdownMenu.filter((item) => item.group === "main");
  const dropDownMenu2 = dropdownMenu.filter((item) => item.group === "list");

  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const navBarCollapseDropdownMenuOpen = useIsDropdownMenuOpen();
  const setDropdownMenuOpen = useSetDropdownMenuOpen();
  const pathname = usePathname();

  useEffect(() => {
    setDropdownMenuOpen(false);
  }, [pathname, setDropdownMenuOpen]);

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

    const onScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          toggleNavBar(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [toggleNavBar]);

  return (
    <div className={clsx(styles["navbar"], "basis-3/12", "md:visible")}>
      <div className={clsx(styles["navbar_top"])} ref={navBarTop}>
        <NavbarTel settings={settings} />
        <NavbarCenter settings={settings} />
        <NavbarLogin user={user} />
      </div>
      <NavbarCollapse headerMenu={headerMenu} cart={useCart()} />
      <NavbarCollapseDropdownMenu
        dropDownMenuOpen={navBarCollapseDropdownMenuOpen}
        navbarCollapsed={navbarCollapsed}
        settings={settings}
        dropDownMenu1={dropDownMenu1}
        dropDownMenu2={dropDownMenu2}
      />
    </div>
  );
};
