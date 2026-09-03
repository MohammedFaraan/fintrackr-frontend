import React from "react"
import { HiOutlineRefresh, HiPlus } from "react-icons/hi"
import { Button } from "@/components/ui/button"

export function RecurringExpensesEmptyState({ isFiltered = false, onOpenAdd, onResetFilters }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-12 text-center space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00b87c] flex items-center justify-center mx-auto text-2xl">
        <HiOutlineRefresh />
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900">
          {isFiltered ? "No matching recurring expenses" : "No recurring expenses yet"}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {isFiltered
            ? "Try clearing your search or status filter."
            : "Add your first recurring expense to track subscriptions and scheduled payments automatically."}
        </p>
      </div>
      <div className="pt-2 flex justify-center gap-3">
        {isFiltered ? (
          <Button variant="outline" onClick={onResetFilters} className="rounded-xl text-xs font-bold gap-1.5">
            Reset Filters
          </Button>
        ) : (
          <Button onClick={onOpenAdd} className="rounded-xl text-xs font-bold gap-1.5 shadow-sm shadow-[#00b87c]/30">
            <HiPlus className="w-4 h-4" />
            <span>Add First Recurring Expense</span>
          </Button>
        )}
      </div>
    </div>
  )
}
