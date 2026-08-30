import React from "react"
import { Link } from "react-router"
import { formatCurrency } from "@/lib/formatters"
import { 
  HiOutlineArrowNarrowRight, 
  HiOutlineArrowSmDown, 
  HiOutlineArrowSmUp,
  HiOutlineExclamation, 
  HiOutlineInformationCircle 
} from "react-icons/hi"

export function SpendingInsightsCard({ comparison, categoriesData, summary }) {
  const percentChange = comparison?.percentage_change
  const isDecrease = percentChange !== null && percentChange !== undefined && Number(percentChange) < 0
  const isIncrease = percentChange !== null && percentChange !== undefined && Number(percentChange) > 0

  const topCategory = categoriesData?.categories?.[0]
  const secondCategory = categoriesData?.categories?.[1]

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">Spending Insights</h3>
          <p className="text-xs text-slate-400">Financial insights for you</p>
        </div>

        <div className="space-y-3">
          {/* Insight 1: Period Trend */}
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-[#00b87c] flex items-center justify-center text-sm shrink-0 mt-0.5 font-bold">
              {isDecrease ? <HiOutlineArrowSmDown /> : isIncrease ? <HiOutlineArrowSmUp /> : "✦"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-emerald-900">
                {isDecrease ? "Great job! 🎉" : "Spending Update"}
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                {percentChange !== null && percentChange !== undefined
                  ? isDecrease
                    ? `Your spending is ${Math.abs(Number(percentChange))}% lower than the previous period.`
                    : `Your spending increased by ${Math.abs(Number(percentChange))}% compared to previous period.`
                  : "Track daily expenses to generate trend insights."}
              </div>
            </div>
          </div>

          {/* Insight 2: Top Category Alert */}
          {topCategory && (
            <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm shrink-0 mt-0.5">
                <HiOutlineExclamation />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-amber-900">High Spending Area</div>
                <div className="text-[11px] text-amber-700 mt-0.5 leading-snug">
                  <strong className="font-semibold">{topCategory.category}</strong> accounts for{" "}
                  {Math.round(Number(topCategory.percentage))}% of your total outlays ({formatCurrency(topCategory.total_amount)}).
                </div>
              </div>
            </div>
          )}

          {/* Insight 3: Optimization Opportunity */}
          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-sm shrink-0 mt-0.5">
              <HiOutlineInformationCircle />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-blue-900">Budget Optimization</div>
              <div className="text-[11px] text-blue-700 mt-0.5 leading-snug">
                Setting a spending limit for {secondCategory?.category || topCategory?.category || "dining"} can help preserve monthly savings.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 text-center">
        <Link
          to="/budgets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b87c] hover:underline"
        >
          View all budgets <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
