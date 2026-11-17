import type { Metadata } from "next";
import { ResetPassword } from "@/pages/resetPassword";

/*
 * The token is in the URL fragment, which browsers never send; no-referrer
 * keeps even the page's address out of other sites' logs.
 */
export const metadata: Metadata = {
  title: "Новий пароль | Simple Food",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <ResetPassword />;
}
