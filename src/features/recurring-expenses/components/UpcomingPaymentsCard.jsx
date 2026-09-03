import React from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight, HiOutlineClock } from "react-icons/hi"

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
  if (days <= 0) return "text-rose-500 font-bold"
  if (days <= 3) return "text-rose-500"
  if (days <= 7) return "text-amber-500"
  return "text-slate-500"
}

export function UpcomingPaymentsCard({ recurringExpenses = [] }) {
  // Sort by next_due_date ascending, take first 5 active
  const upcoming = [...recurringExpenses]
    .filter((r) => r.is_active !== false && r.next_due_date)
    .sort((a, b) => new Date(a.next_due_date) - new Date(b.next_due_date))
    .slice(0, 5)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Upcoming Payments</h3>
        <span className="text-xs font-semibold text-[#00b87c] cursor-pointer hover:underline flex items-center gap-1">
          View all <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {upcoming.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-400">
          <HiOutlineClock className="w-8 h-8 mx-auto mb-2 text-slate-200" />
          No upcoming payments
        </div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((item) => {
            const days = getDaysUntil(item.next_due_date)
            const dueStyle = getDueBadgeStyle(days)

            return (
              <div key={item.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-800 truncate">{item.name}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.next_due_date ? formatDate(item.next_due_date, true) : "N/A"}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-extrabold text-slate-900">{formatCurrency(item.amount, true)}</div>
                  <div className={`text-[11px] mt-0.5 ${dueStyle}`}>
                    {days === null ? "" : days <= 0 ? "Overdue" : days === 0 ? "Today" : `In ${days} days`}
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
