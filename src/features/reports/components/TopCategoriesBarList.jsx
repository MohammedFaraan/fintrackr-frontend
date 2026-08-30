import React from "react"
import { Link } from "react-router"
import { formatCurrency } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight, HiOutlineTag } from "react-icons/hi"
import { RiRestaurantLine, RiCarLine, RiShoppingBag3Line, RiHome4Line, RiHeartPulseLine } from "react-icons/ri"

const BAR_COLORS = [
  "bg-[#00b87c]",
  "bg-amber-500",
  "bg-blue-600",
  "bg-purple-600",
  "bg-rose-500",
]

function getCategoryIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining")) return { icon: RiRestaurantLine, bg: "bg-emerald-50 text-[#00b87c]" }
  if (cat.includes("transport") || cat.includes("car")) return { icon: RiCarLine, bg: "bg-amber-50 text-amber-500" }
  if (cat.includes("shop")) return { icon: RiShoppingBag3Line, bg: "bg-blue-50 text-blue-600" }
  if (cat.includes("bill") || cat.includes("util") || cat.includes("house")) return { icon: RiHome4Line, bg: "bg-purple-50 text-purple-600" }
  if (cat.includes("health") || cat.includes("gym")) return { icon: RiHeartPulseLine, bg: "bg-rose-50 text-rose-500" }
  return { icon: HiOutlineTag, bg: "bg-slate-50 text-slate-600" }
}

export function TopCategoriesBarList({ categoriesData }) {
  const categories = categoriesData?.categories || []

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-900">Top Spending Categories</h3>
          <p className="text-xs text-slate-400">By amount spent</p>
        </div>

        {categories.length === 0 ? (
          <p className="text-xs text-slate-400 py-6 text-center">No category data recorded</p>
        ) : (
          <div className="space-y-4">
            {categories.slice(0, 5).map((cat, idx) => {
              const { icon: Icon, bg } = getCategoryIcon(cat.category)
              const percent = Math.round(Number(cat.percentage || 0))
              const barColor = BAR_COLORS[idx % BAR_COLORS.length]

              return (
                <div key={idx} className="flex items-center gap-3">
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center text-xs shrink-0`}>
                    <Icon />
                  </div>

                  {/* Name & Progress Bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-slate-800 truncate">{cat.category}</span>
                      <span className="font-bold text-slate-900 ml-2">
                        {formatCurrency(cat.total_amount)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Percentage */}
                  <span className="text-[11px] font-semibold text-slate-400 w-8 text-right shrink-0">
                    {percent}%
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 text-center">
        <Link
          to="/expenses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00b87c] hover:underline"
        >
          View all categories <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
