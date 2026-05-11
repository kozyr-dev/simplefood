import clsx from "clsx";
import { JSX } from "react";
import { CartItem, CartState } from "@/entities/Cart";
import { useAddItemToCart, useDeleteItemFromCart, useRemoveItemFromCart } from "@/entities/Cart";
import ShopCartItem from "@/shared/ui/elements/ShopCartItem/ShopCartItem";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./ShopCart.module.scss";

interface ShopCartProps {
  cart: CartState;
  className?: string;
}

export default function ShopCart({ cart, className }: ShopCartProps): JSX.Element {
  const totalAmount = cart.totalAmount.toFixed(0);
  const hasItems = cart.items.length > 0;
  const addItemToCart = useAddItemToCart();
  const deleteItemFromCart = useDeleteItemFromCart();
  const removeItemFromCart = useRemoveItemFromCart();

  const cartItemRemoveHandler = (id: number): void => {
    removeItemFromCart(id);
  };

  const cartDeleteItemHandler = (id: number): void => {
    deleteItemFromCart(id);
  };

  const cartItemAddHandler = (item: CartItem): void => {
    addItemToCart(item);
  };

  return (
    <div className={clsx(styles["shop-cart"], styles[className || ""])}>
      <div>
        {hasItems && (
          <table id={styles["scrolltable"]} className={clsx(styles["table"], "scrollable-y")}>
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
                  className="dark"
                />
              ))}
            </tbody>
          </table>
        )}
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
              <Button url="/checkout" className="button--green button--icon">
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
