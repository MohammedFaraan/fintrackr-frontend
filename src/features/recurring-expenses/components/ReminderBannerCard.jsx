import React from "react"
import { HiOutlineBell, HiOutlineArrowNarrowRight } from "react-icons/hi"

export function ReminderBannerCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#e6f8f1] to-[#f0fdf7] border border-[#00b87c]/20 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Icon + Text */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#00b87c]/10 text-[#00b87c] flex items-center justify-center text-xl shrink-0">
          <HiOutlineBell />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Never Miss a Payment</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Set up reminders and get notified before your payments are due.
          </p>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#00b87c]/40 bg-white text-xs font-bold text-[#00b87c] hover:bg-emerald-50 shadow-xs transition-all"
      >
        <span>Manage Reminders</span>
        <HiOutlineArrowNarrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
