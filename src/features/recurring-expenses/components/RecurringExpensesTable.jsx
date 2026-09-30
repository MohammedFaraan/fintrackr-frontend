import React, { useState } from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import {
  HiOutlineDotsHorizontal,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineSparkles,
  HiOutlineRefresh,
} from "react-icons/hi"
import {
  HiOutlineFilm,
  HiOutlineHome,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineFolder,
} from "react-icons/hi"

function getCategoryMeta(category) {
  const cat = (category || "").toLowerCase()
  if (cat.includes("entertain") || cat.includes("stream") || cat.includes("netflix") || cat.includes("spotify")) {
    return {
      icon: HiOutlineFilm,
      iconBg: "bg-rose-50 text-rose-500",
      badgeClass: "bg-rose-50 text-rose-600 border-rose-200/60",
    }
  }
  if (cat.includes("house") || cat.includes("rent") || cat.includes("mortgage") || cat.includes("home")) {
    return {
      icon: HiOutlineHome,
      iconBg: "bg-indigo-50 text-indigo-500",
      badgeClass: "bg-indigo-50 text-indigo-600 border-indigo-200/60",
    }
  }
  if (cat.includes("health") || cat.includes("gym") || cat.includes("fit") || cat.includes("medical")) {
    return {
      icon: HiOutlineHeart,
      iconBg: "bg-emerald-50 text-[#00b87c]",
      badgeClass: "bg-emerald-50 text-[#008f5f] border-emerald-200/60",
    }
  }
  if (cat.includes("shop") || cat.includes("amazon") || cat.includes("store")) {
    return {
      icon: HiOutlineShoppingBag,
      iconBg: "bg-amber-50 text-amber-500",
      badgeClass: "bg-amber-50 text-amber-600 border-amber-200/60",
    }
  }
  if (cat.includes("bill") || cat.includes("util") || cat.includes("electric") || cat.includes("water") || cat.includes("internet")) {
    return {
      icon: HiOutlineLightningBolt,
      iconBg: "bg-sky-50 text-sky-500",
      badgeClass: "bg-sky-50 text-sky-600 border-sky-200/60",
    }
  }
  if (cat.includes("insur")) {
    return {
      icon: HiOutlineShieldCheck,
      iconBg: "bg-purple-50 text-purple-500",
      badgeClass: "bg-purple-50 text-purple-600 border-purple-200/60",
    }
  }
  if (cat.includes("transport") || cat.includes("car") || cat.includes("fuel")) {
    return {
      icon: HiOutlineTruck,
      iconBg: "bg-blue-50 text-blue-500",
      badgeClass: "bg-blue-50 text-blue-600 border-blue-200/60",
    }
  }
  return {
    icon: HiOutlineFolder,
    iconBg: "bg-slate-100 text-slate-500",
    badgeClass: "bg-slate-100 text-slate-600 border-slate-200/60",
  }
}

function getDueDateLabel(dateStr) {
  if (!dateStr) return { text: "N/A", color: "text-slate-400" }
  const due = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  due.setHours(0, 0, 0, 0)
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return { text: `${Math.abs(diffDays)} days ago`, color: "text-rose-500 font-semibold" }
  if (diffDays === 0) return { text: "Today", color: "text-rose-500 font-bold" }
  if (diffDays <= 3) return { text: `In ${diffDays} days`, color: "text-rose-500" }
  if (diffDays <= 7) return { text: `In ${diffDays} days`, color: "text-amber-500" }
  if (diffDays <= 30) return { text: `In ${diffDays} days`, color: "text-slate-500" }
  return { text: formatDate(dateStr, true), color: "text-slate-400" }
}

export function RecurringExpensesTable({ recurringExpenses = [], onEdit, onDelete, onGenerate }) {
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-5">Description</th>
              <th className="py-3.5 px-5">Category</th>
              <th className="py-3.5 px-5">Amount</th>
              <th className="py-3.5 px-5">Frequency</th>
              <th className="py-3.5 px-5">Next Due</th>
              <th className="py-3.5 px-5 text-center">Status</th>
              <th className="py-3.5 px-5 text-center w-16">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {recurringExpenses.map((item) => {
              const meta = getCategoryMeta(item.category || "")
              const Icon = meta.icon
              const dueLabel = getDueDateLabel(item.next_occurrence)
              const isMenuOpen = openMenuId === item.id
              const isActive = !!item.is_active
              const isOverdue =
                item.next_occurrence &&
                new Date(item.next_occurrence) < new Date(new Date().toDateString())

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/70 transition-colors group ${
                    isOverdue && isActive ? "bg-rose-50/20" : ""
                  }`}
                >
                  {/* Description */}
                  <td className="py-4 px-5 align-middle">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl ${meta.iconBg} flex items-center justify-center text-sm shrink-0 transition-transform group-hover:scale-105`}
                      >
                        <Icon />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.description}</div>
                        <div className="text-[11px] text-slate-400 truncate">{item.category}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category Badge */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${meta.badgeClass}`}
                    >
                      {item.category || "General"}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-5 align-middle font-extrabold text-slate-900 whitespace-nowrap">
                    {formatCurrency(item.amount, true)}
                  </td>

                  {/* Frequency */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium capitalize">
                      <HiOutlineRefresh className="w-3.5 h-3.5 text-slate-400" />
                      {item.frequency || "Monthly"}
                    </div>
                  </td>

                  {/* Next Due */}
                  <td className="py-4 px-5 align-middle whitespace-nowrap">
                    <div className="font-semibold text-slate-800 leading-tight">
                      {item.next_occurrence ? formatDate(item.next_occurrence, true) : "N/A"}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${dueLabel.color}`}>{dueLabel.text}</div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                        isActive
                          ? "bg-emerald-50 text-[#008f5f] border-emerald-200/60"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-2 px-5 align-middle text-center relative whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setOpenMenuId(isMenuOpen ? null : item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      aria-label="Actions"
                    >
                      <HiOutlineDotsHorizontal className="w-5 h-5" />
                    </button>

                    {isMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-20" onClick={() => setOpenMenuId(null)} />
                        <div className="absolute right-3 top-6 z-30 w-44 rounded-xl bg-white border border-slate-200 shadow-xl py-1 text-left animate-in fade-in zoom-in-95 duration-150">
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null)
                              onEdit(item)
                            }}
                            className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#00b87c] transition-colors"
                          >
                            <HiOutlinePencil className="w-4 h-4 text-slate-400" />
                            <span>Edit</span>
                          </button>
                          {isActive && onGenerate && (
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenuId(null)
                                onGenerate(item)
                              }}
                              className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#00b87c] hover:bg-emerald-50 transition-colors"
                            >
                              <HiOutlineSparkles className="w-4 h-4 text-[#00b87c]" />
                              <span>Generate Now</span>
                            </button>
                          )}
                          <div className="border-t border-slate-100 my-0.5" />
                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null)
                              onDelete(item)
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
