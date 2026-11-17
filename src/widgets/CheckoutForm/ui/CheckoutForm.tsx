"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useCart, useDeleteItemFromCart, useResetCart } from "@/entities/Cart";
import type { Order } from "@/entities/Order";
import { useSettingsQuery } from "@/entities/Settings";
import { useUser } from "@/entities/User";
import { useSendOrder } from "@/features/Order/placeOrder";
import { ApiError, errorMessage, fieldErrors } from "@/shared/api";
import { emailField, nameField, phoneField } from "@/shared/lib/validation";
import { MyTextArea, MyTextInput } from "@/shared/ui/forms/FormInputs";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import { useSessionStatus } from "@/shared/session";
import ShippingMethodForm from "./ShippingMethodForm";
import { ShippingMethod } from "../model/types";
import styles from "./CheckoutForm.module.scss";

interface Props {
  onOrderPlaced: (order: Order) => void;
  onError: () => void;
}

/** The cart lines a 409 PRODUCTS_UNAVAILABLE names (`items.2.productId`), by product id. */
function unavailableLines(error: ApiError, productIds: string[]): string[] {
  return error.details
    .map(({ field }) => Number(/^items\.(\d+)\./.exec(field)?.[1]))
    .filter((index) => Number.isInteger(index) && productIds[index] !== undefined)
    .map((index) => productIds[index]);
}

/**
 * Guests and signed-in customers order alike: the API prices the order
 * from its own data and links it to the account when there is a session.
 */
export function CheckoutForm(props: Props): React.JSX.Element | null {
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("delivery");
  const [unavailable, setUnavailable] = useState<string[]>([]);

  const user = useUser();
  const sessionStatus = useSessionStatus();
  const cart = useCart();
  const { openSnackbar } = useSnackbarHook();
  const { data: settings } = useSettingsQuery();
  const resetCart = useResetCart();
  const deleteItem = useDeleteItemFromCart();
  const sendOrder = useSendOrder();

  // Wait for the session and the profile (both restored after load), so a
  // customer's details are filled in: Formik reads them only once.
  if (sessionStatus === "unknown" || (sessionStatus === "authenticated" && !user)) return null;

  const removeUnavailable = (e: React.MouseEvent): void => {
    e.preventDefault();
    unavailable.forEach((id) => deleteItem(id));
    setUnavailable([]);
  };

  const unavailableTitles = cart.items.filter((item) => unavailable.includes(item.id)).map((item) => item.title);

  return (
    <div>
      <div className="mt-9 mb-8">
        <ShippingMethodForm value={shippingMethod} onChange={setShippingMethod} />
      </div>
      <Formik
        initialValues={{
          name: user?.name ?? "",
          email: user?.email ?? "",
          phone: user?.phone ?? "",
          address: user?.address ?? "",
          comments: "",
        }}
        validationSchema={Yup.object({
          name: nameField(),
          email: emailField(),
          phone: phoneField().required("Обов’язкове поле"),
          address:
            shippingMethod === "delivery"
              ? Yup.string().trim().max(500, "Не більше 500 символів").required("Обов’язкове поле")
              : Yup.string(),
          comments: Yup.string().max(1000, "Не більше 1000 символів"),
        })}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          setUnavailable([]);
          try {
            const order = await sendOrder({
              items: cart.items.map((item) => ({ productId: item.id, quantity: item.amount })),
              name: values.name.trim(),
              email: values.email.trim(),
              phone: values.phone.trim(),
              shippingMethod,
              // Pickup: no address (the shop's is shown, not sent as the customer's).
              ...(shippingMethod === "delivery" && { address: values.address.trim() }),
              ...(values.comments.trim() && { comments: values.comments.trim() }),
            });
            // Emptied only once the order exists.
            resetCart();
            props.onOrderPlaced(order);
          } catch (error) {
            if (error instanceof ApiError && error.code === "PRODUCTS_UNAVAILABLE") {
              setUnavailable(unavailableLines(error, cart.items.map((item) => item.id)));
              return;
            }
            const errors = fieldErrors(error);
            if (Object.keys(errors).length) {
              setErrors(errors);
            } else if (error instanceof ApiError && (error.status === 429 || error.status === 0)) {
              openSnackbar("error", errorMessage(error));
            } else {
              props.onError();
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={clsx("form", styles["checkout-form"])}>
            <div className="form-row mb-4">
              <div className="form-group">
                <MyTextInput name="name" type="text" placeholder="Ім’я" className="form-control" autoComplete="name" />
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group">
                <MyTextInput name="email" type="email" placeholder="Email" className="form-control" autoComplete="email" />
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group">
                <MyTextInput
                  name="phone"
                  type="tel"
                  placeholder="(111)111-1111"
                  className="form-control"
                  autoComplete="tel"
                />
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group">
                {shippingMethod === "delivery" ? (
                  <MyTextInput
                    name="address"
                    type="text"
                    placeholder="Адреса доставки"
                    className="form-control"
                    autoComplete="street-address"
                  />
                ) : (
                  <p>Адреса самовивозу: {settings?.address}</p>
                )}
              </div>
            </div>
            <div className="form-row mb-4">
              <div className="form-group">
                <MyTextArea name="comments" placeholder="Коментарі" className="form-control" />
              </div>
            </div>
            {unavailableTitles.length > 0 && (
              <div className="form-row mb-4 error-message">
                <p>
                  Ці страви зараз недоступні: {unavailableTitles.join(", ")}.{" "}
                  <a href="#" onClick={removeUnavailable}>
                    Прибрати їх з кошика
                  </a>
                </p>
              </div>
            )}
            <div className="form-submit mt-8">
              <button
                type="submit"
                className={clsx("form-submit-btn form-submit-btn--plain form-submit-btn--large", {
                  processing: isSubmitting,
                })}
                disabled={isSubmitting || cart.items.length === 0}
              >
                {isSubmitting ? "Відправка..." : "ОФОРМИТИ ЗАМОВЛЕННЯ"}
              </button>
              {isSubmitting && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
