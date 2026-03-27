import { JSX } from "react";
import styles from "./NavbarCheckout.module.scss";

interface NavbarCheckoutProps {
  children?: React.ReactNode;
}

export default function NavbarCheckout({ children }: NavbarCheckoutProps): JSX.Element {
  return (
    <div className={styles.navbarCheckout}>
      {children}
    </div>
  );
}
