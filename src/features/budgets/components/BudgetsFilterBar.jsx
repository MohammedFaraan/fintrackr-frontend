import React from "react"
import { HiOutlineSearch, HiOutlineFilter, HiChevronDown, HiOutlineX } from "react-icons/hi"

export const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "on_track", label: "On Track (< 80%)" },
  { value: "almost_over", label: "Almost Over (80% - 99%)" },
  { value: "over_budget", label: "Over Budget (≥ 100%)" },
]

export const PERIOD_OPTIONS = [
  { value: "all", label: "All Periods" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "this_year", label: "This Year" },
]

export function BudgetsFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  periodFilter,
  onPeriodFilterChange,
  onResetFilters,
}) {
  const hasActiveFilters =
    searchQuery || statusFilter !== "all" || periodFilter !== "all"

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search budgets by category..."
          className="w-full h-11 pl-10 pr-4 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 shadow-xs"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
          >
            <HiOutlineX className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative min-w-[170px]">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="w-full h-11 pl-3.5 pr-8 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 shadow-xs cursor-pointer appearance-none"
          aria-label="Filter by status"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Period Filter Dropdown */}
      <div className="relative min-w-[150px]">
        <select
          value={periodFilter}
          onChange={(e) => onPeriodFilterChange(e.target.value)}
          className="w-full h-11 pl-3.5 pr-8 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 shadow-xs cursor-pointer appearance-none"
          aria-label="Filter by period"
        >
          {PERIOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* Reset Filters */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={onResetFilters}
          className="h-11 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-colors flex items-center justify-center gap-1.5 shrink-0"
        >
          <HiOutlineFilter className="w-4 h-4 text-slate-400" />
          <span>Reset</span>
        </button>
      )}
    </div>
  )
}
