import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getReportSummaryApi,
  getCategoryBreakdownApi,
  getMonthlyTrendsApi,
  getPeriodComparisonApi,
  getReportExpensesApi,
  downloadCsvReportApi,
  downloadPdfReportApi,
} from "../api/reports.api"

export const REPORTS_SUMMARY_KEY = "reports_summary"
export const REPORTS_CATEGORIES_KEY = "reports_categories"
export const REPORTS_MONTHLY_KEY = "reports_monthly"
export const REPORTS_COMPARISON_KEY = "reports_comparison"
export const REPORTS_EXPENSES_KEY = "reports_expenses"

export function useReports(startDate = null, endDate = null, year = null) {
  const [isExportingCsv, setIsExportingCsv] = useState(false)
  const [isExportingPdf, setIsExportingPdf] = useState(false)

  // 1. Report summary
  const summaryQuery = useQuery({
    queryKey: [REPORTS_SUMMARY_KEY, startDate, endDate],
    queryFn: () => getReportSummaryApi(startDate, endDate),
    staleTime: 1000 * 60 * 2,
  })

  // 2. Category spending breakdown
  const categoriesQuery = useQuery({
    queryKey: [REPORTS_CATEGORIES_KEY, startDate, endDate],
    queryFn: () => getCategoryBreakdownApi(startDate, endDate),
    staleTime: 1000 * 60 * 2,
  })

  // 3. Period comparison
  const comparisonQuery = useQuery({
    queryKey: [REPORTS_COMPARISON_KEY, startDate, endDate],
    queryFn: () => getPeriodComparisonApi(startDate, endDate),
    staleTime: 1000 * 60 * 2,
  })

  // 4. Monthly trends
  const monthlyQuery = useQuery({
    queryKey: [REPORTS_MONTHLY_KEY, year],
    queryFn: () => getMonthlyTrendsApi(year),
    staleTime: 1000 * 60 * 5,
  })

  // 5. Expenses for timeline visualization
  const expensesQuery = useQuery({
    queryKey: [REPORTS_EXPENSES_KEY, startDate, endDate],
    queryFn: () =>
      getReportExpensesApi({
        start_date: startDate,
        end_date: endDate,
        limit: 1000,
        sort_by: "date",
        sort_order: "asc",
      }),
    staleTime: 1000 * 60,
  })

  // Export handlers
  const handleExportCsv = async () => {
    try {
      setIsExportingCsv(true)
      await downloadCsvReportApi(startDate, endDate)
      toast.success("CSV report exported successfully")
    } catch (err) {
      toast.error("Failed to export CSV report", {
        description: err.response?.data?.detail || "Please try again.",
      })
    } finally {
      setIsExportingCsv(false)
    }
  }

  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true)
      await downloadPdfReportApi(startDate, endDate)
      toast.success("PDF report generated and downloaded")
    } catch (err) {
      toast.error("Failed to export PDF report", {
        description: err.response?.data?.detail || "Please try again.",
      })
    } finally {
      setIsExportingPdf(false)
    }
  }

  const isLoading =
    summaryQuery.isLoading ||
    categoriesQuery.isLoading ||
    comparisonQuery.isLoading

  const isError =
    summaryQuery.isError &&
    categoriesQuery.isError &&
    comparisonQuery.isError

  return {
    summary: summaryQuery.data,
    categoriesData: categoriesQuery.data,
    comparison: comparisonQuery.data,
    monthlyData: monthlyQuery.data,
    expenses: expensesQuery.data || [],
    isLoading,
    isError,
    refetchAll: () => {
      summaryQuery.refetch()
      categoriesQuery.refetch()
      comparisonQuery.refetch()
      monthlyQuery.refetch()
      expensesQuery.refetch()
    },
    exportCsv: handleExportCsv,
    exportPdf: handleExportPdf,
    isExportingCsv,
    isExportingPdf,
  }
}
