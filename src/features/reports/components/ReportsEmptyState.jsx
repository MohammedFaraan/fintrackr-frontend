import React from "react"
import { Link } from "react-router"
import { HiOutlineChartBar, HiPlus } from "react-icons/hi"
import { Button } from "@/components/ui/button"

export function ReportsEmptyState() {
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-12 text-center space-y-4 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00b87c] flex items-center justify-center mx-auto text-2xl">
        <HiOutlineChartBar />
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-900">No report data for this period</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          No expenses have been recorded for the selected period. Add transactions or select another time range.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
        <Link to="/expenses">
          <Button className="rounded-xl text-xs font-bold gap-1.5 shadow-sm shadow-[#00b87c]/30">
            <HiPlus className="w-4 h-4" />
            <span>Go to Expenses</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
