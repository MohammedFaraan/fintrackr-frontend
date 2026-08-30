import React from "react"
import { Link } from "react-router"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

export function BudgetVsSpendingCard({ totalBudget = 0, totalSpent = 0 }) {
  const remaining = Math.max(0, totalBudget - totalSpent)
  const spentPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0
  const remainingPercent = totalBudget > 0 ? (remaining / totalBudget) * 100 : 0

  // Donut chart calculations
  const radius = 65
  const circumference = 2 * Math.PI * radius
  const spentDash = (Math.min(100, spentPercent) / 100) * circumference
  const remainingDash = circumference - spentDash

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-slate-900">Budget vs Spending</h3>
        <p className="text-xs text-slate-400">Overall budget utilization</p>
      </div>

      {/* Donut Chart & Center Text */}
      <div className="flex flex-col items-center">
        <div className="w-36 h-36 relative mb-4">
          <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="20"
            />
            {/* Spent slice (Rose / Red) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="20"
              strokeDasharray={`${spentDash} ${circumference}`}
              strokeDashoffset="0"
              className="transition-all duration-500"
            />
            {/* Remaining slice (Emerald / Green) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#00b87c"
              strokeWidth="20"
              strokeDasharray={`${remainingDash} ${circumference}`}
              strokeDashoffset={`-${spentDash}`}
              className="transition-all duration-500"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <div className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              {spentPercent.toFixed(1)}%
            </div>
            <div className="text-[10px] text-slate-400 font-medium">Used</div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="text-slate-600 font-medium">Spent</span>
            </div>
            <span className="font-bold text-slate-900">
              {formatCurrency(totalSpent)} ({spentPercent.toFixed(1)}%)
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00b87c] shrink-0" />
              <span className="text-slate-600 font-medium">Remaining</span>
            </div>
            <span className="font-bold text-slate-900">
              {formatCurrency(remaining)} ({remainingPercent.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* View detailed report link */}
      <div className="pt-4 mt-4 border-t border-slate-100 text-center">
        <Link
          to="/reports"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b87c] hover:underline"
        >
          View detailed report <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
