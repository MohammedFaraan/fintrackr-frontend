import React, { useState } from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { 
  HiOutlineDotsHorizontal, 
  HiOutlinePencil, 
  HiOutlineTrash, 
  HiOutlineTag,
  HiOutlineLightningBolt,
  HiOutlinePlay
} from "react-icons/hi"
import { 
  RiRestaurantLine, 
  RiCarLine, 
  RiShoppingBag3Line, 
  RiHeartPulseLine,
  RiHome4Line
} from "react-icons/ri"

function getCategoryIcon(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining")) return { icon: RiRestaurantLine, bg: "bg-emerald-50 text-[#00b87c]" }
  if (cat.includes("transport") || cat.includes("car") || cat.includes("uber")) return { icon: RiCarLine, bg: "bg-amber-50 text-amber-500" }
  if (cat.includes("shop") || cat.includes("cloth")) return { icon: RiShoppingBag3Line, bg: "bg-rose-50 text-rose-500" }
  if (cat.includes("bill") || cat.includes("util") || cat.includes("house") || cat.includes("rent")) return { icon: RiHome4Line, bg: "bg-blue-50 text-blue-600" }
  if (cat.includes("entertain") || cat.includes("movie") || cat.includes("stream")) return { icon: HiOutlinePlay, bg: "bg-purple-50 text-purple-600" }
  if (cat.includes("health") || cat.includes("gym") || cat.includes("fit")) return { icon: RiHeartPulseLine, bg: "bg-rose-50 text-rose-600" }
  return { icon: HiOutlineTag, bg: "bg-slate-50 text-slate-600" }
}

export function BudgetsTable({
  budgets = [],
  onEditBudget,
  onDeleteBudget,
}) {
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">Category</th>
              <th className="py-3.5 px-5">Budget</th>
              <th className="py-3.5 px-5">Spent</th>
              <th className="py-3.5 px-5">Remaining</th>
              <th className="py-3.5 px-5 min-w-[140px]">Progress</th>
              <th className="py-3.5 px-5 text-center">Status</th>
              <th className="py-3.5 px-5 text-center w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {budgets.map((item) => {
              const budgetAmount = Number(item.budget_amount || item.amount || 0)
              const spentAmount = Number(item.spent || 0)
              const remainingAmount = Math.max(0, budgetAmount - spentAmount)
              const usagePercent = budgetAmount > 0 ? Math.round((spentAmount / budgetAmount) * 100) : 0
              
              const isOver = item.is_exceeded || usagePercent >= 100
              const isAlmostOver = usagePercent >= 80 && !isOver

              const categoryName = item.category || item.name || "Overall Budget"
              const { icon: Icon, bg } = getCategoryIcon(categoryName)
              const isMenuOpen = openMenuId === (item.budget_id || item.id)

              return (
                <tr
                  key={item.budget_id || item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* 1. Category */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-105`}>
                        <Icon />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">
                          {categoryName}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {item.start_date && item.end_date
                            ? `${formatDate(item.start_date)} - ${formatDate(item.end_date)}`
                            : "Monthly"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 2. Budget */}
                  <td className="py-4 px-5 align-middle font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(budgetAmount)}
                  </td>

                  {/* 3. Spent */}
                  <td className="py-4 px-5 align-middle font-semibold text-slate-700 whitespace-nowrap">
                    {formatCurrency(spentAmount)}
                  </td>

                  {/* 4. Remaining */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        isOver
                          ? "text-rose-500"
                          : isAlmostOver
                          ? "text-amber-500"
                          : "text-[#008f5f]"
                      }`}
                    >
                      {formatCurrency(remainingAmount)}
                    </span>
                  </td>

                  {/* 5. Progress */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-700 w-8 text-right shrink-0">
                        {usagePercent}%
                      </span>
                      <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isOver
                              ? "bg-rose-500"
                              : isAlmostOver
                              ? "bg-amber-500"
                              : "bg-[#00b87c]"
                          }`}
                          style={{ width: `${Math.min(100, usagePercent)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* 6. Status Badge */}
                  <td className="py-4 px-5 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        isOver
                          ? "bg-rose-50 text-rose-600 border-rose-200/60"
                          : isAlmostOver
                          ? "bg-amber-50 text-amber-600 border-amber-200/60"
                          : "bg-emerald-50 text-[#008f5f] border-emerald-200/60"
                      }`}
                    >
                      {isOver ? "Over Budget" : isAlmostOver ? "Almost Over" : "On Track"}
                    </span>
                  </td>

                  {/* 7. Actions */}
                  <td className="py-2 px-5 align-middle text-center relative whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(isMenuOpen ? null : (item.budget_id || item.id))}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      aria-label="Actions"
                    >
                      <HiOutlineDotsHorizontal className="w-5 h-5" />
                    </button>

                    {/* Popover Actions Menu */}
                    {isMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-3 top-6 z-30 w-36 rounded-xl bg-white border border-slate-200 shadow-xl py-1 text-left animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null)
                              onEditBudget(item)
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#00b87c] transition-colors"
                          >
                            <HiOutlinePencil className="w-4 h-4 text-slate-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null)
                              onDeleteBudget(item)
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <HiOutlineTrash className="w-4 h-4 text-rose-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
