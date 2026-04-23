import { JSX, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { useAddItemToCart } from "@/entities/Cart";
import { Product } from "@/entities/Product";
import { helpers } from "@/shared/utils/helpers/base";
import styles from "./ProductCard.module.scss";

export function ProductCard(props: Product): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let timeout: any = undefined;

  const [quantity, setQuantity] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);
  const addItemToCart = useAddItemToCart();

  const descriptionRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const successfulMessage = useRef<HTMLDivElement>(null);

  const toggleDetails = (e: React.MouseEvent<HTMLHeadingElement>): void => {
    e.preventDefault();
    if (descriptionRef.current) {
      helpers.slideToggle(descriptionRef.current);
    }
  };

  const decrease = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!amountInputRef.current) return;

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 99) {
      setAmountIsValid(false);
      return;
    }

    addToCartHandler(enteredAmountNumber);
  };

  const successfulMessageHandler = (): void => {
    clearTimeout(timeout);
    if (successfulMessage.current) {
      helpers.fadeIn(successfulMessage.current);
    }
    timeout = setTimeout(() => {
      if (successfulMessage.current) {
        helpers.fadeOut(successfulMessage.current);
      }
    }, 1000);
  };

  const addToCartHandler = (amount: number): void => {
    if (!amountIsValid) return;

    addItemToCart({
      id: props.id,
      title: props.title,
      image: props.image,
      amount: amount,
      price: props.price,
    });

    successfulMessageHandler();
  };

  return (
    <form className={styles["product-b"]} onSubmit={submitHandler}>
      <div className={styles["product-b__i"]}>
        <div className={styles["product-b__image"]}>
          {props.image && (
            <Image
              src={process.env.API_URL + props.image.url}
              width={props.image.width}
              height={props.image.height}
              alt={props.image.alternativeText}
            />
          )}
        </div>
        <div className={styles["product-b__description"]}>
          <h5 className={styles["product-b__title"]} onClick={toggleDetails}>
            {props.title}
          </h5>
          <div className={styles["product-b__details"]} ref={descriptionRef}>
            <div className={styles["product-b__desc"]} dangerouslySetInnerHTML={{ __html: props.description }}></div>
            <p className={styles["product-b__meta"]}>
              <span className={styles["weight"]}>{props.weight} г</span>
              {props.calories ? <span className={styles["calories"]}>{props.calories} ккал</span> : ""}
            </p>
          </div>
          <div className={styles["product-b__weight"]}>{props.weight}г</div>
          <div className={styles["product-b__qty"]}>
            <div className={styles["quantity"]}>
              <div className={styles["minus"]}>
                <a href="#" className="q_down1" onClick={decrease}>
                  <em className="icon icon-minus"></em>
                </a>
              </div>
              <div className={styles["chick"]}>
                <input
                  type="text"
                  name="quantity"
                  id={`amount_${props.id}`}
                  value={quantity}
                  size={2}
                  min="1"
                  max="99"
                  step="1"
                  className={styles["input-quantity"]}
                  ref={amountInputRef}
                  disabled
                />
              </div>
              <div className={styles["plus"]}>
                <a href="#" className="q_up1" onClick={increase}>
                  <em className={clsx(styles["icon"], "icon-plus")}></em>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["product-b__cta"]}>
          <button type="submit" className={styles["add-to-cart"]} aria-label="Добавити  у кошик">
            <em className={clsx(styles["icon"], "icon-basket-1")}></em>
            {props.price}
            <span>₴</span>
          </button>
        </div>
        <div className={styles["product-b__add-to-cart-successful"]} ref={successfulMessage}>
          <div className={styles["product_wrapper_ok"]}>
            <p className={styles["text-center"]}>Додано у кошик!</p>
            <Image src="/big_ok.jpg" alt="" width="93" height="93" />
          </div>
        </div>
      </div>
    </form>
  );
}
