import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact US",
  description: "ช่องทางการติดต่อ MarketNest",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 md:py-20">
      <div className="mb-10 md:mb-14">
        <h1 className="font-heading text-4xl font-bold md:text-4xl">
          Contact us
        </h1>
        <p className="mt-2 text-muted-foreground">
          เรายินดีรับฟังข้อเสนอแนะและตอบทุกคำถาม
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
        <div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-muted-foreground" />
              <span className="text-muted-foreground">hello@marketnest.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-muted-foreground" />
              <span className="text-muted-foreground">02-123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-muted-foreground" />
              <span className="text-muted-foreground">จันทร์ - ศุกร์ 09:00 - 17:00 น.</span>
            </div>
          </div>

          <Separator className="my-6" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            ทีมงานของเราพร้อมตอบทุกข้อสงสัยเกี่ยวกับสินค้า การสั่งซื้อ
            หรือข้อเสนอแนะต่าง ๆ เพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
