import type { Metadata } from "next";
import Link from "next/link";
import AppLoading from "../components/app-loading";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "เกี่ยวกับ MarketNest",
  description: "เรื่องราวของตลาดงานฝีมือออนไลน์ MarketNest",
};

async function ApiVersion() {
  const response = await fetch('https://api.codingthailand.com/api/version');
  const apiInfo = await response.json();

  return <p className="text-code text-muted-foreground">API Version: {apiInfo.data.version}</p>;
}

// http://localhost:3000/about
export default function AboutPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="font-heading text-display">เกี่ยวกับ MarketNest</h1>
        <p className="mt-6 text-body-large text-muted-foreground">
          MarketNest คือตลาดออนไลน์สำหรับงานฝีมือและสินค้าแฮนด์เมด
          ที่ทุกชิ้นงานบอกเล่าเรื่องราวของช่างฝีมือไทย
        </p>
        <div className="mt-8">
          <Suspense fallback={<AppLoading />}>
            <ApiVersion />
          </Suspense>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-primary underline underline-offset-4 hover:text-[#9A3412] transition-colors">
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  );
}
