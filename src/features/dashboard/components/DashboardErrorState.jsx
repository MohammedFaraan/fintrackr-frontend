import React from "react"
import { HiOutlineExclamationCircle, HiOutlineRefresh } from "react-icons/hi"
import { Button } from "@/components/ui/button"

export function DashboardErrorState({ onRetry, message }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto text-2xl">
        <HiOutlineExclamationCircle />
      </div>
      <h3 className="text-lg font-bold text-slate-900">
        Unable to load dashboard data
      </h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto">
        {message || "We encountered an issue connecting to the backend server. Please verify the backend is running and try again."}
      </p>
      {onRetry && (
        <div className="pt-2">
          <Button
            onClick={onRetry}
            className="rounded-xl px-5 py-2 text-xs font-bold gap-2"
          >
            <HiOutlineRefresh className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      )}
    </div>
  )
}
