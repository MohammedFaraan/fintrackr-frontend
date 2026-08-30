import React from "react"
import { Link } from "react-router"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { 
  HiOutlineArrowNarrowRight, 
  HiOutlineShoppingBag, 
  HiOutlineLightningBolt,
  HiOutlinePlay,
  HiOutlineTag
} from "react-icons/hi"
import { RiCarLine, RiRestaurantLine, RiShoppingBag3Line } from "react-icons/ri"

// Map categories to appropriate icons and background colors
function getCategoryIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining") || cat.includes("grocer")) {
    return {
      icon: RiRestaurantLine,
      bg: "bg-emerald-50 text-[#00b87c]",
    }
  }
  if (cat.includes("transport") || cat.includes("uber") || cat.includes("taxi") || cat.includes("fuel")) {
    return {
      icon: RiCarLine,
      bg: "bg-teal-50 text-teal-600",
    }
  }
  if (cat.includes("shop") || cat.includes("amazon") || cat.includes("cloth")) {
    return {
      icon: RiShoppingBag3Line,
      bg: "bg-blue-50 text-blue-600",
    }
  }
  if (cat.includes("bill") || cat.includes("electric") || cat.includes("utilit")) {
    return {
      icon: HiOutlineLightningBolt,
      bg: "bg-amber-50 text-amber-500",
    }
  }
  if (cat.includes("entertain") || cat.includes("netflix") || cat.includes("stream") || cat.includes("movie")) {
    return {
      icon: HiOutlinePlay,
      bg: "bg-rose-50 text-rose-500",
    }
  }
  return {
    icon: HiOutlineTag,
    bg: "bg-purple-50 text-purple-600",
  }
}

export function RecentExpensesList({ recentExpenses = [] }) {
  const expenses = recentExpenses.slice(0, 5)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900">Recent Expenses</h3>
          <Link
            to="/expenses"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00b87c] hover:underline"
          >
            View all <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Expenses List */}
        {expenses.length === 0 ? (
          <div className="text-center py-8 space-y-1">
            <p className="text-xs font-semibold text-slate-600">No expenses recorded yet</p>
            <p className="text-[11px] text-slate-400">Click "+ Add Expense" to record your first spending</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {expenses.map((expense) => {
              const { icon: Icon, bg } = getCategoryIcon(expense.category)
              return (
                <div key={expense.id} className="flex items-center justify-between group">
                  {/* Left: Icon + Description */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-105`}>
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {expense.description}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {expense.category || "General"}
                      </div>
                    </div>
                  </div>

                  {/* Right: Amount + Date */}
                  <div className="text-right shrink-0">
                    <div className="text-xs font-extrabold text-slate-900">
                      -{formatCurrency(expense.amount, true)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {formatDate(expense.date)}
                    </div>
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
