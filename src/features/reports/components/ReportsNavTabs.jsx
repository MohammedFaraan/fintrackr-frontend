import React from "react"

export const REPORT_TABS = [
  { id: "overview", label: "Overview" },
  { id: "spending", label: "Spending" },
  { id: "categories", label: "Categories" },
  { id: "trends", label: "Trends" },
  { id: "comparison", label: "Comparison" },
]

export function ReportsNavTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-200/80 pb-px overflow-x-auto select-none">
      {REPORT_TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 text-xs font-bold transition-all relative whitespace-nowrap cursor-pointer ${
              isActive
                ? "text-[#00b87c]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00b87c] rounded-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}
