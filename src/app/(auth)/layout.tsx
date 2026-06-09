import type { Metadata } from "next";
import { Lora, Open_Sans, Source_Code_Pro, Prompt } from "next/font/google";
import { cn } from "@/lib/utils";
import "../globals.css";

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

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["thai"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MarketNest — เข้าสู่ระบบ",
  description: "เรียนรู้การเขียน Next.js",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        prompt.className,
        openSans.variable,
        lora.variable,
        sourceCodePro.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
