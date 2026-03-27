import clsx from "clsx";
import { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavBarDropdownCart from "../NavbarDropdownCart/NavbarDropdownCart";
import { CartState } from "@/shared/types/types";
import styles from "./NavbarCollapseCart.module.scss";

interface NavbarCollapseCartProps {
  cart: CartState; // Replace with actual cart state from context or props
}

export default function NavbarCollapseCart({ cart }: NavbarCollapseCartProps): JSX.Element {
  const [cartIsShown, setCartIsShown] = useState(false);

  const totalAmount = Number(cart.totalAmount.toFixed(0));

  const setIsShownHandler = (show: boolean) => {
    if (show === true && cart.items.length) {
      setCartIsShown(true);
    } else {
      setCartIsShown(false);
    }
  };

  return (
    <div className={styles["navbar-cart"]}>
      <div className={clsx(styles["img-responsive"], styles["cart_img"])}>
        <Image src="/cart.svg" alt="" width="30" height="30" />
      </div>
      <div
        className={clsx(styles["cart"], styles["cart-content"])}
        onMouseEnter={() => setIsShownHandler(true)}
        onMouseLeave={() => setIsShownHandler(false)}
      >
        <Link href="/checkout" className={clsx(styles["link_cart"], { [styles["not-empty"]]: totalAmount > 0 })}>
          <p className={styles["text_cart"]}>
            <span className={styles["sec"]}>
              <span className={styles["price-total"]}>{totalAmount}</span> ₴
            </span>
          </p>
        </Link>
        <NavBarDropdownCart show={cartIsShown} cart={cart} />
      </div>
    </div>
  );
}
