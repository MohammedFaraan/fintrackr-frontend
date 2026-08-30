import React from "react"
import { Link } from "react-router"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { RiRestaurantLine, RiCarLine, RiShoppingBag3Line, RiHome4Line, RiFileList3Line } from "react-icons/ri"

function getBudgetIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining")) return { icon: RiRestaurantLine, bg: "bg-rose-50 text-rose-500" }
  if (cat.includes("transport") || cat.includes("car")) return { icon: RiCarLine, bg: "bg-amber-50 text-amber-500" }
  if (cat.includes("shop")) return { icon: RiShoppingBag3Line, bg: "bg-rose-50 text-rose-500" }
  if (cat.includes("bill") || cat.includes("util") || cat.includes("house")) return { icon: RiHome4Line, bg: "bg-blue-50 text-blue-600" }
  return { icon: RiFileList3Line, bg: "bg-emerald-50 text-[#00b87c]" }
}

export function BudgetOverviewList({ activeBudgets = [] }) {
  const budgets = activeBudgets.slice(0, 4)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-slate-900">Budget Overview</h3>
          <Link
            to="/budgets"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00b87c] hover:underline"
          >
            View all <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-xs text-slate-400 mb-4">Track your budget progress</p>

        {/* Budgets List */}
        {budgets.length === 0 ? (
          <div className="text-center py-6 space-y-1">
            <p className="text-xs font-semibold text-slate-600">No active budgets set</p>
            <p className="text-[11px] text-slate-400">Set budget limits to track spending thresholds</p>
          </div>
        ) : (
          <div className="space-y-4">
            {budgets.map((b) => {
              const { icon: Icon, bg } = getBudgetIcon(b.category || b.name)
              const percent = Math.min(100, Math.round(Number(b.usage_percentage || 0)))
              const isOver = b.is_exceeded || percent >= 100
              const isWarning = percent >= 80 && !isOver

              return (
                <div key={b.budget_id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6 h-6 rounded-lg ${bg} flex items-center justify-center text-xs shrink-0`}>
                        <Icon />
                      </div>
                      <span className="font-bold text-slate-800 truncate">
                        {b.name || b.category || "Overall"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-500 font-medium">
                        {formatCurrency(b.spent)} / {formatCurrency(b.budget_amount)}
                      </span>
                      <span
                        className={`text-xs font-bold w-8 text-right ${
                          isOver ? "text-rose-500" : isWarning ? "text-amber-500" : "text-slate-700"
                        }`}
                      >
                        {percent}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOver
                          ? "bg-rose-500"
                          : isWarning
                          ? "bg-amber-500"
                          : "bg-[#00b87c]"
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
