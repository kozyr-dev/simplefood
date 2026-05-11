"use client";

import clsx from "clsx";
import { JSX, useState } from "react";
import { useCart } from "@/entities/Cart";
import { useOptionsQuery } from "@/entities/Options";
import ShopCart from "@/widgets/ShopCart/ShopCart";
import { CheckoutForm } from "@/widgets/CheckoutForm/ui/CheckoutForm";
import Button from "@/shared/ui/base/Button/Button";
import styles from "./Checkout.module.scss";

export function Checkout(): JSX.Element {
  const cart = useCart();
  const { data: siteOptions } = useOptionsQuery();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleOrderPlaced(): void {
    setOrderPlaced(true);
  }
  function handleOrderError(): void {
    setIsError(true);
  }

  return (
    <section className="page-section section-padding section-checkout">
      {cart.items.length === 0 && !orderPlaced ? (
        <div className="container mx-auto max-w-6xl">
          <div className={clsx(styles["empty-box"], "mt-9 mb-8")}>
            <h1 className="text-center">Кошик</h1>
            <h5 className="text-center">Ваш кошик порожній.</h5>
            <div className="cta">
              <Button className="button--green" url="/simple-menu">
                Повернутись до меню
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mx-auto max-w-6xl">
          {orderPlaced ? (
            <div className={clsx(styles["thank-you-message"], "mt-9 mb-8")}>
              <h1>Дякуємо за ваше замовлення!</h1>
              <h5>Чекайте на наш дзвінок.</h5>
              <div className="cta">
                <Button className="button--green" url="/simple-menu">
                  Повернутись до меню
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-10">
              <div className="basis-1/2">
                <h6>ВАШЕ ЗАМОВЛЕННЯ</h6>
                <br />
                <ShopCart className="checkout" cart={cart} />
              </div>
              <div className="basis-1/2">
                {isError ? (
                  <div className={clsx(styles["error-message"], "mt-9 mb-8")}>
                    <h2>Виникла помилка!</h2>
                    <h6>Зв&lsquo;яжіться з нами за номером {siteOptions?.data?.phone}.</h6>
                    <div className="cta">
                      <Button className="button--green" url="/simple-menu">
                        Повернутись до меню
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h6>Дані для замовлення</h6>
                    <CheckoutForm onOrderPlaced={handleOrderPlaced} onError={handleOrderError} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
