import React from "react"
import { cn } from "@/lib/utils"

export function Logo({ className, iconSize = 26, isLight = false }) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 font-bold tracking-tight select-none", className)}>
      {/* FinTrackr Geometric Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Outer glow/gradient circle */}
          <rect width="32" height="32" rx="8" fill="#00b87c" fillOpacity="0.12" />
          {/* Interlocking modern fin-track shape */}
          <path
            d="M8 12C8 9.79086 9.79086 8 12 8H20C22.2091 8 24 9.79086 24 12V14C24 16.2091 22.2091 18 20 18H12C9.79086 18 8 16.2091 8 14V12Z"
            fill="#00b87c"
          />
          <path
            d="M10 18C10 15.7909 11.7909 14 14 14H22C24.2091 14 26 15.7909 26 18V20C26 22.2091 24.2091 24 22 24H14C11.7909 24 10 22.2091 10 20V18Z"
            fill="#00a36d"
            fillOpacity="0.85"
          />
          <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      <span className={cn(
        "text-xl font-extrabold tracking-tight",
        isLight ? "text-white" : "text-slate-900"
      )}>
        Fin<span className="text-[#00b87c]">Trackr</span>
      </span>
    </div>
  )
}
