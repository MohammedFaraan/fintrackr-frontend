import apiClient from "@/lib/axios"

/**
 * Fetch expenses with filtering, search, sorting and pagination
 * GET /expenses
 */
export async function getExpensesApi(params = {}) {
  // Clean up undefined or empty string parameters
  const cleanParams = {}
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      cleanParams[key] = params[key]
    }
  })

  const response = await apiClient.get("/expenses", { params: cleanParams })
  return response.data
}

/**
 * Get single expense by ID
 * GET /expenses/{id}
 */
export async function getExpenseByIdApi(id) {
  const response = await apiClient.get(`/expenses/${id}`)
  return response.data
}

/**
 * Create a new expense
 * POST /expenses/
 */
export async function createExpenseApi(data) {
  const response = await apiClient.post("/expenses/", data)
  return response.data
}

/**
 * Update an existing expense
 * PUT /expenses/{id}
 */
export async function updateExpenseApi(id, data) {
  const response = await apiClient.put(`/expenses/${id}`, data)
  return response.data
}

/**
 * Delete an expense
 * DELETE /expenses/{id}
 */
export async function deleteExpenseApi(id) {
  const response = await apiClient.delete(`/expenses/${id}`)
  return response.data
}

/**
 * Get spending stats
 * GET /expenses/stats/
 */
export async function getExpenseStatsApi() {
  const response = await apiClient.get("/expenses/stats/")
  return response.data
}

/**
 * Get report summary
 * GET /reports/summary
 */
export async function getReportSummaryApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const response = await apiClient.get("/reports/summary", { params })
  return response.data
}

/**
 * Get category spending breakdown
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
 * Get period comparison report
 * GET /reports/comparison
 */
export async function getComparisonReportApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const response = await apiClient.get("/reports/comparison", { params })
  return response.data
}
