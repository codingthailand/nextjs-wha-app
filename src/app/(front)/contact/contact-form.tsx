"use client";

import { useTransition, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { Field, FieldLabel, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!json.success) {
          toast.error(json.error ?? "เกิดข้อผิดพลาด");
          return;
        }

        reset();
        setIsSuccess(true);
      } catch {
        toast.error("เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง");
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle className="size-12 text-green-600" />
        <h3 className="text-lg font-semibold">ส่งข้อความสำเร็จ!</h3>
        <p className="text-muted-foreground">
          ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
        </p>
        <Button
          variant="secondary"
          onClick={() => setIsSuccess(false)}
        >
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <Field>
            <FieldLabel>ชื่อ</FieldLabel>
            <FieldContent>
              <Input placeholder="กรอกชื่อของคุณ" {...field} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="example@email.com" {...field} />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </FieldContent>
          </Field>
        )}
      />

      <Controller
        control={control}
        name="message"
        render={({ field }) => (
          <Field>
            <FieldLabel>ข้อความ</FieldLabel>
            <FieldContent>
              <Textarea rows={5} placeholder="พิมพ์ข้อความที่ต้องการ..." {...field} />
              {errors.message && <FieldError>{errors.message.message}</FieldError>}
            </FieldContent>
          </Field>
        )}
      />

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "กำลังส่ง..." : "ส่งข้อความ"}
      </Button>
    </form>
  );
};
