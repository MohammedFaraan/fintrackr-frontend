import apiClient from "@/lib/axios"

/**
 * Fetch report summary metrics
 * GET /reports/summary
 */
export async function getReportSummaryApi(startDate = null, endDate = null, category = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  if (category) params.category = category

  const response = await apiClient.get("/reports/summary", { params })
  return response.data
}

/**
 * Fetch category spending breakdown
 * GET /reports/categories
 */
export async function getCategoryBreakdownApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate

  const response = await apiClient.get("/reports/categories", { params })
  return response.data
}

/**
 * Fetch monthly spending trends
 * GET /reports/monthly
 */
export async function getMonthlyTrendsApi(year = null) {
  const params = {}
  if (year) params.year = year

  const response = await apiClient.get("/reports/monthly", { params })
  return response.data
}

/**
 * Fetch weekly spending trends
 * GET /reports/weekly
 */
export async function getWeeklyTrendsApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate

  const response = await apiClient.get("/reports/weekly", { params })
  return response.data
}

/**
 * Fetch period-over-period comparison
 * GET /reports/comparison
 */
export async function getPeriodComparisonApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate

  const response = await apiClient.get("/reports/comparison", { params })
  return response.data
}

/**
 * Fetch expenses for timeline plot
 * GET /expenses
 */
export async function getReportExpensesApi(params = {}) {
  const response = await apiClient.get("/expenses", { params })
  return response.data
}

/**
 * Trigger CSV export download
 * GET /reports/export/csv
 */
export async function downloadCsvReportApi(startDate = null, endDate = null, category = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  if (category && category !== "All Categories") params.category = category

  const response = await apiClient.get("/exports/expenses.csv", {
    params,
    responseType: "blob",
  })

  // Trigger browser download
  const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `FinTrackr_Report_${startDate || "all"}_to_${endDate || "all"}.csv`)
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Trigger PDF export download
 * GET /reports/export/pdf
 */
export async function downloadPdfReportApi(startDate = null, endDate = null, category = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  if (category && category !== "All Categories") params.category = category

  const response = await apiClient.get("/exports/expenses.pdf", {
    params,
    responseType: "blob",
  })

  // Trigger browser download
  const blob = new Blob([response.data], { type: "application/pdf" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", `FinTrackr_Report_${startDate || "all"}_to_${endDate || "all"}.pdf`)
  document.body.appendChild(link)
  link.click()
  link.parentNode.removeChild(link)
  window.URL.revokeObjectURL(url)
}
