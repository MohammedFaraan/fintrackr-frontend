import apiClient from "@/lib/axios"

/**
 * Fetch all recurring expenses
 * GET /recurring-expenses
 */
export async function getRecurringExpensesApi(params = {}) {
  // Clean up empty params
  const cleanParams = {}
  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
      cleanParams[key] = params[key]
    }
  })

  const response = await apiClient.get("/recurring-expenses", { params: cleanParams })
  return response.data
}

/**
 * Get single recurring expense by ID
 * GET /recurring-expenses/{id}
 */
export async function getRecurringExpenseByIdApi(id) {
  const response = await apiClient.get(`/recurring-expenses/${id}`)
  return response.data
}

/**
 * Create a new recurring expense
 * POST /recurring-expenses/
 */
export async function createRecurringExpenseApi(data) {
  const response = await apiClient.post("/recurring-expenses/", data)
  return response.data
}

/**
 * Update an existing recurring expense
 * PATCH /recurring-expenses/{id}
 */
export async function updateRecurringExpenseApi(id, data) {
  const response = await apiClient.patch(`/recurring-expenses/${id}`, data)
  return response.data
}

/**
 * Delete a recurring expense
 * DELETE /recurring-expenses/{id}
 */
export async function deleteRecurringExpenseApi(id) {
  const response = await apiClient.delete(`/recurring-expenses/${id}`)
  return response.data
}

/**
 * Generate due occurrences for a specific recurring expense
 * POST /recurring-expenses/{id}/generate
 */
export async function generateRecurringOccurrenceApi(id) {
  const response = await apiClient.post(`/recurring-expenses/${id}/generate`)
  return response.data
}

/**
 * Generate all due occurrences across all active recurring expenses
 * POST /recurring-expenses/generate-all
 */
export async function generateAllRecurringApi() {
  const response = await apiClient.post("/recurring-expenses/generate-all")
  return response.data
}

/**
 * Fetch dashboard composite data (includes upcoming_recurring)
 * GET /dashboard
 */
export async function getDashboardDataApi(period = "this_month") {
  const response = await apiClient.get("/dashboard", { params: { period } })
  return response.data
}
