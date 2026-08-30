import React from "react"
import { useNavigate } from "react-router"
import { HiPlus, HiChevronRight, HiOutlineRefresh } from "react-icons/hi"
import { RiWallet3Line } from "react-icons/ri"

export function QuickActions({ onOpenAddExpense }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <h3 className="text-sm font-bold text-slate-900 mb-1">Quick Actions</h3>
        <p className="text-xs text-slate-400 mb-4">Common tasks to manage your finances</p>

        {/* Action Items */}
        <div className="space-y-2.5">
          {/* Action 1: Add Expense */}
          <button
            type="button"
            onClick={onOpenAddExpense}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-emerald-200 bg-white hover:bg-emerald-50/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00b87c] flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                <HiPlus className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-[#00b87c] transition-colors">
                  Add Expense
                </div>
                <div className="text-[10px] text-slate-400">Record a new expense</div>
              </div>
            </div>
            <HiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Action 2: Create Budget */}
          <button
            type="button"
            onClick={() => navigate("/budgets")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-teal-200 bg-white hover:bg-teal-50/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                <RiWallet3Line className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                  Create Budget
                </div>
                <div className="text-[10px] text-slate-400">Set a budget for a category</div>
              </div>
            </div>
            <HiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </button>

          {/* Action 3: Add Recurring Expense */}
          <button
            type="button"
            onClick={() => navigate("/recurring-expenses")}
            className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform">
                <HiOutlineRefresh className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  Add Recurring Expense
                </div>
                <div className="text-[10px] text-slate-400">Schedule a recurring expense</div>
              </div>
            </div>
            <HiChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>
    </div>
  )
}
