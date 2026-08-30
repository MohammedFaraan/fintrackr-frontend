import React from "react"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import { HiOutlineCalendar, HiOutlineExclamation, HiOutlineCheckCircle } from "react-icons/hi"
import { RiWallet3Line, RiPieChart2Line } from "react-icons/ri"

export function BudgetsSummaryCards({ activeBudgets = [] }) {
  let totalBudget = 0
  let totalSpent = 0
  let overBudgetCount = 0

  activeBudgets.forEach((b) => {
    const budgetAmount = Number(b.budget_amount || b.amount || 0)
    const spentAmount = Number(b.spent || 0)
    totalBudget += budgetAmount
    totalSpent += spentAmount
    if (b.is_exceeded || spentAmount > budgetAmount) {
      overBudgetCount += 1
    }
  })

  const remainingBudget = Math.max(0, totalBudget - totalSpent)
  const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
  const remainingPercentage = totalBudget > 0 ? (remainingBudget / totalBudget) * 100 : 0
  const categoryCount = activeBudgets.length

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Budget */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Total Budget</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00b87c] flex items-center justify-center text-base">
            <RiWallet3Line />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(totalBudget)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Across {categoryCount} {categoryCount === 1 ? "category" : "categories"}
        </div>
      </div>

      {/* Card 2: Total Spent */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Total Spent</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-base">
            <RiPieChart2Line />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(totalSpent)}
        </div>
        <div className="mt-2 text-xs font-medium text-slate-500">
          <span className="font-bold text-rose-500">{spentPercentage.toFixed(1)}%</span> of total budget
        </div>
      </div>

      {/* Card 3: Remaining Budget */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Remaining Budget</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
            <HiOutlineCalendar />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(remainingBudget)}
        </div>
        <div className="mt-2 text-xs font-medium text-slate-500">
          <span className="font-bold text-[#00b87c]">{remainingPercentage.toFixed(1)}%</span> remaining
        </div>
      </div>

      {/* Card 4: Over Budget */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Over Budget</span>
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-base ${
              overBudgetCount > 0 ? "bg-amber-50 text-amber-500" : "bg-emerald-50 text-[#00b87c]"
            }`}
          >
            {overBudgetCount > 0 ? <HiOutlineExclamation /> : <HiOutlineCheckCircle />}
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {overBudgetCount}
        </div>
        <div className="mt-2 text-xs">
          {overBudgetCount > 0 ? (
            <span className="text-rose-500 font-semibold">
              {overBudgetCount} {overBudgetCount === 1 ? "category" : "categories"} over budget
            </span>
          ) : (
            <span className="text-[#008f5f] font-semibold">All categories on track</span>
          )}
        </div>
      </div>
    </div>
  )
}
