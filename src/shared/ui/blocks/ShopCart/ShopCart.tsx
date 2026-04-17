import clsx from "clsx";
import { JSX } from "react";
import Button from "@/shared/ui/base/Button/Button";
import ShopCartItem from "../../elements/ShopCartItem/ShopCartItem";
import styles from "./ShopCart.module.scss";
import { CartItem, CartState } from "@/entities/Cart";

interface ShopCartProps {
  cart: CartState;
}

export default function ShopCart({ cart }: ShopCartProps): JSX.Element {
  const totalAmount = cart.totalAmount.toFixed(0);
  const hasItems = cart.items.length > 0;

  const cartItemRemoveHandler = (id: number): void => {
    console.log("remove item with id:", id);
  };

  const cartDeleteItemHandler = (id: number): void => {
    console.log("delete item with id:", id);
  };

  const cartItemAddHandler = (item: CartItem): void => {
    console.log("add item:", item);
  };

  return (
    <div className={styles["shop-cart"]}>
      <div>
        <table id="scrolltable" className={clsx("table", "scrollable-y")}>
          <tbody>
            <tr className={styles["table-header"]}>
              <th className={clsx("cart_prod", "text-left")} colSpan={2}>
                найменування
              </th>
              <th></th>
              <th className={clsx("text-center")}>ціна</th>
              <th></th>
            </tr>
            {cart.items.map((item) => (
              <ShopCartItem
                key={item.id}
                id={item.id}
                amount={item.amount}
                title={item.title}
                image={item.image}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onDelete={cartDeleteItemHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
              />
            ))}
          </tbody>
        </table>
        <hr className={styles["divider"]} />
        <div className={styles["mini_cart_summary"]}>
          <div className={styles["mini_cart_text"]}>
            <p>
              Вартість доставки розраховує менеджер. При замовленні від 450 грн доставка по центру безкоштовна, якщо
              меньше то 55 грн
            </p>
          </div>
          <div className={styles["mini_cart_allprice"]}>
            <p>
              Загалом: <br />
              <span className={styles["orange"]}>{totalAmount} грн</span>
            </p>
          </div>
          <div className={styles["mini_cart_checkout"]}>
            {hasItems && (
              <Button url="/checkout" className={styles["button--green"]}>
                <>
                  Оформити замовлення
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="20px"
                    viewBox="0 0 476.213 476.213"
                  >
                    <polygon
                      points="345.606,107.5 324.394,128.713 418.787,223.107 0,223.107 0,253.107 418.787,253.107 324.394,347.5
                345.606,368.713 476.213,238.106 "
                    />
                  </svg>
                </>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
