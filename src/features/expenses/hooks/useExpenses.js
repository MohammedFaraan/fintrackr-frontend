import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getExpensesApi,
  createExpenseApi,
  updateExpenseApi,
  deleteExpenseApi,
  getReportSummaryApi,
  getCategoryBreakdownApi,
  getComparisonReportApi,
} from "../api/expenses.api"
import { DASHBOARD_QUERY_KEY } from "@/features/dashboard/hooks/useDashboard"

export const EXPENSES_QUERY_KEY = "expenses_list"
export const EXPENSES_SUMMARY_QUERY_KEY = "expenses_summary"
export const EXPENSES_CATEGORY_QUERY_KEY = "expenses_categories"
export const EXPENSES_COMPARISON_QUERY_KEY = "expenses_comparison"

export function useExpenses(params = {}) {
  const queryClient = useQueryClient()

  // 1. Fetch expenses list with filters & pagination
  const expensesQuery = useQuery({
    queryKey: [EXPENSES_QUERY_KEY, params],
    queryFn: () => getExpensesApi(params),
    staleTime: 1000 * 60, // 1 minute
  })

  // 2. Fetch report summary for cards
  const summaryQuery = useQuery({
    queryKey: [EXPENSES_SUMMARY_QUERY_KEY, params.start_date, params.end_date],
    queryFn: () => getReportSummaryApi(params.start_date, params.end_date),
    staleTime: 1000 * 60 * 2,
  })

  // 3. Fetch category breakdown for side chart
  const categoriesQuery = useQuery({
    queryKey: [EXPENSES_CATEGORY_QUERY_KEY, params.start_date, params.end_date],
    queryFn: () => getCategoryBreakdownApi(params.start_date, params.end_date),
    staleTime: 1000 * 60 * 2,
  })

  // 4. Fetch period comparison for delta percentages
  const comparisonQuery = useQuery({
    queryKey: [EXPENSES_COMPARISON_QUERY_KEY, params.start_date, params.end_date],
    queryFn: () => getComparisonReportApi(params.start_date, params.end_date),
    staleTime: 1000 * 60 * 2,
  })

  // Helper to invalidate all related queries
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [EXPENSES_SUMMARY_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [EXPENSES_CATEGORY_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [EXPENSES_COMPARISON_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [DASHBOARD_QUERY_KEY] })
  }

  // Mutations
  const createMutation = useMutation({
    mutationFn: createExpenseApi,
    onSuccess: invalidateAll,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateExpenseApi(id, data),
    onSuccess: invalidateAll,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteExpenseApi,
    onSuccess: invalidateAll,
  })

  return {
    expenses: expensesQuery.data || [],
    isLoadingExpenses: expensesQuery.isLoading,
    isErrorExpenses: expensesQuery.isError,
    expensesError: expensesQuery.error,
    refetchExpenses: expensesQuery.refetch,

    summary: summaryQuery.data,
    categoriesData: categoriesQuery.data,
    comparison: comparisonQuery.data,

    createExpense: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateExpense: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteExpense: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  }
}
