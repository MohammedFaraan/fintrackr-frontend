import React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border border-[#00b87c]/30 bg-[#e8fbf3] text-[#008f5f]",
        secondary:
          "border border-slate-200 bg-slate-100 text-slate-700",
        dark:
          "border border-slate-700 bg-slate-800/80 text-emerald-400",
        outline:
          "border border-slate-300 text-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
