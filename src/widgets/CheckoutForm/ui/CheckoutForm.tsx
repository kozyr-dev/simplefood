"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone";
import classNames from "classnames/bind";
import Image from "next/image";
import { useCart } from "@/entities/Cart";
import { useUser } from "@/entities/User";
import { useOptionsQuery } from "@/entities/Options";
import { Order } from "@/entities/Order";
import { useSendOrder } from "@/features/Order/placeOrder";
import { useResetCart } from "@/entities/Cart";
import ShippingMethodForm from "./ShippingMethodForm";
import { MyTextArea, MyTextInput } from "@/shared/ui/forms/FormInputs";
import { ShippingMethod } from "../model/types";
import styles from "./CheckoutForm.module.scss";

interface Props {
  onOrderPlaced: () => void;
  onError: () => void;
}

export function CheckoutForm(props: Props): React.JSX.Element {
  const [formProcessing, setFormProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("flat_rate");

  const user = useUser();
  const cartData = useCart();
  const { data: siteOptions } = useOptionsQuery();
  const resetCart = useResetCart();
  const sendOrder = useSendOrder();
  const address: string = siteOptions?.data?.address || "";

  function handleShippingMethodChange(value: ShippingMethod): void {
    setShippingMethod(value);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submitBtnClass = classNames({
    processing: formProcessing,
  });

  return (
    <div>
      <div className="mt-9 mb-8">
        <ShippingMethodForm onChange={handleShippingMethodChange} defaultValue={shippingMethod} />
      </div>
      <Formik
        initialValues={{
          username: user?.username || "",
          phone: user?.phone || "",
          address: user?.address || "",
          shopAddress: address || "",
          comments: "",
          shipping: shippingMethod || "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().max(30, "Must be 30 characters or less").required("Required Field"),
          phone: Yup.string().phone("UA", true).required("Required Field"),
          address: Yup.string().max(50, "Must be 50 characters or less").required("Required Field"),
        })}
        onSubmit={async (values, { setSubmitting }): Promise<void> => {
          let dishesList = "";
          cartData.items.map((item) => {
            dishesList += `${item.title} - ${item.amount} шт. \n`;
          });

          const data: Order = {
            address: shippingMethod === "flat_rate" ? values.address : values.shopAddress,
            name: values.username,
            email: user?.email || "",
            phone: values.phone,
            dishes: dishesList,
            amount: cartData.totalAmount,
            userId: user?.id || null,
            comments: values.comments,
          };

          try {
            await sendOrder(data);
            resetCart();
            props.onOrderPlaced();
          } catch (error) {
            console.error("Error placing order:", error);
            props.onError();
          }

          setFormProcessing(false);

          setSubmitting(false);
        }}
      >
        {/* @ts-ignore */}
        <Form className={clsx("form", styles["checkout-form"])}>
          <div className="form-row mb-4">
            <div className="form-group">
              <MyTextInput name="username" type="text" placeholder="Ім’я" className="form-control" />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="form-group">
              <MyTextInput name="phone" type="tel" placeholder="(111)111-1111" className="form-control" />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="form-group">
              {shippingMethod === "flat_rate" ? (
                <MyTextInput name="address" type="text" placeholder="Адреса доставки" className="form-control" />
              ) : (
                <MyTextInput
                  disabled={shippingMethod !== "local_pickup"}
                  name="shopAddress"
                  type="text"
                  placeholder="Адреса доставки"
                  className="form-control"
                />
              )}
              <MyTextInput
                hidden
                disabled
                name="shipping"
                type="text"
                value={shippingMethod}
                placeholder="Метод доставки"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-row mb-4">
            <div className="form-group">
              <MyTextArea name="comments" type="text" placeholder="Коментарі" className="form-control" />
            </div>
          </div>
          <div className="form-submit mt-8">
            <button
              type="submit"
              className={"form-submit-btn form-submit-btn--plain form-submit-btn--large " + submitBtnClass}
              disabled={formProcessing}
            >
              {((): string => (formProcessing ? "Відправка..." : "ОФОРМИТИ ЗАМОВЛЕННЯ"))()}
            </button>
            {formProcessing && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
          </div>
        </Form>
      </Formik>
    </div>
  );
}
