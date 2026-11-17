import type { Metadata } from "next";
import { VerifyEmail } from "@/pages/verifyEmail";

/* As /reset-password: the token is in the fragment; nothing leaks through the referrer. */
export const metadata: Metadata = {
  title: "Підтвердження пошти | Simple Food",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return <VerifyEmail />;
}
