import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getBudgetsApi,
  getBudgetStatusApi,
  createBudgetApi,
  updateBudgetApi,
  deleteBudgetApi,
  getDashboardBudgetsApi,
  getCategorySpendingApi,
} from "../api/budgets.api"
import { DASHBOARD_QUERY_KEY } from "@/features/dashboard/hooks/useDashboard"

export const BUDGETS_QUERY_KEY = "budgets_list"
export const BUDGETS_STATUS_QUERY_KEY = "budgets_statuses"
export const BUDGETS_CATEGORY_QUERY_KEY = "budgets_category_spending"

export function useBudgets(period = "this_month") {
  const queryClient = useQueryClient()

  // 1. Fetch raw budgets list
  const budgetsQuery = useQuery({
    queryKey: [BUDGETS_QUERY_KEY],
    queryFn: () => getBudgetsApi(),
    staleTime: 1000 * 60,
  })

  // 2. Fetch dashboard composite data (which computes active_budgets with spent, remaining, usage_percentage)
  const dashboardQuery = useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, period],
    queryFn: () => getDashboardBudgetsApi(period),
    staleTime: 1000 * 60,
  })

  // 3. Fetch category spending report
  const categorySpendingQuery = useQuery({
    queryKey: [BUDGETS_CATEGORY_QUERY_KEY, period],
    queryFn: () => getCategorySpendingApi(),
    staleTime: 1000 * 60 * 2,
  })

  // Invalidation helper
  const invalidateBudgets = () => {
    queryClient.invalidateQueries({ queryKey: [BUDGETS_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [DASHBOARD_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [BUDGETS_CATEGORY_QUERY_KEY] })
  }

  // Mutations
  const createMutation = useMutation({
    mutationFn: createBudgetApi,
    onSuccess: invalidateBudgets,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBudgetApi(id, data),
    onSuccess: invalidateBudgets,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteBudgetApi,
    onSuccess: invalidateBudgets,
  })

  return {
    budgets: budgetsQuery.data || [],
    activeBudgetsStatus: dashboardQuery.data?.active_budgets || [],
    categorySpending: categorySpendingQuery.data?.categories || [],
    dashboardSummary: dashboardQuery.data?.summary,
    isLoading: budgetsQuery.isLoading || dashboardQuery.isLoading,
    isError: budgetsQuery.isError || dashboardQuery.isError,
    error: budgetsQuery.error || dashboardQuery.error,
    refetch: () => {
      budgetsQuery.refetch()
      dashboardQuery.refetch()
      categorySpendingQuery.refetch()
    },

    createBudget: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateBudget: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteBudget: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  }
}
