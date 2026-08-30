import React, { useState } from "react"
import { HiOutlineCalendar, HiChevronDown } from "react-icons/hi"

export const REPORT_PERIODS = [
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "last_3_months", label: "Last 3 Months" },
  { id: "this_year", label: "This Year" },
  { id: "custom", label: "Custom Range" },
]

export function ReportsHeader({
  selectedPeriod,
  onPeriodChange,
  dateRangeLabel,
  customStartDate,
  customEndDate,
  onCustomStartChange,
  onCustomEndChange,
}) {
  const [showCustomPicker, setShowCustomPicker] = useState(false)

  return (
    <div className="space-y-4">
      {/* Title & Top Right Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Analyze your spending and get insights into your financial habits.
          </p>
        </div>

        {/* Date Range Selector Display */}
        <div className="relative inline-block self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-xs cursor-pointer">
            <HiOutlineCalendar className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-semibold text-slate-700">{dateRangeLabel}</span>
            <HiChevronDown className="w-3.5 h-3.5 text-slate-400 -ml-0.5" />
          </div>
        </div>
      </div>

      {/* Quick Period Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {REPORT_PERIODS.map((period) => {
          const isActive = selectedPeriod === period.id
          return (
            <button
              key={period.id}
              type="button"
              onClick={() => {
                onPeriodChange(period.id)
                if (period.id === "custom") {
                  setShowCustomPicker(true)
                } else {
                  setShowCustomPicker(false)
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                isActive
                  ? "bg-[#00b87c] text-white shadow-sm shadow-[#00b87c]/30"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {period.label}
            </button>
          )
        })}
      </div>

      {/* Collapsible Custom Date Pickers */}
      {(selectedPeriod === "custom" || showCustomPicker) && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3 animate-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Start Date:</span>
            <input
              type="date"
              value={customStartDate}
              onChange={(e) => onCustomStartChange(e.target.value)}
              className="h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#00b87c]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">End Date:</span>
            <input
              type="date"
              value={customEndDate}
              onChange={(e) => onCustomEndChange(e.target.value)}
              className="h-9 px-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#00b87c]"
            />
          </div>
        </div>
      )}
    </div>
  )
}
