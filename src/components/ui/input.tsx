import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[42px] w-full min-w-0 rounded-sm border border-input bg-white px-3.5 py-1 text-base transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[#A8A29E] focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-[rgba(194,65,12,0.15)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F5F5F4] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
