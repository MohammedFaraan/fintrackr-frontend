import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#00b87c] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#00b87c] text-white hover:bg-[#00a36d] shadow-sm hover:shadow-[#00b87c]/20 hover:shadow-md",
        primary:
          "bg-[#00b87c] text-white hover:bg-[#00a36d] shadow-sm hover:shadow-[#00b87c]/20 hover:shadow-md",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200/80",
        outline:
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
        ghost:
          "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
        dark:
          "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
        link:
          "text-[#00b87c] underline-offset-4 hover:underline p-0 h-auto font-medium",
      },
      size: {
        default: "h-11 px-5 py-2.5 rounded-full text-sm",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-12 px-7 rounded-full text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
