import React from "react"
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi"

export function ExpensesPagination({
  currentPage = 1,
  pageSize = 10,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  // Generate page numbers array
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i)
    } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
      pageNumbers.push("...")
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 px-1 text-xs select-none">
      {/* Items count summary */}
      <div className="text-slate-500 font-medium order-2 sm:order-1">
        Showing <span className="font-bold text-slate-800">{startItem}</span> to{" "}
        <span className="font-bold text-slate-800">{endItem}</span> of{" "}
        <span className="font-bold text-slate-800">{totalItems}</span> expenses
      </div>

      {/* Pagination controls & Page Size */}
      <div className="flex items-center gap-3 order-1 sm:order-2">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <HiChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, idx) => {
            if (p === "...") {
              return (
                <span key={idx} className="px-1 text-slate-400">
                  ...
                </span>
              )
            }
            const isActive = p === currentPage
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#e6f8f1] border border-[#00b87c]/40 text-[#00b87c]"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <HiChevronRight className="w-4 h-4" />
        </button>

        {/* Page Size Selector */}
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 pl-2.5 pr-7 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none"
            aria-label="Items per page"
          >
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>
          <HiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
