import React from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { HiOutlineCalendar, HiPlus, HiChevronDown } from "react-icons/hi"

export const BUDGET_PERIOD_PRESETS = [
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
  { value: "all_time", label: "All Time" },
]

export function BudgetsHeader({
  selectedPeriod,
  onPeriodChange,
  onOpenCreateBudget,
  dateRangeLabel,
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
          Budgets
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Plan your spending and track your budget progress.
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 self-start sm:self-auto">
        {/* Date / Period Selector */}
        <div className="relative inline-block">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-xs cursor-pointer">
            <HiOutlineCalendar className="w-4 h-4 text-slate-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-2"
              aria-label="Select budget period"
            >
              {BUDGET_PERIOD_PRESETS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {dateRangeLabel && opt.value === selectedPeriod ? dateRangeLabel : opt.label}
                </option>
              ))}
            </select>
            <HiChevronDown className="w-3.5 h-3.5 text-slate-400 -ml-1 pointer-events-none" />
          </div>
        </div>

        {/* + Create Budget Button */}
        <Button
          onClick={onOpenCreateBudget}
          className="rounded-xl px-4 py-2 text-xs font-bold shadow-sm shadow-[#00b87c]/30 hover:shadow-md"
        >
          <HiPlus className="w-4 h-4" />
          <span>Create Budget</span>
        </Button>

        {/* User Initial Circle */}
        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
          {userInitial}
        </div>
      </div>
    </div>
  )
}
