import React from "react"
import { Link } from "react-router"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight, HiOutlineTag } from "react-icons/hi"
import { RiRestaurantLine, RiCarLine, RiShoppingBag3Line } from "react-icons/ri"

const CATEGORY_PALETTE = [
  "#00b87c",
  "#06b6d4",
  "#3b82f6",
  "#f59e0b",
  "#f43f5e",
  "#8b5cf6",
  "#64748b",
]

function getMiniIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining")) return { icon: RiRestaurantLine, bg: "bg-emerald-50 text-[#00b87c]" }
  if (cat.includes("transport") || cat.includes("car")) return { icon: RiCarLine, bg: "bg-blue-50 text-blue-600" }
  if (cat.includes("shop")) return { icon: RiShoppingBag3Line, bg: "bg-purple-50 text-purple-600" }
  return { icon: HiOutlineTag, bg: "bg-slate-50 text-slate-600" }
}

export function CategorySpendingSidebar({ categoriesData, recentExpenses = [] }) {
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
      color: CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length],
      startAngle,
      endAngle,
    }
  })

  return (
    <div className="space-y-5">
      {/* Card 1: Spending by Category */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Spending by Category</h3>

        {/* Donut Chart + Slices */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 relative mb-4">
            <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
              {slices.length === 0 ? (
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="24"
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
                    strokeWidth="24"
                    strokeDasharray={`${(slice.endAngle - slice.startAngle) * (2 * Math.PI * 70 / 360)} ${2 * Math.PI * 70}`}
                    strokeDashoffset={`-${slice.startAngle * (2 * Math.PI * 70 / 360)}`}
                    className="transition-all duration-300"
                  />
                ))
              )}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <div className="text-xs font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(totalAmount)}
              </div>
              <div className="text-[9px] text-slate-400 font-medium">Total</div>
            </div>
          </div>

          {/* Category List */}
          <div className="w-full space-y-2 max-h-56 overflow-y-auto pr-1">
            {slices.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-2">No category data</p>
            ) : (
              slices.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-0.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-700 truncate">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-slate-800">
                      {formatCurrency(cat.total_amount)}
                    </span>
                    <span className="text-slate-400 text-[11px] w-6 text-right">
                      {Math.round(Number(cat.percentage))}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* View full report link */}
        <div className="pt-4 mt-4 border-t border-slate-100 text-center">
          <Link
            to="/reports"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b87c] hover:underline"
          >
            View full report <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Card 2: Recent Actions / Highlights */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Recent Actions</h3>
        <div className="space-y-3">
          {recentExpenses.slice(0, 3).map((item) => {
            const { icon: Icon, bg } = getMiniIcon(item.category)
            return (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center text-xs shrink-0`}>
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">
                      {item.description}
                    </div>
                    <div className="text-[10px] text-slate-400">{item.date}</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-800 shrink-0">
                  {formatCurrency(item.amount, true)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
