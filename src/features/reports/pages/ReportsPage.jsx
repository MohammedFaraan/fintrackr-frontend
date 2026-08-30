import React, { useState, useMemo } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useReports } from "../hooks/useReports"
import { ReportsHeader } from "../components/ReportsHeader"
import { ReportsSummaryCards } from "../components/ReportsSummaryCards"
import { ReportsNavTabs } from "../components/ReportsNavTabs"
import { SpendingOverTimeChart } from "../components/SpendingOverTimeChart"
import { SpendingByCategoryChart } from "../components/SpendingByCategoryChart"
import { TopCategoriesBarList } from "../components/TopCategoriesBarList"
import { PeriodComparisonChart } from "../components/PeriodComparisonChart"
import { SpendingInsightsCard } from "../components/SpendingInsightsCard"
import { ExportReportCard } from "../components/ExportReportCard"
import { ReportsSkeleton } from "../components/ReportsSkeleton"
import { ReportsEmptyState } from "../components/ReportsEmptyState"
import { formatDate } from "@/lib/formatters"

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this_month")
  const [activeTab, setActiveTab] = useState("overview")

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  // Custom date range state
  const [customStartDate, setCustomStartDate] = useState(
    new Date(currentYear, currentMonth, 1).toISOString().split("T")[0]
  )
  const [customEndDate, setCustomEndDate] = useState(
    new Date(currentYear, currentMonth + 1, 0).toISOString().split("T")[0]
  )

  // Compute startDate & endDate & dateRangeLabel
  const { startDate, endDate, dateRangeLabel } = useMemo(() => {
    const y = currentYear
    const m = currentMonth

    if (selectedPeriod === "this_month") {
      const start = new Date(y, m, 1).toISOString().split("T")[0]
      const end = new Date(y, m + 1, 0).toISOString().split("T")[0]
      return {
        startDate: start,
        endDate: end,
        dateRangeLabel: `${formatDate(start)} - ${formatDate(end, true)}`,
      }
    }
    if (selectedPeriod === "last_month") {
      const start = new Date(y, m - 1, 1).toISOString().split("T")[0]
      const end = new Date(y, m, 0).toISOString().split("T")[0]
      return {
        startDate: start,
        endDate: end,
        dateRangeLabel: `${formatDate(start)} - ${formatDate(end, true)}`,
      }
    }
    if (selectedPeriod === "last_3_months") {
      const start = new Date(y, m - 2, 1).toISOString().split("T")[0]
      const end = new Date(y, m + 1, 0).toISOString().split("T")[0]
      return {
        startDate: start,
        endDate: end,
        dateRangeLabel: `${formatDate(start)} - ${formatDate(end, true)}`,
      }
    }
    if (selectedPeriod === "this_year") {
      const start = new Date(y, 0, 1).toISOString().split("T")[0]
      const end = new Date(y, 11, 31).toISOString().split("T")[0]
      return {
        startDate: start,
        endDate: end,
        dateRangeLabel: `Jan 1 - Dec 31, ${y}`,
      }
    }
    // Custom
    return {
      startDate: customStartDate,
      endDate: customEndDate,
      dateRangeLabel: `${formatDate(customStartDate)} - ${formatDate(customEndDate, true)}`,
    }
  }, [selectedPeriod, customStartDate, customEndDate, currentYear, currentMonth])

  // Fetch report data
  const {
    summary,
    categoriesData,
    comparison,
    monthlyData,
    expenses,
    isLoading,
    exportCsv,
    exportPdf,
    isExportingCsv,
    isExportingPdf,
  } = useReports(startDate, endDate, currentYear)

  const hasData = (summary?.total_amount && Number(summary.total_amount) > 0) || expenses.length > 0

  return (
    <DashboardLayout>
      {isLoading ? (
        <ReportsSkeleton />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <ReportsHeader
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            dateRangeLabel={dateRangeLabel}
            customStartDate={customStartDate}
            customEndDate={customEndDate}
            onCustomStartChange={setCustomStartDate}
            onCustomEndChange={setCustomEndDate}
          />

          {/* 1. Summary Cards */}
          <ReportsSummaryCards
            summary={summary}
            comparison={comparison}
            expenses={expenses}
          />

          {/* 2. Navigation Tabs */}
          <ReportsNavTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* If no data for period */}
          {!hasData ? (
            <ReportsEmptyState />
          ) : (
            <>
              {/* 3. Middle Row Grid: Spending Over Time & Spending By Category */}
              {(activeTab === "overview" || activeTab === "spending" || activeTab === "categories" || activeTab === "trends") && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                  {(activeTab === "overview" || activeTab === "spending" || activeTab === "trends") && (
                    <SpendingOverTimeChart
                      expenses={expenses}
                      monthlyData={monthlyData}
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )}

                  {(activeTab === "overview" || activeTab === "categories") && (
                    <SpendingByCategoryChart
                      categoriesData={categoriesData}
                    />
                  )}
                </div>
              )}

              {/* 4. Bottom Row Grid: Top Categories, Monthly Comparison, Spending Insights */}
              {(activeTab === "overview" || activeTab === "categories" || activeTab === "comparison" || activeTab === "trends") && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                  {/* Top Spending Categories */}
                  {(activeTab === "overview" || activeTab === "categories") && (
                    <TopCategoriesBarList
                      categoriesData={categoriesData}
                    />
                  )}

                  {/* Monthly Comparison */}
                  {(activeTab === "overview" || activeTab === "comparison") && (
                    <PeriodComparisonChart
                      comparison={comparison}
                      categoriesData={categoriesData}
                    />
                  )}

                  {/* Spending Insights */}
                  {(activeTab === "overview" || activeTab === "trends" || activeTab === "comparison") && (
                    <SpendingInsightsCard
                      comparison={comparison}
                      categoriesData={categoriesData}
                      summary={summary}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {/* 5. Export Report Card */}
          <ExportReportCard
            onExportPdf={exportPdf}
            onExportCsv={exportCsv}
            isExportingPdf={isExportingPdf}
            isExportingCsv={isExportingCsv}
          />
        </div>
      )}
    </DashboardLayout>
  )
}

export default ReportsPage
