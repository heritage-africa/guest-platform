import type React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s  -  heritage.africa", default: "Cloud  -  heritage.africa" },
  description:
    "Powerful, scalable, and secure cloud infrastructure designed for African businesses.",
  icons: [{ url: "/favicon.png", rel: "shortcut icon" }]
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;

  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
