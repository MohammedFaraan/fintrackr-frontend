import React, { useState } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useDashboard } from "../hooks/useDashboard"
import { DashboardHeader } from "../components/DashboardHeader"
import { SummaryCards } from "../components/SummaryCards"
import { SpendingTrendChart } from "../components/SpendingTrendChart"
import { CategoryBreakdownChart } from "../components/CategoryBreakdownChart"
import { RecentExpensesList } from "../components/RecentExpensesList"
import { BudgetOverviewList } from "../components/BudgetOverviewList"
import { UpcomingRecurringList } from "../components/UpcomingRecurringList"
import { QuickActions } from "../components/QuickActions"
import { InsightBanner } from "../components/InsightBanner"
import { AddExpenseModal } from "../components/AddExpenseModal"
import { DashboardSkeleton } from "../components/DashboardSkeleton"
import { DashboardErrorState } from "../components/DashboardErrorState"
import { formatDate } from "@/lib/formatters"

export function DashboardPage() {
  const [period, setPeriod] = useState("this_month")
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)

  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch,
    addExpense,
    isAddingExpense,
  } = useDashboard(period)

  // Compute date range label if available from backend response
  let dateRangeLabel = null
  if (dashboardData?.start_date && dashboardData?.end_date) {
    dateRangeLabel = `${formatDate(dashboardData.start_date)} - ${formatDate(dashboardData.end_date, true)}`
  }

  return (
    <DashboardLayout>
      {isLoading ? (
        <DashboardSkeleton />
      ) : isError ? (
        <DashboardErrorState
          onRetry={() => refetch()}
          message={error?.response?.data?.detail || error?.message}
        />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <DashboardHeader
            selectedPeriod={period}
            onPeriodChange={setPeriod}
            onOpenAddExpense={() => setIsAddExpenseOpen(true)}
            dateRangeLabel={dateRangeLabel}
          />

          {/* 1. Summary Cards (4 Cards) */}
          <SummaryCards
            summary={dashboardData?.summary}
            comparison={dashboardData?.comparison}
            topCategories={dashboardData?.top_categories}
            activeBudgets={dashboardData?.active_budgets}
          />

          {/* 2. Middle Row: Spending Trend, Category Breakdown, Recent Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Spending Trend (Col 1-5) */}
            <div className="lg:col-span-5 flex">
              <div className="w-full">
                <SpendingTrendChart
                  recentExpenses={dashboardData?.recent_expenses}
                  period={period}
                  onPeriodChange={setPeriod}
                />
              </div>
            </div>

            {/* Category Breakdown (Col 6-8) */}
            <div className="lg:col-span-4 flex">
              <div className="w-full">
                <CategoryBreakdownChart
                  topCategories={dashboardData?.top_categories}
                  totalAmount={dashboardData?.summary?.total_amount}
                  period={period}
                  onPeriodChange={setPeriod}
                />
              </div>
            </div>

            {/* Recent Expenses (Col 9-12) */}
            <div className="lg:col-span-3 flex">
              <div className="w-full">
                <RecentExpensesList
                  recentExpenses={dashboardData?.recent_expenses}
                />
              </div>
            </div>
          </div>

          {/* 3. Lower Row: Budget Overview, Upcoming Recurring, Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Budget Overview (Col 1-4) */}
            <div className="lg:col-span-4 flex">
              <div className="w-full">
                <BudgetOverviewList
                  activeBudgets={dashboardData?.active_budgets}
                />
              </div>
            </div>

            {/* Upcoming Recurring (Col 5-8) */}
            <div className="lg:col-span-4 flex">
              <div className="w-full">
                <UpcomingRecurringList
                  upcomingRecurring={dashboardData?.upcoming_recurring}
                />
              </div>
            </div>

            {/* Quick Actions (Col 9-12) */}
            <div className="lg:col-span-4 flex">
              <div className="w-full">
                <QuickActions
                  onOpenAddExpense={() => setIsAddExpenseOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* 4. Bottom Insight Banner */}
          <InsightBanner comparison={dashboardData?.comparison} />
        </div>
      )}

      {/* Add Expense Dialog Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onAddExpense={addExpense}
        isSubmitting={isAddingExpense}
      />
    </DashboardLayout>
  )
}

export default DashboardPage
