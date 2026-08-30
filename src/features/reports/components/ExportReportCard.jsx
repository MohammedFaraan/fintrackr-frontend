import React from "react"
import { HiOutlineDocumentDownload, HiOutlineTable } from "react-icons/hi"

export function ExportReportCard({ onExportPdf, onExportCsv, isExportingPdf, isExportingCsv }) {
  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Text Info */}
      <div>
        <h3 className="text-sm font-bold text-slate-900">Export Report</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Download your financial report for bookkeeping, tax, or personal archival.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 self-start sm:self-auto">
        {/* Export as PDF */}
        <button
          type="button"
          disabled={isExportingPdf}
          onClick={onExportPdf}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <HiOutlineDocumentDownload className="w-4 h-4 text-rose-500" />
          <span>{isExportingPdf ? "Generating PDF..." : "Export as PDF"}</span>
        </button>

        {/* Export as CSV */}
        <button
          type="button"
          disabled={isExportingCsv}
          onClick={onExportCsv}
          className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <HiOutlineTable className="w-4 h-4 text-[#00b87c]" />
          <span>{isExportingCsv ? "Exporting CSV..." : "Export as CSV"}</span>
        </button>
      </div>
    </div>
  )
}
