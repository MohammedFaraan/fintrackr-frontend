import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getRecurringExpensesApi,
  createRecurringExpenseApi,
  updateRecurringExpenseApi,
  deleteRecurringExpenseApi,
  generateRecurringOccurrenceApi,
  generateAllRecurringApi,
  getDashboardDataApi,
} from "../api/recurring-expenses.api"
import { DASHBOARD_QUERY_KEY } from "@/features/dashboard/hooks/useDashboard"
import { EXPENSES_QUERY_KEY } from "@/features/expenses/hooks/useExpenses"

export const RECURRING_EXPENSES_QUERY_KEY = "recurring_expenses_list"

export function useRecurringExpenses(params = {}) {
  const queryClient = useQueryClient()

  // 1. Fetch recurring expenses
  const recurringQuery = useQuery({
    queryKey: [RECURRING_EXPENSES_QUERY_KEY, params],
    queryFn: () => getRecurringExpensesApi(params),
    staleTime: 1000 * 60,
  })

  // 2. Fetch dashboard data for upcoming recurring items
  const dashboardQuery = useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, "this_month"],
    queryFn: () => getDashboardDataApi("this_month"),
    staleTime: 1000 * 60,
  })

  // Invalidation helper
  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: [RECURRING_EXPENSES_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [DASHBOARD_QUERY_KEY] })
    queryClient.invalidateQueries({ queryKey: [EXPENSES_QUERY_KEY] })
  }

  // Mutations
  const createMutation = useMutation({
    mutationFn: createRecurringExpenseApi,
    onSuccess: invalidateAll,
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRecurringExpenseApi(id, data),
    onSuccess: invalidateAll,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteRecurringExpenseApi,
    onSuccess: invalidateAll,
  })

  const generateOccurrenceMutation = useMutation({
    mutationFn: generateRecurringOccurrenceApi,
    onSuccess: invalidateAll,
  })

  const generateAllMutation = useMutation({
    mutationFn: generateAllRecurringApi,
    onSuccess: invalidateAll,
  })

  return {
    recurringExpenses: recurringQuery.data || [],
    upcomingRecurring: dashboardQuery.data?.upcoming_recurring || [],
    isLoading: recurringQuery.isLoading || dashboardQuery.isLoading,
    isError: recurringQuery.isError,
    error: recurringQuery.error,
    refetch: () => {
      recurringQuery.refetch()
      dashboardQuery.refetch()
    },

    createRecurringExpense: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateRecurringExpense: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,

    deleteRecurringExpense: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,

    generateOccurrence: generateOccurrenceMutation.mutateAsync,
    isGenerating: generateOccurrenceMutation.isPending,

    generateAll: generateAllMutation.mutateAsync,
    isGeneratingAll: generateAllMutation.isPending,
  }
}
