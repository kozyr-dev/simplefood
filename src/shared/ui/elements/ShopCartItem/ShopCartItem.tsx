import clsx from "clsx";
import { JSX } from "react";
import Image from "next/image";
import styles from "./ShopCartItem.module.scss";
import { ImageProps } from "@/shared/types/types";

interface ShopCartItemProps {
  key: number;
  id: number;
  title: string;
  image: ImageProps;
  amount: number;
  price: number;
  onRemove: () => void;
  onDelete: () => void;
  onAdd: () => void;
}

export default function ShopCartItem(props: ShopCartItemProps): JSX.Element {
  return (
    <div className={styles["cart-product-info"]} data-product-id={props.id}>
      <td className={clsx("text-left", "mini_cart_img")}>
        <Image
          className="img-responsive"
          src={process.env.API_URL + props.image.url}
          width={props.image.width}
          height={props.image.height}
          alt={props.image.alternativeText}
        />
      </td>
      <td className={clsx("text-left", "mini_cart_prod", "blk_cart")}>
        <p className={clsx("mini_name_prod")}>{props.title}</p>
      </td>
      <td width="18%" className={clsx("text-right")}>
        <div className={clsx("quantity")}>
          <div className={clsx("minus")}>
            <span className={clsx("q_down1")} onClick={props.onRemove}>
              <em className={clsx("icon", "icon-minus")}></em>
            </span>
          </div>
          <div className={clsx("chick")}>
            <input
              type="text"
              name="quantity"
              value={props.amount}
              size={2}
              min={1}
              max={99}
              className={clsx("input-quantity", "form-control")}
              disabled
            />
          </div>
          <div className={styles["plus"]}>
            <span className={clsx("q_up1")} onClick={props.onAdd}>
              <em className={clsx("icon", "icon-plus")}></em>
            </span>
          </div>
        </div>
      </td>
      <td width="13%" className={clsx("text-right")}>
        <p className={clsx("mini_price", "white")}>{props.price * props.amount} грн</p>
      </td>
      <td width="9%" className={clsx("text-center", "remove")}>
        <span className={clsx("remove-product")} onClick={props.onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
        </span>
      </td>
    </div>
  );
}
