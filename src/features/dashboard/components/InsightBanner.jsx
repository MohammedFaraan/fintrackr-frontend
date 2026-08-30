import React, { useState } from "react"
import { HiOutlineLightBulb, HiOutlineX } from "react-icons/hi"

export function InsightBanner({ comparison }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  // Calculate insight text based on actual comparison data
  const percentChange = comparison?.percentage_change
  const isLower = percentChange !== null && percentChange !== undefined && Number(percentChange) < 0
  const isHigher = percentChange !== null && percentChange !== undefined && Number(percentChange) > 0

  let title = "You're doing great! 🎉"
  let description = "Stay mindful of your daily expenses to keep your savings on track."

  if (isLower) {
    title = "You're doing great! 🎉"
    description = `Your spending is ${Math.abs(Number(percentChange))}% lower than the previous period. Keep it up!`
  } else if (isHigher) {
    title = "Spending Alert 💡"
    description = `Your spending is ${Math.abs(Number(percentChange))}% higher than the previous period. Consider reviewing your top categories.`
  }

  return (
    <div className="rounded-2xl bg-[#e6f8f1] border border-[#00b87c]/25 p-4 flex items-center justify-between shadow-xs animate-in fade-in duration-300">
      <div className="flex items-center gap-3.5">
        {/* Lightbulb Icon Badge */}
        <div className="w-10 h-10 rounded-xl bg-[#00b87c] text-white flex items-center justify-center text-lg shrink-0 shadow-sm shadow-[#00b87c]/20">
          <HiOutlineLightBulb />
        </div>

        {/* Text */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
            {title}
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-[#00b87c]/10 transition-colors"
        aria-label="Dismiss insight"
      >
        <HiOutlineX className="w-4 h-4" />
      </button>
    </div>
  )
}
