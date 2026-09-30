import React from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight, HiOutlineClock, HiOutlineExclamation } from "react-icons/hi"

function getDaysUntil(dateStr) {
  if (!dateStr) return null
  const due = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24))
}

function getDueBadgeStyle(days) {
  if (days === null) return "text-slate-400"
  if (days < 0) return "text-rose-600 font-bold"
  if (days === 0) return "text-rose-500 font-bold"
  if (days <= 3) return "text-rose-500"
  if (days <= 7) return "text-amber-500"
  return "text-slate-500"
}

function getDueLabel(days) {
  if (days === null) return "-"
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return "Due today"
  if (days === 1) return "Tomorrow"
  return `In ${days} days`
}

export function UpcomingPaymentsCard({ recurringExpenses = [] }) {
  const todayStr = new Date().toISOString().split("T")[0]

  // Include both overdue and upcoming active items (sorted by next_occurrence ascending)
  // Exclude items where end_date has already passed
  const items = [...recurringExpenses]
    .filter((r) => {
      if (r.is_active === false) return false
      if (!r.next_occurrence) return false
      if (r.end_date && r.end_date < todayStr) return false
      return true
    })
    .sort((a, b) => new Date(a.next_occurrence) - new Date(b.next_occurrence))
    .slice(0, 5)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Upcoming Payments</h3>
        <span className="text-xs font-semibold text-[#00b87c] flex items-center gap-1">
          Next Due <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          <HiOutlineClock className="w-8 h-8 mx-auto mb-2 text-slate-200" />
          No upcoming payments
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const days = getDaysUntil(item.next_occurrence)
            const dueStyle = getDueBadgeStyle(days)
            const isOverdue = days !== null && days < 0

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-xl transition-colors ${
                  isOverdue ? "bg-rose-50/60" : "hover:bg-slate-50/60"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate flex items-center gap-1">
                    {isOverdue && <HiOutlineExclamation className="w-3.5 h-3.5 text-rose-500 shrink-0" />}
                    {item.description || "-"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.next_occurrence ? formatDate(item.next_occurrence, true) : "N/A"}
                    {" • "}
                    <span className="capitalize">{item.frequency}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-slate-900">
                    {formatCurrency(item.amount, true)}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${dueStyle}`}>
                    {getDueLabel(days)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
