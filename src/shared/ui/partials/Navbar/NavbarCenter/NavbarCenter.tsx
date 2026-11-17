import { JSX } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/shared/api";
import styles from "./NavbarCenter.module.scss";

export default function NavbarCenter({ settings }: { settings: Settings }): JSX.Element {
  return (
    <div className={clsx(styles["center_blk"], "text-center")}>
      <div className={clsx("text-center", styles["working"])}>
        <table>
          <tbody>
            <tr>
              <td className="text-left">{settings.takingOrdersHours}</td>
            </tr>
            <tr>
              <td className={clsx("text-right", "text-white")}>Без вихідних</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={clsx(styles["logo"], "lg:visible")}>
        <Link href="/">
          <Image src="/logo.png" alt="Simple Food" width="231" height="41" />
        </Link>
      </div>
      <div className={clsx(styles["logo1"], "md:visible", "lg:invisible")}>
        <Link href="/">
          <Image src="/logo2.png" alt="Simple Food" width="37" height="41" />
        </Link>
      </div>

      <div className={clsx("text-center", styles["freeship"])}>
        <Image src="/rocket.png" alt="" width="42" height="42" />
        <p className={clsx(styles["text"])}>
          <Link href="/shipping">
            <span>Карта </span>доставки
          </Link>
        </p>
      </div>
    </div>
  );
}
