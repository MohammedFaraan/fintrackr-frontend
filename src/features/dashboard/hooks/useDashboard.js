import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getDashboardData, createExpense } from "../api/dashboard.api"

export const DASHBOARD_QUERY_KEY = "dashboard_data"

/**
 * Custom hook to fetch and manage dashboard state with TanStack Query
 */
export function useDashboard(period = "this_month", startDate = null, endDate = null) {
  const queryClient = useQueryClient()

  const dashboardQuery = useQuery({
    queryKey: [DASHBOARD_QUERY_KEY, period, startDate, endDate],
    queryFn: () => getDashboardData(period, startDate, endDate),
    staleTime: 1000 * 60 * 2, // 2 minutes cache
    refetchOnWindowFocus: true,
  })

  const addExpenseMutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      // Invalidate dashboard queries so all summary cards, charts and recent list update automatically
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_QUERY_KEY] })
    },
  })

  return {
    ...dashboardQuery,
    addExpense: addExpenseMutation.mutateAsync,
    isAddingExpense: addExpenseMutation.isPending,
  }
}
