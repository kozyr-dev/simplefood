import clsx from "clsx";
import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavbarLogin.module.scss";

type User = {
  username: string;
};

interface NavbarLoginProps {
  user?: User | null;
}

export default function NavbarLogin(props: NavbarLoginProps): JSX.Element {
  const { user } = props;

  return (
    <div className={clsx(styles["navbar-login"], "text-right", "login_blk")}>
      <div className={styles["login"]}>
        <Image src="/login.png" alt="" width="39" height="39" />
        <p>
          <Link href="/account">{user ? user.username : "Увiйти"}</Link>
        </p>
      </div>
    </div>
  );
}
