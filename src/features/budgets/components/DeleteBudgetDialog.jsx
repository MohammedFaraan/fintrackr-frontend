import React from "react"
import { HiOutlineTrash } from "react-icons/hi"
import { formatCurrency } from "@/lib/formatters"

export function DeleteBudgetDialog({
  isOpen,
  onClose,
  onConfirm,
  budget,
  isDeleting = false,
}) {
  if (!isOpen || !budget) return null

  const name = budget.name || budget.category || "this budget"
  const amount = budget.budget_amount || budget.amount || 0

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 text-center animate-in zoom-in-95 duration-200 space-y-4">
        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
          <HiOutlineTrash />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">Delete Budget</h3>
          <p className="text-xs text-slate-500 mt-1">
            Are you sure you want to delete <strong className="text-slate-800 font-semibold">{name}</strong> (
            {formatCurrency(amount)})? This action cannot be undone.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="w-1/2 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/25 transition-all disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}
