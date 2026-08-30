import apiClient from "@/lib/axios"

/**
 * Fetch composite dashboard data
 * GET /dashboard
 * @param {string} period - "this_month" | "last_month" | "this_year" | "this_week" | "all_time" | "custom"
 * @param {string} [startDate] - YYYY-MM-DD (required only when period is "custom")
 * @param {string} [endDate] - YYYY-MM-DD (required only when period is "custom")
 */
export async function getDashboardData(period = "this_month", startDate = null, endDate = null) {
  const params = { period }
  if (period === "custom" && startDate && endDate) {
    params.start_date = startDate
    params.end_date = endDate
  }
  const response = await apiClient.get("/dashboard", { params })
  return response.data
}

/**
 * Fetch weekly aggregated spending trend
 * GET /reports/weekly
 */
export async function getWeeklyReport(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const response = await apiClient.get("/reports/weekly", { params })
  return response.data
}

/**
 * Fetch monthly aggregated spending trend
 * GET /reports/monthly
 */
export async function getMonthlyReport(year = null) {
  const params = {}
  if (year) params.year = year
  const response = await apiClient.get("/reports/monthly", { params })
  return response.data
}

/**
 * Fetch category spending breakdown
 * GET /reports/categories
 */
export async function getCategoryReport(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const response = await apiClient.get("/reports/categories", { params })
  return response.data
}

/**
 * Create a new expense
 * POST /expenses/
 */
export async function createExpense(data) {
  const response = await apiClient.post("/expenses/", data)
  return response.data
}
