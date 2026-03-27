import clsx from "clsx";
import { JSX } from "react";
import styles from "./NavbarDropdownCart.module.scss";
import ShopCart from "@/shared/ui/blocks/ShopCart/ShopCart";
import { CartState } from "@/shared/types/types";

interface NavbarDropdownCartProps {
  show: boolean;
  cart: CartState; // Replace with actual cart state from context or props
}

export default function NavbarDropdownCart({ show, cart }: NavbarDropdownCartProps): JSX.Element {
  return (
    <div className={clsx(styles["mini_cart"], { [styles["active"]]: show })}>
      <ShopCart cart={cart} />
    </div>
  );
}
