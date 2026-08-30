import React from "react"
import { Link } from "react-router"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { SiNetflix, SiSpotify } from "react-icons/si"
import { RiHome4Line, RiRepeat2Line, RiPlayCircleLine } from "react-icons/ri"
import { IoFitnessOutline } from "react-icons/io5"

function getRecurringIcon(description = "", category = "") {
  const text = `${description} ${category}`.toLowerCase()
  if (text.includes("netflix")) return { icon: SiNetflix, bg: "bg-black text-rose-500" }
  if (text.includes("spotify")) return { icon: SiSpotify, bg: "bg-emerald-950 text-emerald-400" }
  if (text.includes("rent") || text.includes("house") || text.includes("apart")) return { icon: RiHome4Line, bg: "bg-slate-100 text-slate-700" }
  if (text.includes("gym") || text.includes("fit")) return { icon: IoFitnessOutline, bg: "bg-rose-100 text-rose-700" }
  return { icon: RiRepeat2Line, bg: "bg-blue-50 text-blue-600" }
}

export function UpcomingRecurringList({ upcomingRecurring = [] }) {
  const recurring = upcomingRecurring.slice(0, 4)

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-slate-900">Upcoming Recurring</h3>
          <Link
            to="/recurring-expenses"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#00b87c] hover:underline"
          >
            View all <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <p className="text-xs text-slate-400 mb-4">Your scheduled expenses</p>

        {/* Recurring List */}
        {recurring.length === 0 ? (
          <div className="text-center py-6 space-y-1">
            <p className="text-xs font-semibold text-slate-600">No upcoming recurring schedules</p>
            <p className="text-[11px] text-slate-400">Automate recurring subscriptions and bills</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recurring.map((item) => {
              const { icon: Icon, bg } = getRecurringIcon(item.description, item.category)
              const freqLabel = item.frequency
                ? item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)
                : "Monthly"

              return (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center text-sm shrink-0`}>
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 truncate">
                        {item.description}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {formatCurrency(item.amount, true)} • {freqLabel}
                      </div>
                    </div>
                  </div>

                  {/* Due Date Badge */}
                  <div className="shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-[#008f5f] font-semibold text-[10px]">
                      {formatDate(item.next_occurrence)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
