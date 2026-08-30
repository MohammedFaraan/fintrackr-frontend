import React, { useState } from "react"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import { HiChevronDown } from "react-icons/hi"

const CATEGORY_COLORS = [
  "#00b87c", // Emerald
  "#06b6d4", // Cyan / Teal
  "#3b82f6", // Blue
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#64748b", // Slate
]

export function CategoryBreakdownChart({
  topCategories = [],
  totalAmount = 0,
  period = "this_month",
  onPeriodChange,
}) {
  const [hoveredCategory, setHoveredCategory] = useState(null)

  // Use real backend categories, or fallback to empty
  const categories = topCategories || []
  const validTotal = Number(totalAmount) || categories.reduce((sum, c) => sum + Number(c.total_amount || 0), 0)

  // Generate SVG Donut slices
  let cumulativePercentage = 0
  const donutSlices = categories.map((cat, index) => {
    const percent = validTotal > 0 ? (Number(cat.total_amount) / validTotal) * 100 : 0
    const startAngle = (cumulativePercentage / 100) * 360
    cumulativePercentage += percent
    const endAngle = (cumulativePercentage / 100) * 360

    return {
      category: cat.category,
      amount: cat.total_amount,
      percentage: Math.round(percent),
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      startAngle,
      endAngle,
    }
  })

  // SVG Helper to calculate donut arc
  const createArc = (startAngle, endAngle, radius, strokeWidth) => {
    const r = radius
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180

    const x1 = 100 + r * Math.cos(startRad)
    const y1 = 100 + r * Math.sin(startRad)
    const x2 = 100 + r * Math.cos(endRad)
    const y2 = 100 + r * Math.sin(endRad)

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`
  }

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Category Breakdown</h3>
          <p className="text-xs text-slate-400">Where your money goes</p>
        </div>

        {onPeriodChange && (
          <div className="relative inline-block">
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg pl-2.5 pr-7 py-1 focus:outline-none cursor-pointer"
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
              <option value="all_time">All Time</option>
            </select>
            <HiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Main Container: Donut + Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-2">
        {/* Donut Chart */}
        <div className="sm:col-span-5 relative flex items-center justify-center">
          <div className="w-36 h-36 relative">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {donutSlices.length === 0 ? (
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="24"
                />
              ) : (
                donutSlices.map((slice, idx) => {
                  const isHovered = hoveredCategory === slice.category
                  return (
                    <circle
                      key={idx}
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={slice.color}
                      strokeWidth={isHovered ? 28 : 24}
                      strokeDasharray={`${(slice.endAngle - slice.startAngle) * (2 * Math.PI * 70 / 360)} ${2 * Math.PI * 70}`}
                      strokeDashoffset={`-${slice.startAngle * (2 * Math.PI * 70 / 360)}`}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredCategory(slice.category)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    />
                  )
                })
              )}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="text-xs font-extrabold text-slate-900 tracking-tight leading-tight">
                {formatCurrency(validTotal)}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                Total
              </div>
            </div>
          </div>
        </div>

        {/* Legend List */}
        <div className="sm:col-span-7 space-y-2 pr-1 max-h-[190px] overflow-y-auto">
          {donutSlices.length === 0 ? (
            <div className="text-xs text-slate-400 py-4 text-center">
              No category expenses recorded yet
            </div>
          ) : (
            donutSlices.map((item, idx) => {
              const isHovered = hoveredCategory === item.category
              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isHovered ? "bg-slate-50 font-bold" : "hover:bg-slate-50/60"
                  }`}
                  onMouseEnter={() => setHoveredCategory(item.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-700 truncate">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-semibold text-slate-900">
                      {formatCurrency(item.amount)}
                    </span>
                    <span className="text-slate-400 text-[11px] w-7 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
