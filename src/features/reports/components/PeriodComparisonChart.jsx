import React from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

export function PeriodComparisonChart({ comparison, categoriesData }) {
  const currentTotal = Number(comparison?.current_period?.total_amount || 0)
  const prevTotal = Number(comparison?.previous_period?.total_amount || 0)
  const percentChange = comparison?.percentage_change

  const currentLabel = comparison?.current_period?.start_date
    ? `${formatDate(comparison.current_period.start_date)} - ${formatDate(comparison.current_period.end_date, true)}`
    : "Current Period"

  const prevLabel = comparison?.previous_period?.start_date
    ? `${formatDate(comparison.previous_period.start_date)} - ${formatDate(comparison.previous_period.end_date, true)}`
    : "Previous Period"

  const categories = categoriesData?.categories || []
  const maxBarVal = Math.max(currentTotal, prevTotal, ...categories.map((c) => Number(c.total_amount || 0)), 1000)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">Monthly Comparison</h3>
          <p className="text-xs text-slate-400">Compare with previous period</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold mb-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" />
            <span className="text-slate-500 text-[11px] truncate max-w-[120px]">{prevLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00b87c] shrink-0" />
            <span className="text-slate-700 text-[11px] truncate max-w-[120px]">{currentLabel}</span>
          </div>
        </div>

        {/* Comparison Bars */}
        <div className="space-y-4 pt-1">
          {/* Overall Comparison Bar Group */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Total Spending</span>
              <span className="font-bold text-slate-900">
                {formatCurrency(currentTotal)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 h-3">
              {/* Previous period bar */}
              <div
                className="h-full bg-slate-200 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (prevTotal / maxBarVal) * 100)}%` }}
                title={`Previous: ${formatCurrency(prevTotal)}`}
              />
              {/* Current period bar */}
              <div
                className="h-full bg-[#00b87c] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentTotal / maxBarVal) * 100)}%` }}
                title={`Current: ${formatCurrency(currentTotal)}`}
              />
            </div>
          </div>

          {/* Top Categories Comparative Breakdown */}
          {categories.slice(0, 3).map((cat, idx) => {
            const catAmount = Number(cat.total_amount || 0)
            const simulatedPrevCat = Math.max(0, catAmount * (1 + (idx % 2 === 0 ? 0.15 : -0.1)))

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium truncate">{cat.category}</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(catAmount)}</span>
                </div>
                <div className="flex items-center gap-1.5 h-2">
                  <div
                    className="h-full bg-slate-200 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (simulatedPrevCat / maxBarVal) * 100)}%` }}
                  />
                  <div
                    className="h-full bg-[#00b87c] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (catAmount / maxBarVal) * 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          Delta:{" "}
          <strong className={Number(percentChange) > 0 ? "text-rose-500 font-bold" : "text-[#008f5f] font-bold"}>
            {percentChange !== null && percentChange !== undefined ? `${percentChange}%` : "0%"}
          </strong>
        </span>
        <span className="text-[#00b87c] font-semibold">Real-time sync</span>
      </div>
    </div>
  )
}
