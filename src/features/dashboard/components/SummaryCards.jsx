import React from "react"
import { formatCurrency, formatPercentage } from "@/lib/formatters"
import { 
  HiOutlineCalendar, 
  HiArrowSmUp, 
  HiArrowSmDown 
} from "react-icons/hi"
import { RiWallet3Line, RiPieChart2Line } from "react-icons/ri"
import { TbPigMoney } from "react-icons/tb"

export function SummaryCards({ summary, comparison, topCategories, activeBudgets }) {
  // 1. Total Spending
  const totalAmount = summary?.total_amount || 0
  const percentageChange = comparison?.percentage_change
  const isSpendingUp = percentageChange !== null && percentageChange !== undefined && Number(percentageChange) > 0
  const isSpendingDown = percentageChange !== null && percentageChange !== undefined && Number(percentageChange) < 0

  // 2. Top Category
  const topCategory = topCategories && topCategories.length > 0 ? topCategories[0] : null
  const topCategoryName = topCategory?.category || summary?.highest_category || "None"
  const topCategoryAmount = topCategory?.total_amount || summary?.highest_category_amount || 0
  const topCategoryPercent = topCategory?.percentage ? Math.round(Number(topCategory.percentage)) : 0

  // 3. Active Budgets Aggregate
  let totalBudgetAmount = 0
  let totalBudgetSpent = 0
  if (activeBudgets && activeBudgets.length > 0) {
    activeBudgets.forEach((b) => {
      totalBudgetAmount += Number(b.budget_amount || 0)
      totalBudgetSpent += Number(b.spent || 0)
    })
  }
  const overallBudgetPercent = totalBudgetAmount > 0 ? Math.min(100, Math.round((totalBudgetSpent / totalBudgetAmount) * 100)) : 0
  const overallBudgetRemaining = Math.max(0, totalBudgetAmount - totalBudgetSpent)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Spending */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Total Spending</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00b87c] flex items-center justify-center text-base">
            <RiWallet3Line />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(totalAmount)}
        </div>
        <div className="mt-2 flex items-center gap-1 text-xs">
          {percentageChange !== null && percentageChange !== undefined ? (
            <>
              {isSpendingUp ? (
                <span className="flex items-center text-rose-500 font-bold">
                  <HiArrowSmUp className="w-4 h-4" />
                  {Math.abs(Number(percentageChange))}%
                </span>
              ) : isSpendingDown ? (
                <span className="flex items-center text-emerald-600 font-bold">
                  <HiArrowSmDown className="w-4 h-4" />
                  {Math.abs(Number(percentageChange))}%
                </span>
              ) : (
                <span className="text-slate-400 font-medium">0%</span>
              )}
              <span className="text-slate-400 font-normal">from last period</span>
            </>
          ) : (
            <span className="text-slate-400 text-[11px]">{summary?.expense_count || 0} expenses recorded</span>
          )}
        </div>
      </div>

      {/* Card 2: Period / Average Spending */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Average / Day</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
            <HiOutlineCalendar />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(summary?.average_amount || 0)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Across {summary?.expense_count || 0} transaction{summary?.expense_count === 1 ? "" : "s"}
        </div>
      </div>

      {/* Card 3: Top Category */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-500">Top Category</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-base">
            <RiPieChart2Line />
          </div>
        </div>
        <div className="text-xs font-bold text-slate-700 truncate mb-1">
          {topCategoryName}
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(topCategoryAmount)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          {topCategoryPercent > 0 ? `${topCategoryPercent}% of total spending` : "No category data"}
        </div>
      </div>

      {/* Card 4: Budget Overview */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-500">Budget Overview</span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base">
            <TbPigMoney />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {totalBudgetAmount > 0 ? `${overallBudgetPercent}%` : "No budget"}
        </div>
        <div className="mt-1 text-xs text-slate-400">
          {totalBudgetAmount > 0
            ? `${formatCurrency(overallBudgetRemaining)} left`
            : "Create a budget to track limits"}
        </div>
        {/* Progress Bar */}
        {totalBudgetAmount > 0 && (
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                overallBudgetPercent >= 100
                  ? "bg-rose-500"
                  : overallBudgetPercent >= 80
                  ? "bg-amber-500"
                  : "bg-[#00b87c]"
              }`}
              style={{ width: `${Math.min(100, overallBudgetPercent)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
