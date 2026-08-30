import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { HiOutlineX, HiOutlineTag, HiOutlineDocumentText, HiOutlineCalendar } from "react-icons/hi"

const budgetSchema = z
  .object({
    name: z.string().trim().min(1, "Budget name is required").max(100),
    amount: z
      .string()
      .min(1, "Amount is required")
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a positive number",
      }),
    category: z.string().trim(),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
  })
  .refine((data) => new Date(data.start_date) <= new Date(data.end_date), {
    message: "Start date cannot be after end date",
    path: ["end_date"],
  })

const BUDGET_CATEGORIES = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Healthcare",
  "Housing",
  "Overall Budget",
  "Other",
]

export function BudgetFormModal({
  isOpen,
  onClose,
  onSubmitBudget,
  initialData = null,
  isSubmitting = false,
}) {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const firstDay = new Date(y, m, 1).toISOString().split("T")[0]
  const lastDay = new Date(y, m + 1, 0).toISOString().split("T")[0]

  const isEditing = !!initialData?.id || !!initialData?.budget_id

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "Food & Dining",
      start_date: firstDay,
      end_date: lastDay,
    },
  })

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name || "")
      setValue("amount", String(initialData.amount || initialData.budget_amount || ""))
      setValue("category", initialData.category || "Food & Dining")
      setValue("start_date", initialData.start_date || firstDay)
      setValue("end_date", initialData.end_date || lastDay)
    } else {
      reset({
        name: "",
        amount: "",
        category: "Food & Dining",
        start_date: firstDay,
        end_date: lastDay,
      })
    }
  }, [initialData, isOpen, setValue, reset, firstDay, lastDay])

  if (!isOpen) return null

  const onFormSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        amount: Number(data.amount).toFixed(2),
        category: data.category === "Overall Budget" ? null : data.category,
        start_date: data.start_date,
        end_date: data.end_date,
      }

      await onSubmitBudget(payload)
      toast.success(
        isEditing ? "Budget updated successfully!" : "Budget created successfully!"
      )
      reset()
      onClose()
    } catch (err) {
      const detail = err.response?.data?.detail || "Failed to process budget."
      toast.error(isEditing ? "Error updating budget" : "Error creating budget", {
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
              {isEditing ? "Edit Budget" : "Create Budget"}
            </h3>
            <p className="text-xs text-slate-400">
              {isEditing ? "Update your spending target" : "Set spending targets to control expenses"}
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
          {/* Budget Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Budget Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                <HiOutlineDocumentText className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="e.g. Monthly Dining Out"
                {...register("name")}
                className={`w-full h-11 pl-11 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-rose-400 focus:ring-rose-400/20"
                    : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Budget Amount (₹)
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
                className={`w-full h-11 pl-9 pr-4 text-sm rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
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
                {BUDGET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Date
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none">
                  <HiOutlineCalendar className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  {...register("start_date")}
                  className="w-full h-11 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-[#00b87c] focus:ring-2 focus:ring-[#00b87c]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                End Date
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-slate-400 pointer-events-none">
                  <HiOutlineCalendar className="w-4 h-4" />
                </span>
                <input
                  type="date"
                  {...register("end_date")}
                  className={`w-full h-11 pl-9 pr-3 text-xs rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.end_date
                      ? "border-rose-400 focus:ring-rose-400/20"
                      : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                  }`}
                />
              </div>
            </div>
          </div>
          {errors.end_date && (
            <p className="text-xs text-rose-500">{errors.end_date.message}</p>
          )}

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
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Budget"
                : "Create Budget"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
