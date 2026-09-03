import React from "react"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineCalendar, HiOutlineClock, HiOutlineRefresh } from "react-icons/hi"
import { RiPlayCircleLine } from "react-icons/ri"

export function RecurringExpensesSummaryCards({ recurringExpenses = [], upcomingRecurring = [] }) {
  // Normalize monthly commitments
  let monthlyTotal = 0
  let annualTotal = 0
  let activeCount = 0

  recurringExpenses.forEach((item) => {
    if (!item.is_active) return
    activeCount += 1
    const amount = Number(item.amount || 0)
    const freq = (item.frequency || "monthly").toLowerCase()

    if (freq === "monthly") {
      monthlyTotal += amount
      annualTotal += amount * 12
    } else if (freq === "yearly") {
      monthlyTotal += amount / 12
      annualTotal += amount
    } else if (freq === "weekly") {
      monthlyTotal += amount * 4.33
      annualTotal += amount * 52
    } else if (freq === "daily") {
      monthlyTotal += amount * 30
      annualTotal += amount * 365
    }
  })

  // Due this month from upcomingRecurring or active recurring items
  let dueThisMonthAmount = 0
  let dueThisMonthCount = 0

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  recurringExpenses.forEach((item) => {
    if (!item.is_active || !item.next_due_date) return
    const dueDate = new Date(item.next_due_date)
    if (dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear) {
      dueThisMonthAmount += Number(item.amount || 0)
      dueThisMonthCount += 1
    }
  })

  // Fallback to upcomingRecurring if no due date matches current month
  if (dueThisMonthCount === 0 && upcomingRecurring.length > 0) {
    dueThisMonthCount = upcomingRecurring.length
    dueThisMonthAmount = upcomingRecurring.reduce((sum, item) => sum + Number(item.amount || 0), 0)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Monthly Commitments */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Total Monthly Commitments</span>
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00b87c] flex items-center justify-center text-base">
            <HiOutlineRefresh />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(monthlyTotal)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Across {activeCount} {activeCount === 1 ? "active subscription" : "active subscriptions"}
        </div>
      </div>

      {/* Card 2: Active Subscriptions */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Active Subscriptions</span>
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
            <RiPlayCircleLine />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {activeCount}
        </div>
        <div className="mt-2 text-xs font-semibold text-[#008f5f]">
          All running smoothly
        </div>
      </div>

      {/* Card 3: Due This Month */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Due This Month</span>
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base">
            <HiOutlineClock />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(dueThisMonthAmount || monthlyTotal)}
        </div>
        <div className="mt-2 text-xs text-amber-600 font-semibold">
          {dueThisMonthCount || activeCount} payments due
        </div>
      </div>

      {/* Card 4: Annual Commitment */}
      <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500">Annual Commitment</span>
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-base">
            <HiOutlineCalendar />
          </div>
        </div>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {formatCurrency(annualTotal)}
        </div>
        <div className="mt-2 text-xs text-slate-400">
          Total yearly recurring amount
        </div>
      </div>
    </div>
  )
}
