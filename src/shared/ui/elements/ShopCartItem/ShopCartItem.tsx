import clsx from "clsx";
import { JSX } from "react";
import type { Media } from "@/shared/api";
import MediaImage from "@/shared/ui/base/MediaImage/MediaImage";
import { formatPrice } from "@/shared/utils/helpers/money";
import styles from "./ShopCartItem.module.scss";

interface ShopCartItemProps {
  id: string;
  title: string;
  image: Media | null;
  amount: number;
  /** Unit price in kopiykas. */
  price: number;
  onRemove: () => void;
  onDelete: () => void;
  onAdd: () => void;
  className?: string;
}

export default function ShopCartItem(props: ShopCartItemProps): JSX.Element {
  return (
    <tr className={clsx(styles["cart-product-info"], styles[props.className || ""])} data-product-id={props.id}>
      <td className={clsx("text-left", styles["mini_cart_img"])}>
        {props.image && <MediaImage className="img-responsive" media={props.image} format="thumbnail" />}
      </td>
      <td className={clsx(styles["mini-cart-prod"], "text-left", "blk_cart")}>
        <p className={clsx(styles["mini_name_prod"])}>{props.title}</p>
      </td>
      <td width="18%" className={clsx("text-right")}>
        <div className={clsx(styles["quantity"])}>
          <div className={clsx(styles["minus"])}>
            <span className={clsx(styles["q_down1"])} onClick={props.onRemove}>
              <em className={clsx("icon", "icon-minus")}></em>
            </span>
          </div>
          <div className={clsx(styles["chick"])}>
            <input
              type="text"
              name="quantity"
              value={props.amount}
              size={2}
              min={1}
              max={99}
              className={clsx(styles["input-quantity"], "form-control")}
              disabled
            />
          </div>
          <div className={styles["plus"]}>
            <span className={clsx(styles["q_up1"])} onClick={props.onAdd}>
              <em className={clsx("icon", "icon-plus")}></em>
            </span>
          </div>
        </div>
      </td>
      <td width="13%" className={clsx("text-right")}>
        <p className={clsx(styles["mini_price"], "white")}>{formatPrice(props.price * props.amount)} грн</p>
      </td>
      <td width="9%" className={clsx("text-center", styles["remove"])}>
        <span className={clsx(styles["remove-product"])} onClick={props.onDelete}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24">
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
          </svg>
        </span>
      </td>
    </tr>
  );
}
