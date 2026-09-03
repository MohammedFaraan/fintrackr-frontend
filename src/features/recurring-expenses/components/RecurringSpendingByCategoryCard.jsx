import React from "react"
import { formatCurrency } from "@/lib/formatters"

const PALETTE = ["#00b87c", "#f43f5e", "#3b82f6", "#f59e0b", "#8b5cf6", "#06b6d4", "#64748b"]

export function RecurringSpendingByCategoryCard({ recurringExpenses = [] }) {
  // Aggregate by category, normalizing to monthly equivalent
  const catMap = {}
  recurringExpenses.forEach((item) => {
    if (!item.is_active) return
    const cat = item.category || "Other"
    const amount = Number(item.amount || 0)
    const freq = (item.frequency || "monthly").toLowerCase()

    let monthly = amount
    if (freq === "yearly") monthly = amount / 12
    else if (freq === "weekly") monthly = amount * 4.33
    else if (freq === "daily") monthly = amount * 30

    catMap[cat] = (catMap[cat] || 0) + monthly
  })

  const entries = Object.entries(catMap)
    .map(([cat, amount]) => ({ cat, amount }))
    .sort((a, b) => b.amount - a.amount)

  const total = entries.reduce((sum, e) => sum + e.amount, 0)

  // Donut chart
  let cumulative = 0
  const slices = entries.map((e, idx) => {
    const percent = total > 0 ? (e.amount / total) * 100 : 0
    const startAngle = (cumulative / 100) * 360
    cumulative += percent
    const endAngle = (cumulative / 100) * 360
    return { ...e, percent, startAngle, endAngle, color: PALETTE[idx % PALETTE.length] }
  })

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Spending by Category</h3>
        <span className="text-[11px] text-slate-400 font-medium">This Month</span>
      </div>

      {slices.length === 0 ? (
        <p className="text-xs text-slate-400 text-center py-6">No active recurring expenses</p>
      ) : (
        <>
          {/* Donut Chart */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {slices.map((slice, idx) => (
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
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <div className="text-xs font-extrabold text-slate-900 tracking-tight">{formatCurrency(total)}</div>
                <div className="text-[9px] text-slate-400 font-medium">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {slices.map((slice, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                  <span className="text-slate-700 truncate">{slice.cat}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-semibold text-slate-800">{formatCurrency(slice.amount)}</span>
                  <span className="text-slate-400 text-[11px] w-6 text-right">{Math.round(slice.percent)}%</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
