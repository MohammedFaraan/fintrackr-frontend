import React, { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { HiChevronDown } from "react-icons/hi"

const REPORT_CATEGORY_PALETTE = [
  "#00b87c",
  "#f43f5e",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#64748b",
  "#06b6d4",
]

export function SpendingByCategoryChart({ categoriesData }) {
  const [displayMode, setDisplayMode] = useState("amount") // "amount" | "percentage"
  const categories = categoriesData?.categories || []
  const totalAmount = categoriesData?.total_amount || 0

  let cumulativePercentage = 0
  const slices = categories.map((cat, idx) => {
    const percent = Number(cat.percentage || 0)
    const startAngle = (cumulativePercentage / 100) * 360
    cumulativePercentage += percent
    const endAngle = (cumulativePercentage / 100) * 360

    return {
      ...cat,
      color: REPORT_CATEGORY_PALETTE[idx % REPORT_CATEGORY_PALETTE.length],
      startAngle,
      endAngle,
    }
  })

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Spending by Category</h3>
          <p className="text-xs text-slate-400">Where your money goes</p>
        </div>

        {/* View Mode Dropdown */}
        <div className="relative">
          <select
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value)}
            className="h-8 pl-3 pr-7 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none shadow-2xs"
            aria-label="Display mode"
          >
            <option value="amount">By Amount</option>
            <option value="percentage">By Percentage</option>
          </select>
          <HiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Donut Chart & Category Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Left: Donut Chart (5 cols) */}
        <div className="sm:col-span-5 flex justify-center">
          <div className="w-40 h-40 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {slices.length === 0 ? (
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="26"
                />
              ) : (
                slices.map((slice, idx) => (
                  <circle
                    key={idx}
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke={slice.color}
                    strokeWidth="26"
                    strokeDasharray={`${(slice.endAngle - slice.startAngle) * (2 * Math.PI * 70 / 360)} ${2 * Math.PI * 70}`}
                    strokeDashoffset={`-${slice.startAngle * (2 * Math.PI * 70 / 360)}`}
                    className="transition-all duration-300"
                  />
                ))
              )}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(totalAmount)}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Total</div>
            </div>
          </div>
        </div>

        {/* Right: Legend List (7 cols) */}
        <div className="sm:col-span-7 space-y-2 max-h-48 overflow-y-auto pr-1">
          {slices.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center">No categories recorded</p>
          ) : (
            slices.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-slate-700 font-medium truncate">{cat.category}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-slate-900">
                    {formatCurrency(cat.total_amount)}
                  </span>
                  <span className="text-slate-400 text-[11px] w-7 text-right font-medium">
                    {Math.round(Number(cat.percentage))}%
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
