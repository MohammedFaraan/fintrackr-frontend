import React, { useState } from "react"
import { HiOutlineSearch, HiOutlineFilter, HiChevronDown, HiOutlineX } from "react-icons/hi"

export const CATEGORY_OPTIONS = [
  "All Categories",
  "Food & Dining",
  "Transport",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Healthcare",
  "Housing",
  "Other",
]

export const SORT_OPTIONS = [
  { label: "Date (Newest first)", sortBy: "date", sortOrder: "desc" },
  { label: "Date (Oldest first)", sortBy: "date", sortOrder: "asc" },
  { label: "Amount (High to Low)", sortBy: "amount", sortOrder: "desc" },
  { label: "Amount (Low to High)", sortBy: "amount", sortOrder: "asc" },
  { label: "Category (A-Z)", sortBy: "category", sortOrder: "asc" },
]

export function ExpensesFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortBy,
  sortOrder,
  onSortChange,
  minAmount,
  maxAmount,
  onMinAmountChange,
  onMaxAmountChange,
  onResetFilters,
}) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const currentSortKey = `${sortBy}-${sortOrder}`
  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== "All Categories" ||
    minAmount ||
    maxAmount

  return (
    <div className="space-y-3">
      {/* Main Search & Dropdown Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <HiOutlineSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search expenses by description, category..."
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

        {/* Category Dropdown */}
        <div className="relative min-w-[170px]">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full h-11 pl-3.5 pr-8 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 shadow-xs cursor-pointer appearance-none"
            aria-label="Filter by category"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Sort By Dropdown */}
        <div className="relative min-w-[190px]">
          <select
            value={currentSortKey}
            onChange={(e) => {
              const selected = SORT_OPTIONS.find((s) => `${s.sortBy}-${s.sortOrder}` === e.target.value)
              if (selected) {
                onSortChange(selected.sortBy, selected.sortOrder)
              }
            }}
            className="w-full h-11 pl-3.5 pr-8 text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 shadow-xs cursor-pointer appearance-none"
            aria-label="Sort expenses"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={`${opt.sortBy}-${opt.sortOrder}`} value={`${opt.sortBy}-${opt.sortOrder}`}>
                {opt.label}
              </option>
            ))}
          </select>
          <HiChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Filters Toggle Button */}
        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`h-11 px-4 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors ${
            showAdvancedFilters || minAmount || maxAmount
              ? "bg-[#e6f8f1] border-[#00b87c]/40 text-[#00b87c]"
              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
          }`}
        >
          <HiOutlineFilter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Collapsible Advanced Filters (Amount boundaries) */}
      {showAdvancedFilters && (
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-4 animate-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Min Amount:</span>
            <input
              type="number"
              placeholder="₹0"
              value={minAmount}
              onChange={(e) => onMinAmountChange(e.target.value)}
              className="w-28 h-9 px-3 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#00b87c]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Max Amount:</span>
            <input
              type="number"
              placeholder="₹10,000"
              value={maxAmount}
              onChange={(e) => onMaxAmountChange(e.target.value)}
              className="w-28 h-9 px-3 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#00b87c]"
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs font-semibold text-rose-500 hover:text-rose-700 hover:underline ml-auto"
            >
              Reset all filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
