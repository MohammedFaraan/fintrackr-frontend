import React from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { HiOutlineCalendar, HiPlus, HiChevronDown } from "react-icons/hi"

export function RecurringExpensesHeader({
  dateRangeLabel = "May 1 - May 31, 2025",
  onOpenAddRecurring,
}) {
  const { user } = useAuth()
  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email
    ? user.email.charAt(0).toUpperCase()
    : "A"

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Recurring Expenses
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Track and manage all your recurring payments in one place.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 self-start sm:self-auto">
        {/* Date / Period Selector Display */}
        <div className="relative inline-block">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-xs cursor-pointer">
            <HiOutlineCalendar className="w-4 h-4 text-slate-500" />
            <span>{dateRangeLabel}</span>
            <HiChevronDown className="w-3.5 h-3.5 text-slate-400 -ml-0.5 pointer-events-none" />
          </div>
        </div>

        {/* + Add Recurring Expense Button */}
        <Button
          onClick={onOpenAddRecurring}
          className="rounded-xl px-4 py-2 text-xs font-bold shadow-sm shadow-[#00b87c]/30 hover:shadow-md"
        >
          <HiPlus className="w-4 h-4" />
          <span>Add Recurring Expense</span>
        </Button>

        {/* User Initial Circle */}
        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
          {userInitial}
        </div>
      </div>
    </div>
  )
}
