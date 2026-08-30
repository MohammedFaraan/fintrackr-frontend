import React, { useState, useMemo } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useBudgets } from "../hooks/useBudgets"
import { BudgetsHeader } from "../components/BudgetsHeader"
import { BudgetsSummaryCards } from "../components/BudgetsSummaryCards"
import { BudgetsFilterBar } from "../components/BudgetsFilterBar"
import { BudgetsTable } from "../components/BudgetsTable"
import { BudgetVsSpendingCard } from "../components/BudgetVsSpendingCard"
import { TopSpendingCategoriesCard } from "../components/TopSpendingCategoriesCard"
import { BudgetInsights } from "../components/BudgetInsights"
import { BudgetFormModal } from "../components/BudgetFormModal"
import { DeleteBudgetDialog } from "../components/DeleteBudgetDialog"
import { BudgetsSkeleton } from "../components/BudgetsSkeleton"
import { BudgetsEmptyState } from "../components/BudgetsEmptyState"
import { formatDate } from "@/lib/formatters"
import { toast } from "sonner"

export function BudgetsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this_month")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [periodFilter, setPeriodFilter] = useState("all")

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingBudget, setDeletingBudget] = useState(null)

  // Fetch budgets and status
  const {
    budgets,
    activeBudgetsStatus,
    categorySpending,
    isLoading,
    createBudget,
    isCreating,
    updateBudget,
    isUpdating,
    deleteBudget,
    isDeleting,
  } = useBudgets(selectedPeriod)

  // Merge raw budgets with active status if available
  const mergedBudgets = useMemo(() => {
    // If activeBudgetsStatus is available from dashboard composite, use it
    if (activeBudgetsStatus && activeBudgetsStatus.length > 0) {
      return activeBudgetsStatus.map((statusItem) => {
        const raw = budgets.find((b) => b.id === statusItem.budget_id)
        return {
          ...raw,
          ...statusItem,
          id: statusItem.budget_id,
        }
      })
    }

    // Otherwise fallback to raw budgets
    return budgets.map((b) => ({
      ...b,
      budget_id: b.id,
      budget_amount: b.amount,
      spent: 0,
      remaining: b.amount,
      usage_percentage: 0,
      is_exceeded: false,
    }))
  }, [budgets, activeBudgetsStatus])

  // Filter budgets by search & status
  const filteredBudgets = useMemo(() => {
    return mergedBudgets.filter((item) => {
      const name = (item.name || "").toLowerCase()
      const category = (item.category || "").toLowerCase()
      const query = searchQuery.toLowerCase()

      // Search match
      if (query && !name.includes(query) && !category.includes(query)) {
        return false
      }

      // Status match
      const budgetAmount = Number(item.budget_amount || item.amount || 0)
      const spentAmount = Number(item.spent || 0)
      const usagePercent = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0
      const isOver = item.is_exceeded || usagePercent >= 100
      const isAlmostOver = usagePercent >= 80 && !isOver

      if (statusFilter === "on_track" && (isOver || isAlmostOver)) return false
      if (statusFilter === "almost_over" && !isAlmostOver) return false
      if (statusFilter === "over_budget" && !isOver) return false

      return true
    })
  }, [mergedBudgets, searchQuery, statusFilter])

  // Calculate total budget & spent for widget
  const { totalBudget, totalSpent } = useMemo(() => {
    let totalB = 0
    let totalS = 0
    mergedBudgets.forEach((b) => {
      totalB += Number(b.budget_amount || b.amount || 0)
      totalS += Number(b.spent || 0)
    })
    return { totalBudget: totalB, totalSpent: totalS }
  }, [mergedBudgets])

  // Date range label
  const dateRangeLabel = useMemo(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth()
    if (selectedPeriod === "this_month") {
      const start = new Date(y, m, 1).toISOString().split("T")[0]
      const end = new Date(y, m + 1, 0).toISOString().split("T")[0]
      return `${formatDate(start)} - ${formatDate(end, true)}`
    }
    if (selectedPeriod === "last_month") {
      const start = new Date(y, m - 1, 1).toISOString().split("T")[0]
      const end = new Date(y, m, 0).toISOString().split("T")[0]
      return `${formatDate(start)} - ${formatDate(end, true)}`
    }
    if (selectedPeriod === "this_year") {
      return `Jan 1 - Dec 31, ${y}`
    }
    return "All Time"
  }, [selectedPeriod])

  // Handlers
  const handleOpenCreate = () => {
    setEditingBudget(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (budget) => {
    setEditingBudget(budget)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
    if (editingBudget) {
      const id = editingBudget.budget_id || editingBudget.id
      await updateBudget({ id, data: formData })
    } else {
      await createBudget(formData)
    }
  }

  const handleOpenDelete = (budget) => {
    setDeletingBudget(budget)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingBudget) return
    const id = deletingBudget.budget_id || deletingBudget.id
    try {
      await deleteBudget(id)
      toast.success("Budget deleted successfully")
      setDeleteModalOpen(false)
      setDeletingBudget(null)
    } catch (err) {
      toast.error("Failed to delete budget", {
        description: err.response?.data?.detail || "Please try again.",
      })
    }
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setPeriodFilter("all")
  }

  const isFiltered = !!searchQuery || statusFilter !== "all" || periodFilter !== "all"

  return (
    <DashboardLayout>
      {isLoading ? (
        <BudgetsSkeleton />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <BudgetsHeader
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            onOpenCreateBudget={handleOpenCreate}
            dateRangeLabel={dateRangeLabel}
          />

          {/* 1. Summary Cards */}
          <BudgetsSummaryCards activeBudgets={mergedBudgets} />

          {/* 2. Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Filter Bar + Table + Pagination (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Filter Bar */}
              <BudgetsFilterBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                periodFilter={periodFilter}
                onPeriodFilterChange={setPeriodFilter}
                onResetFilters={handleResetFilters}
              />

              {/* Table or Empty State */}
              {filteredBudgets.length === 0 ? (
                <BudgetsEmptyState
                  isFiltered={isFiltered}
                  onOpenCreateBudget={handleOpenCreate}
                  onResetFilters={handleResetFilters}
                />
              ) : (
                <BudgetsTable
                  budgets={filteredBudgets}
                  onEditBudget={handleOpenEdit}
                  onDeleteBudget={handleOpenDelete}
                />
              )}
            </div>

            {/* Right Column: Visualizations (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              {/* Budget vs Spending */}
              <BudgetVsSpendingCard
                totalBudget={totalBudget}
                totalSpent={totalSpent}
              />

              {/* Top Spending Categories */}
              <TopSpendingCategoriesCard
                activeBudgets={mergedBudgets}
                categorySpending={categorySpending}
              />
            </div>
          </div>

          {/* 3. Bottom Section: Budget Insights */}
          <BudgetInsights activeBudgets={mergedBudgets} />
        </div>
      )}

      {/* Create / Edit Budget Modal */}
      <BudgetFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingBudget(null)
        }}
        onSubmitBudget={handleFormSubmit}
        initialData={editingBudget}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteBudgetDialog
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setDeletingBudget(null)
        }}
        onConfirm={handleConfirmDelete}
        budget={deletingBudget}
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  )
}

export default BudgetsPage
