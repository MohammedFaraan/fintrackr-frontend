import React from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiOutlineCalendar, HiArrowSmUp, HiArrowSmDown, HiOutlineDocumentText } from "react-icons/hi"
import { RiWallet3Line, RiPieChart2Line } from "react-icons/ri"

export function ReportsSummaryCards({ summary, comparison, expenses = [] }) {
  const totalAmount = summary?.total_amount || 0
  const expenseCount = summary?.expense_count || expenses.length || 0
  const averageDaily = summary?.average_amount || 0

  // Calculate highest spending day from expenses
  const dayTotals = {}
  expenses.forEach((exp) => {
    const d = exp.date
    if (!dayTotals[d]) dayTotals[d] = 0
    dayTotals[d] += Number(exp.amount || 0)
  })

  let highestDay = null
  let highestDayAmount = 0
  Object.keys(dayTotals).forEach((d) => {
    if (dayTotals[d] > highestDayAmount) {
      highestDayAmount = dayTotals[d]
      highestDay = d
    }
  })

  const percentChange = comparison?.percentage_change
  const isSpendingUp = percentChange !== null && percentChange !== undefined && Number(percentChange) > 0
  const isSpendingDown = percentChange !== null && percentChange !== undefined && Number(percentChange) < 0

  let prevPeriodLabel = "previous period"
  if (comparison?.previous_period?.start_date && comparison?.previous_period?.end_date) {
    prevPeriodLabel = `${formatDate(comparison.previous_period.start_date)} - ${formatDate(comparison.previous_period.end_date)}`
  }

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
          {percentChange !== null && percentChange !== undefined ? (
            <>
              {isSpendingUp ? (
                <span className="flex items-center text-rose-500 font-bold">
                  <HiArrowSmUp className="w-4 h-4" />
                  {Math.abs(Number(percentChange))}%
                </span>
              ) : isSpendingDown ? (
                <span className="flex items-center text-emerald-600 font-bold">
                  <HiArrowSmDown className="w-4 h-4" />
                  {Math.abs(Number(percentChange))}%
                </span>
              ) : (
                <span className="text-slate-400 font-medium">0%</span>
              )}
              <span className="text-slate-400 font-normal truncate">from {prevPeriodLabel}</span>
            </>
          ) : (
            <span className="text-slate-400 text-[11px]">{expenseCount} expenses recorded</span>
          )}
        </div>
      </div>

      {/* Card 2: Average Daily Spending */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Average Daily Spending</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-base">
            <RiPieChart2Line />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(averageDaily)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Per recorded transaction
        </div>
      </div>

      {/* Card 3: Highest Spending Day */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Highest Spending Day</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
            <HiOutlineCalendar />
          </div>
        </div>
        <div className="text-xl font-extrabold text-slate-900 tracking-tight truncate">
          {highestDay ? formatDate(highestDay, true) : "N/A"}
        </div>
        <div className="mt-2 text-xs text-slate-500">
          {highestDayAmount > 0 ? (
            <span>
              <strong className="font-semibold text-slate-800">{formatCurrency(highestDayAmount)}</strong> spent
            </span>
          ) : (
            <span className="text-slate-400">No transactions recorded</span>
          )}
        </div>
      </div>

      {/* Card 4: Total Transactions */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Total Transactions</span>
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base">
            <HiOutlineDocumentText />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {expenseCount}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          In selected reporting period
        </div>
      </div>
    </div>
  )
}
