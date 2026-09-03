import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { HiOutlineX, HiOutlineTag, HiOutlineDocumentText, HiOutlineCalendar, HiOutlineCurrencyRupee, HiOutlineRefresh } from "react-icons/hi"

const recurringSchema = z.object({
  description: z.string().trim().min(1, "Name is required").max(100),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Amount must be a positive number",
    }),
  category: z.string().trim().min(1, "Category is required"),
  frequency: z.string().min(1, "Frequency is required"),
  start_date: z.string().min(1, "Start date is required"),
})

const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"]

const RECURRING_CATEGORIES = [
  "Entertainment",
  "Housing",
  "Health & Fitness",
  "Shopping",
  "Bills & Utilities",
  "Insurance",
  "Food & Dining",
  "Transport",
  "Other",
]

export function RecurringExpenseFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isSubmitting = false,
}) {
  const today = new Date().toISOString().split("T")[0]
  const isEditing = !!initialData?.id

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recurringSchema),
    defaultValues: {
      amount: "",
      category: "Entertainment",
      frequency: "monthly",
      start_date: today,
      description: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      setValue("description", initialData.description || "")
      setValue("amount", String(initialData.amount || ""))
      setValue("category", initialData.category || "Entertainment")
      setValue("frequency", initialData.frequency || "monthly")
      setValue("start_date", initialData.start_date || today)
    } else {
      reset({
        amount: "",
        category: "Entertainment",
        frequency: "monthly",
        start_date: today,
        description: "",
      })
    }
  }, [initialData, isOpen, setValue, reset, today])

  if (!isOpen) return null

  const onFormSubmit = async (data) => {
    try {
      const payload = {
        description: data.description,
        amount: Number(data.amount).toFixed(2),
        category: data.category,
        frequency: data.frequency,
        start_date: data.start_date,
      }
      await onSubmit(payload)
      toast.success(isEditing ? "Recurring expense updated!" : "Recurring expense added!")
      reset()
      onClose()
    } catch (err) {
      const detail = err.response?.data?.detail || "Failed to process recurring expense."
      toast.error(isEditing ? "Error updating" : "Error adding", {
        description: typeof detail === "string" ? detail : "Please check your inputs.",
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isEditing ? "Edit Recurring Expense" : "Add Recurring Expense"}
            </h3>
            <p className="text-xs text-slate-400">
              {isEditing ? "Update your recurring payment" : "Set up a new recurring payment"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 pt-5" noValidate>
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineDocumentText className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="e.g. Netflix, Rent, Gym Membership"
                {...register("description")}
                className={`w-full h-11 pl-11 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.description
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                }`}
              />
            </div>
            {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Amount (₹)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 font-bold text-sm pointer-events-none">₹</span>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("amount")}
                className={`w-full h-11 pl-9 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.amount
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                }`}
              />
            </div>
            {errors.amount && <p className="text-xs text-rose-500 mt-1">{errors.amount.message}</p>}
          </div>

          {/* Category & Frequency Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none">
                  <HiOutlineTag className="w-4 h-4" />
                </span>
                <select
                  {...register("category")}
                  className="w-full h-11 pl-9 pr-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 cursor-pointer"
                >
                  {RECURRING_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Frequency
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none">
                  <HiOutlineRefresh className="w-4 h-4" />
                </span>
                <select
                  {...register("frequency")}
                  className="w-full h-11 pl-9 pr-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20 cursor-pointer capitalize"
                >
                  {FREQUENCIES.map((f) => (
                    <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Start Date
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineCalendar className="w-5 h-5" />
              </span>
              <input
                type="date"
                {...register("start_date")}
                className="w-full h-11 pl-11 pr-4 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20"
              />
            </div>
            {errors.start_date && <p className="text-xs text-rose-500 mt-1">{errors.start_date.message}</p>}
          </div>

          {/* Buttons */}
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
              {isSubmitting
                ? isEditing ? "Updating..." : "Saving..."
                : isEditing ? "Update" : "Add Recurring Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
