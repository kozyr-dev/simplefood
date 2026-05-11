import type { Metadata } from "next";
import { Account } from "@/pages/account";

export const metadata: Metadata = {
  title: "Особистий Кабiнет | Simple Food",
};

export default function AccountPage() {
  return <Account />;
}
