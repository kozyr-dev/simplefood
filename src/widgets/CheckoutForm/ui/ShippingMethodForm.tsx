"use client";

import React, { JSX } from "react";
import clsx from "clsx";
import { ShippingMethod } from "../model/types";

interface Props {
  value: ShippingMethod;
  onChange: (value: ShippingMethod) => void;
}

const OPTIONS: { value: ShippingMethod; label: string }[] = [
  { value: "pickup", label: "Заберу сам" },
  { value: "delivery", label: "Доставка кур’єром" },
];

/** Pickup or delivery; the checkout form asks for an address only for delivery. */
export default function ShippingMethodForm({ value, onChange }: Props): JSX.Element {
  return (
    <div className="form shipping-method-form">
      <div role="radiogroup" aria-label="Спосіб отримання" className="button-radio-group">
        <div className="flex flex-row gap-4">
          {OPTIONS.map((option) => (
            <div className="basis-1/2" key={option.value}>
              <label className={clsx("button-radio-group__button button", { active: value === option.value })}>
                <input
                  type="radio"
                  name="shipping_method"
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
