import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { HiOutlineX, HiOutlineCurrencyRupee, HiOutlineCalendar, HiOutlineTag, HiOutlineDocumentText } from "react-icons/hi"

const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  description: z.string().trim().min(1, "Description is required"),
  category: z.string().trim().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
})

const DEFAULT_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Healthcare",
  "Housing",
  "Other",
]

export function AddExpenseModal({ isOpen, onClose, onAddExpense, isSubmitting }) {
  const today = new Date().toISOString().split("T")[0]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      description: "",
      category: "Food & Dining",
      date: today,
    },
  })

  if (!isOpen) return null

  const onSubmit = async (data) => {
    try {
      await onAddExpense({
        amount: Number(data.amount).toFixed(2),
        description: data.description,
        category: data.category,
        date: data.date,
      })
      toast.success("Expense added successfully!", {
        description: `${data.description} (₹${data.amount}) recorded.`,
      })
      reset()
      onClose()
    } catch (err) {
      const detail = err.response?.data?.detail || "Failed to record expense."
      toast.error("Error adding expense", {
        description: typeof detail === "string" ? detail : "Validation error.",
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Add Expense</h3>
            <p className="text-xs text-slate-400">Record a new transaction</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-5" noValidate>
          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Amount (₹)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-sm pointer-events-none">
                ₹
              </span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
                className={`w-full h-11 pl-9 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.amount
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                }`}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-rose-500 mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineDocumentText className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="e.g. Groceries, Uber, Coffee"
                {...register("description")}
                className={`w-full h-11 pl-11 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                }`}
              />
            </div>
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Category
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineTag className="w-5 h-5" />
              </span>
              <select
                {...register("category")}
                className="w-full h-11 pl-11 pr-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 cursor-pointer"
              >
                {DEFAULT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Date
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineCalendar className="w-5 h-5" />
              </span>
              <input
                type="date"
                {...register("date")}
                className="w-full h-11 pl-11 pr-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20"
              />
            </div>
            {errors.date && (
              <p className="text-xs text-rose-500 mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 py-2.5 rounded-xl bg-[#00b87c] hover:bg-[#00a36d] text-white text-xs font-bold shadow-md shadow-[#00b87c]/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Recording..." : "Save Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
