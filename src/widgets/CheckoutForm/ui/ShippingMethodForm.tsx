"use client";

import React, { JSX, useState } from "react";
import { Formik, Form, Field } from "formik";
import { ShippingMethod } from "../model/types";

interface Props {
  defaultValue: ShippingMethod;
  onChange: (value: ShippingMethod) => void;
}

export default function ShippingMethodForm(props: Props): React.JSX.Element {
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(props.defaultValue);

  // @ts-ignore
  function handleChange(e): void {
    const val = e.target.value as ShippingMethod;
    setShippingMethod(val);
    props.onChange(val);
  }

  return (
    <Formik
      initialValues={{
        shipping_method: shippingMethod,
      }}
      onSubmit={async (values): Promise<void> => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }): JSX.Element => (
        <Form className="form shipping-method-form" onChange={handleChange}>
          <div role="group" aria-labelledby="my-radio-group" className="button-radio-group">
            <div className="flex flex-row gap-4">
              <div className="basis-1/2">
                <label
                  className={`button-radio-group__button button ${
                    values.shipping_method === "local_pickup" ? "active" : ""
                  }`}
                >
                  <Field type="radio" name="shipping_method" value="local_pickup" />
                  Заберу сам
                </label>
              </div>
              <div className="basis-1/2">
                <label
                  className={`button-radio-group__button button ${
                    values.shipping_method === "flat_rate" ? "active" : ""
                  }`}
                >
                  <Field type="radio" name="shipping_method" value="flat_rate" />
                  Доставка кур’єром
                </label>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
