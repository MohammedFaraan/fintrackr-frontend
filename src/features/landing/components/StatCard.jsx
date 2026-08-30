import React from "react"

export function StatCard({ stat }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0066cc] tracking-tight mb-2">
        {stat.value}
      </div>
      <div className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide">
        {stat.label}
      </div>
    </div>
  )
}
