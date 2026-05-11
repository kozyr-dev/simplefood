import type { Metadata } from "next";
import { Checkout } from "@/pages/checkout";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
};

export default function CheckoutPage() {
  return <Checkout />;
}
