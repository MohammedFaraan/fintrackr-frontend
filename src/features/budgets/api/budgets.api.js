import apiClient from "@/lib/axios"

/**
 * Fetch all budgets
 * GET /budgets
 */
export async function getBudgetsApi(params = {}) {
  const response = await apiClient.get("/budgets", { params })
  return response.data
}

/**
 * Get single budget by ID
 * GET /budgets/{id}
 */
export async function getBudgetByIdApi(id) {
  const response = await apiClient.get(`/budgets/${id}`)
  return response.data
}

/**
 * Get real-time status and threshold data for a single budget
 * GET /budgets/{id}/status
 */
export async function getBudgetStatusApi(id) {
  const response = await apiClient.get(`/budgets/${id}/status`)
  return response.data
}

/**
 * Create a new budget
 * POST /budgets/
 * Body: { name, amount, category, start_date, end_date }
 */
export async function createBudgetApi(data) {
  const response = await apiClient.post("/budgets/", data)
  return response.data
}

/**
 * Update an existing budget
 * PATCH /budgets/{id}
 * Body: { name, amount, category, start_date, end_date, is_active }
 */
export async function updateBudgetApi(id, data) {
  const response = await apiClient.patch(`/budgets/${id}`, data)
  return response.data
}

/**
 * Delete a budget
 * DELETE /budgets/{id}
 */
export async function deleteBudgetApi(id) {
  const response = await apiClient.delete(`/budgets/${id}`)
  return response.data
}

/**
 * Fetch composite dashboard data which includes precomputed active_budgets
 * GET /dashboard
 */
export async function getDashboardBudgetsApi(period = "this_month") {
  const response = await apiClient.get("/dashboard", { params: { period } })
  return response.data
}

/**
 * Fetch category spending report
 * GET /reports/categories
 */
export async function getCategorySpendingApi(startDate = null, endDate = null) {
  const params = {}
  if (startDate) params.start_date = startDate
  if (endDate) params.end_date = endDate
  const response = await apiClient.get("/reports/categories", { params })
  return response.data
}
