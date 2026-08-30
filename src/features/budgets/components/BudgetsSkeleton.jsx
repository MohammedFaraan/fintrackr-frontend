import React from "react"

export function BudgetsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-64 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-28 bg-slate-100 rounded-xl"></div>
          <div className="h-9 w-32 bg-slate-200 rounded-xl"></div>
        </div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-3.5 w-20 bg-slate-100 rounded"></div>
              <div className="w-7 h-7 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="h-6 w-24 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 h-96 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="h-10 bg-slate-50 rounded-xl"></div>
          <div className="h-64 bg-slate-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-4 h-96 bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
          <div className="h-5 w-36 bg-slate-200 rounded"></div>
          <div className="h-48 bg-slate-50 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}
