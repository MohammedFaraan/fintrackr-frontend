import React from "react"

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      {/* Top Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-6 w-36 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-72 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      </div>

      {/* Summary Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-slate-100 rounded"></div>
              <div className="w-8 h-8 bg-slate-100 rounded-xl"></div>
            </div>
            <div className="h-7 w-28 bg-slate-200 rounded"></div>
            <div className="h-3 w-24 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>

      {/* Middle Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 h-64 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-44 bg-slate-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-4 h-64 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-44 bg-slate-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-3 h-64 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-44 bg-slate-50 rounded-xl"></div>
        </div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 h-60 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-40 bg-slate-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-4 h-60 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-40 bg-slate-50 rounded-xl"></div>
        </div>
        <div className="lg:col-span-4 h-60 bg-white rounded-2xl border border-slate-100 p-5">
          <div className="h-5 w-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-40 bg-slate-50 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}
