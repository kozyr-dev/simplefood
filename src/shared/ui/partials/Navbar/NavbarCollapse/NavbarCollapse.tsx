import { JSX } from "react";
import NavbarCollapseBtn from "../NavbarCollapseBtn/NavbarCollapseBtn";
import NavbarCollapseMenu from "../NavbarCollapseMenu/NavbarCollapseMenu";
import NavbarCollapseCart from "../NavbarCollapseCart/NavbarCollapseCart";
import { CartState, HeaderMenu } from "@/shared/types/types";
import styles from "./NavbarCollapse.module.scss";

interface NavbarCollapseProps {
  headerMenu?: HeaderMenu;
  cart: CartState; // Replace with actual cart state from context or props
}

export default function NavbarCollapse({ headerMenu, cart }: NavbarCollapseProps): JSX.Element {
  return (
    <div className={styles["navbar-collapse"]} id="myNavbar">
      <ul className="navbar-nav">
        <li className="menu_blk">
          <NavbarCollapseBtn />
        </li>
      </ul>
      <NavbarCollapseMenu headerMenu={headerMenu} />
      <NavbarCollapseCart cart={cart} />
    </div>
  );
}
