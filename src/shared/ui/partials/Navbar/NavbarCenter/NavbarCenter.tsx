import { JSX } from "react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import styles from "./NavbarCenter.module.scss";
import { SiteOptions } from "@/shared/types/types";
import { helpers } from "@/shared/utils/helpers/base";

export default function NavbarCenter({ data }: SiteOptions): JSX.Element {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    helpers.scrollToAnchor("#delivery");
  };

  return (
    <div className={clsx(styles["center_blk"], "text-center")}>
      <div className={clsx("text-center", styles["working"])}>
        <table>
          <tbody>
            <tr>
              <td className="text-left">{data?.takingOrdersHours}</td>
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
