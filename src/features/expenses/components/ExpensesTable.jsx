import React, { useState } from "react"
import { formatCurrency, formatDate, formatWeekday } from "@/lib/formatters"
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

function getCategoryMeta(category = "") {
  const cat = category.toLowerCase()
  if (cat.includes("food") || cat.includes("dining") || cat.includes("grocer")) {
    return {
      icon: RiRestaurantLine,
      iconBg: "bg-emerald-50 text-[#00b87c]",
      badgeClass: "bg-emerald-50 text-[#008f5f] border-emerald-200/50",
    }
  }
  if (cat.includes("transport") || cat.includes("uber") || cat.includes("taxi") || cat.includes("fuel")) {
    return {
      icon: RiCarLine,
      iconBg: "bg-blue-50 text-blue-600",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200/50",
    }
  }
  if (cat.includes("shop") || cat.includes("amazon") || cat.includes("cloth")) {
    return {
      icon: RiShoppingBag3Line,
      iconBg: "bg-purple-50 text-purple-600",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200/50",
    }
  }
  if (cat.includes("bill") || cat.includes("electric") || cat.includes("utilit")) {
    return {
      icon: HiOutlineLightningBolt,
      iconBg: "bg-amber-50 text-amber-500",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200/50",
    }
  }
  if (cat.includes("entertain") || cat.includes("netflix") || cat.includes("stream") || cat.includes("movie")) {
    return {
      icon: HiOutlinePlay,
      iconBg: "bg-rose-50 text-rose-500",
      badgeClass: "bg-rose-50 text-rose-700 border-rose-200/50",
    }
  }
  if (cat.includes("health") || cat.includes("gym") || cat.includes("fit") || cat.includes("medic")) {
    return {
      icon: RiHeartPulseLine,
      iconBg: "bg-teal-50 text-teal-600",
      badgeClass: "bg-teal-50 text-teal-700 border-teal-200/50",
    }
  }
  if (cat.includes("house") || cat.includes("rent")) {
    return {
      icon: RiHome4Line,
      iconBg: "bg-slate-100 text-slate-700",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    }
  }
  return {
    icon: HiOutlineTag,
    iconBg: "bg-slate-50 text-slate-600",
    badgeClass: "bg-slate-50 text-slate-700 border-slate-200",
  }
}

export function ExpensesTable({
  expenses = [],
  onEditExpense,
  onDeleteExpense,
}) {
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Desktop Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">Date</th>
              <th className="py-3.5 px-5">Description</th>
              <th className="py-3.5 px-5">Category</th>
              <th className="py-3.5 px-5 text-right">Amount</th>
              <th className="py-3.5 px-5 text-center w-20">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {expenses.map((expense) => {
              const meta = getCategoryMeta(expense.category)
              const Icon = meta.icon
              const isMenuOpen = openMenuId === expense.id

              return (
                <tr
                  key={expense.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* 1. Date */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <div className="font-bold text-slate-900 leading-tight">
                      {formatDate(expense.date, true)}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {formatWeekday(expense.date)}
                    </div>
                  </td>

                  {/* 2. Description */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl ${meta.iconBg} flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-105`}
                      >
                        <Icon />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">
                          {expense.description}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {expense.category || "General"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 3. Category Badge */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${meta.badgeClass}`}
                    >
                      {expense.category || "General"}
                    </span>
                  </td>

                  {/* 4. Amount */}
                  <td className="py-4 px-5 align-middle text-right whitespace-nowrap">
                    <span className="font-extrabold text-sm text-slate-900">
                      -{formatCurrency(expense.amount, true)}
                    </span>
                  </td>

                  {/* 5. Actions Dropdown */}
                  <td className="py-4 px-5 align-middle text-center relative whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(isMenuOpen ? null : expense.id)}
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
                        <div className="absolute right-6 top-10 z-30 w-36 rounded-xl bg-white border border-slate-200 shadow-xl py-1 text-left animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null)
                              onEditExpense(expense)
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
                              onDeleteExpense(expense)
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
