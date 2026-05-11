import CheckoutLayout from "@/app/layouts/CheckoutLayout/CheckoutLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CheckoutLayout>{children}</CheckoutLayout>;
}
