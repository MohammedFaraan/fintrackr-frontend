import React from "react"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineExclamation, HiOutlineCheckCircle, HiOutlineArrowNarrowRight, HiOutlineLightBulb } from "react-icons/hi"

export function BudgetInsights({ activeBudgets = [], onSelectCategory }) {
  // Analyze active budgets
  const overBudgets = []
  const almostFullBudgets = []
  const onTrackBudgets = []

  activeBudgets.forEach((b) => {
    const budgetAmount = Number(b.budget_amount || b.amount || 0)
    const spentAmount = Number(b.spent || 0)
    const percent = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0
    const overAmount = spentAmount - budgetAmount
    const catName = b.category || b.name || "Budget"

    if (b.is_exceeded || percent >= 100) {
      overBudgets.push({ name: catName, overAmount, percent })
    } else if (percent >= 80) {
      almostFullBudgets.push({ name: catName, percent: Math.round(percent) })
    } else {
      onTrackBudgets.push({ name: catName, percent: Math.round(percent) })
    }
  })

  const totalCount = activeBudgets.length
  if (totalCount === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <HiOutlineLightBulb className="w-5 h-5 text-amber-500" />
        <span>Budget Insights</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight 1: Over Budget */}
        {overBudgets.length > 0 ? (
          <div className="rounded-2xl bg-rose-50/60 border border-rose-200/80 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-base shrink-0 mt-0.5">
              <HiOutlineExclamation />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-rose-700">
                {overBudgets.length} {overBudgets.length === 1 ? "Category" : "Categories"} Over Budget
              </h4>
              <p className="text-xs text-rose-600/90 mt-0.5">
                Your <strong className="font-semibold">{overBudgets[0].name}</strong> budget is over by{" "}
                {formatCurrency(overBudgets[0].overAmount)}.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#008f5f] flex items-center justify-center text-base shrink-0 mt-0.5">
              <HiOutlineCheckCircle />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-emerald-800">Zero Overspends</h4>
              <p className="text-xs text-emerald-700/90 mt-0.5">
                None of your category budgets have exceeded their allocated limits.
              </p>
            </div>
          </div>
        )}

        {/* Insight 2: Almost Full */}
        {almostFullBudgets.length > 0 ? (
          <div className="rounded-2xl bg-amber-50/60 border border-amber-200/80 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-base shrink-0 mt-0.5">
              <HiOutlineExclamation />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-amber-800">
                {almostFullBudgets.length} {almostFullBudgets.length === 1 ? "Category" : "Categories"} Almost Full
              </h4>
              <p className="text-xs text-amber-700/90 mt-0.5">
                Your <strong className="font-semibold">{almostFullBudgets[0].name}</strong> budget is at{" "}
                {almostFullBudgets[0].percent}%.
              </p>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-blue-50/60 border border-blue-200/80 p-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-base shrink-0 mt-0.5">
              <HiOutlineCheckCircle />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-blue-800">Healthy Buffer</h4>
              <p className="text-xs text-blue-700/90 mt-0.5">
                All categories are well below the 80% warning threshold.
              </p>
            </div>
          </div>
        )}

        {/* Insight 3: Great Job / Progress */}
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-200/80 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#008f5f] flex items-center justify-center text-base shrink-0 mt-0.5">
            <HiOutlineCheckCircle />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-emerald-800">Great Job!</h4>
            <p className="text-xs text-emerald-700/90 mt-0.5">
              You're on track with <strong className="font-semibold">{onTrackBudgets.length}</strong> out of{" "}
              <strong className="font-semibold">{totalCount}</strong> budgets. Keep it up! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
