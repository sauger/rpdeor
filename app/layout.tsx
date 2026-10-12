import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "首页 · EOR 运营台",
    template: "%s · EOR 运营台",
  },
  description: "内部 EOR 运营台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[#111111]">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  );
}
