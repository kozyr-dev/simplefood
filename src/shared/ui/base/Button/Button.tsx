import clsx from "clsx";
import { JSX } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  url?: string | undefined;
  children: JSX.Element | string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <div className={styles["button-wrapper"]} onClick={props.onClick}>
      {props.url ? (
        <Link
          href={props.url}
          className={clsx(styles["button"], ...(props.className || "").split(" ").map((cls) => styles[cls]))}
        >
          {props.children}
        </Link>
      ) : (
        <a className={clsx(styles["button"], ...(props.className || "").split(" ").map((cls) => styles[cls]))}>
          {props.children}
        </a>
      )}
    </div>
  );
}
