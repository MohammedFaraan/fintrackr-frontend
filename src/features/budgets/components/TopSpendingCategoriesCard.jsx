import React from "react"
import { Link } from "react-router"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight, HiOutlineTag } from "react-icons/hi"
import { RiRestaurantLine, RiCarLine, RiShoppingBag3Line } from "react-icons/ri"

function getMiniCategoryIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining")) return { icon: RiRestaurantLine, bg: "bg-emerald-50 text-[#00b87c]" }
  if (cat.includes("transport") || cat.includes("car")) return { icon: RiCarLine, bg: "bg-amber-50 text-amber-500" }
  if (cat.includes("shop")) return { icon: RiShoppingBag3Line, bg: "bg-rose-50 text-rose-500" }
  return { icon: HiOutlineTag, bg: "bg-blue-50 text-blue-600" }
}

export function TopSpendingCategoriesCard({ activeBudgets = [], categorySpending = [] }) {
  // Combine budget and spending info
  const items = activeBudgets.slice(0, 3).map((b) => {
    const budgetAmount = Number(b.budget_amount || b.amount || 0)
    const spentAmount = Number(b.spent || 0)
    const usagePercent = budgetAmount > 0 ? Math.round((spentAmount / budgetAmount) * 100) : 0
    return {
      category: b.category || b.name,
      spent: spentAmount,
      budget: budgetAmount,
      usagePercent,
    }
  })

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Top Spending Categories</h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">This month</span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-400 py-4 text-center">No category spending data yet</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, idx) => {
            const { icon: Icon, bg } = getMiniCategoryIcon(item.category)
            const isOver = item.usagePercent >= 100
            const isAlmostOver = item.usagePercent >= 80 && !isOver

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center text-xs shrink-0`}>
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 truncate">{item.category}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.usagePercent}% of {formatCurrency(item.budget)}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 shrink-0">
                    {formatCurrency(item.spent)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOver
                        ? "bg-rose-500"
                        : isAlmostOver
                        ? "bg-amber-500"
                        : "bg-[#00b87c]"
                    }`}
                    style={{ width: `${Math.min(100, item.usagePercent)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* View all link */}
      <div className="pt-4 mt-4 border-t border-slate-100 text-center">
        <Link
          to="/expenses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b87c] hover:underline"
        >
          View all transactions <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
