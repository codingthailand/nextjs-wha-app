import { Suspense } from "react";
import type { Metadata } from "next";
import { Lora, Open_Sans, Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MarketNest — ตลาดงานฝีมือออนไลน์",
  description: "ค้นพบสินค้าแฮนด์เมดจากช่างฝีมือทั่วไทย",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(openSans.variable, lora.variable, sourceCodePro.variable)}
    >
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Navbar />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
