import React, { useState, useMemo } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useExpenses } from "../hooks/useExpenses"
import { ExpensesHeader } from "../components/ExpensesHeader"
import { ExpensesSummaryCards } from "../components/ExpensesSummaryCards"
import { ExpensesFilterBar } from "../components/ExpensesFilterBar"
import { ExpensesTable } from "../components/ExpensesTable"
import { ExpensesPagination } from "../components/ExpensesPagination"
import { CategorySpendingSidebar } from "../components/CategorySpendingSidebar"
import { ExpenseFormModal } from "../components/ExpenseFormModal"
import { DeleteExpenseDialog } from "../components/DeleteExpenseDialog"
import { ExpensesSkeleton } from "../components/ExpensesSkeleton"
import { ExpensesEmptyState } from "../components/ExpensesEmptyState"
import { formatDate } from "@/lib/formatters"
import { toast } from "sonner"

export function ExpensesPage() {
  // Period & Date Boundaries
  const [selectedPeriod, setSelectedPeriod] = useState("this_month")

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletingExpense, setDeletingExpense] = useState(null)

  // Compute start/end dates from selected period
  const { startDate, endDate, dateRangeLabel } = useMemo(() => {
    const now = new Date()
    const y = now.getFullYear()
    const m = now.getMonth()

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
    if (selectedPeriod === "this_year") {
      const start = new Date(y, 0, 1).toISOString().split("T")[0]
      const end = new Date(y, 11, 31).toISOString().split("T")[0]
      return {
        startDate: start,
        endDate: end,
        dateRangeLabel: `Jan 1 - Dec 31, ${y}`,
      }
    }
    return { startDate: null, endDate: null, dateRangeLabel: "All Time" }
  }, [selectedPeriod])

  // Build query params for API
  const queryParams = useMemo(() => {
    const params = {
      sort_by: sortBy,
      sort_order: sortOrder,
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
    }

    if (searchQuery.trim()) params.search = searchQuery.trim()
    if (selectedCategory !== "All Categories") params.category = selectedCategory
    if (startDate) params.start_date = startDate
    if (endDate) params.end_date = endDate
    if (minAmount && !isNaN(Number(minAmount))) params.min_amount = minAmount
    if (maxAmount && !isNaN(Number(maxAmount))) params.max_amount = maxAmount

    return params
  }, [
    searchQuery,
    selectedCategory,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    minAmount,
    maxAmount,
    pageSize,
    currentPage,
  ])

  // Fetch data with custom hook
  const {
    expenses,
    isLoadingExpenses,
    summary,
    categoriesData,
    comparison,
    createExpense,
    isCreating,
    updateExpense,
    isUpdating,
    deleteExpense,
    isDeleting,
  } = useExpenses(queryParams)

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Categories")
    setMinAmount("")
    setMaxAmount("")
    setCurrentPage(1)
  }

  // Handlers for Add / Edit
  const handleOpenAddExpense = () => {
    setEditingExpense(null)
    setIsModalOpen(true)
  }

  const handleOpenEditExpense = (expense) => {
    setEditingExpense(expense)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
    if (editingExpense) {
      await updateExpense({ id: editingExpense.id, data: formData })
    } else {
      await createExpense(formData)
    }
  }

  // Handlers for Delete
  const handleOpenDelete = (expense) => {
    setDeletingExpense(expense)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingExpense) return
    try {
      await deleteExpense(deletingExpense.id)
      toast.success("Expense deleted successfully")
      setDeleteModalOpen(false)
      setDeletingExpense(null)
    } catch (err) {
      toast.error("Failed to delete expense", {
        description: err.response?.data?.detail || "Please try again.",
      })
    }
  }

  const isFiltered =
    !!searchQuery ||
    selectedCategory !== "All Categories" ||
    !!minAmount ||
    !!maxAmount

  const totalItemCount = summary?.expense_count || expenses.length

  return (
    <DashboardLayout>
      {isLoadingExpenses ? (
        <ExpensesSkeleton />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <ExpensesHeader
            selectedPeriod={selectedPeriod}
            onPeriodChange={(p) => {
              setSelectedPeriod(p)
              setCurrentPage(1)
            }}
            onOpenAddExpense={handleOpenAddExpense}
            dateRangeLabel={dateRangeLabel}
          />

          {/* 1. Summary Cards */}
          <ExpensesSummaryCards
            summary={summary}
            comparison={comparison}
          />

          {/* 2. Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Filter Bar + Table + Pagination (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Filter Bar */}
              <ExpensesFilterBar
                searchQuery={searchQuery}
                onSearchChange={(val) => {
                  setSearchQuery(val)
                  setCurrentPage(1)
                }}
                selectedCategory={selectedCategory}
                onCategoryChange={(val) => {
                  setSelectedCategory(val)
                  setCurrentPage(1)
                }}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={(field, order) => {
                  setSortBy(field)
                  setSortOrder(order)
                  setCurrentPage(1)
                }}
                minAmount={minAmount}
                maxAmount={maxAmount}
                onMinAmountChange={setMinAmount}
                onMaxAmountChange={setMaxAmount}
                onResetFilters={handleResetFilters}
              />

              {/* Table or Empty State */}
              {expenses.length === 0 ? (
                <ExpensesEmptyState
                  isFiltered={isFiltered}
                  onOpenAddExpense={handleOpenAddExpense}
                  onResetFilters={handleResetFilters}
                />
              ) : (
                <>
                  <ExpensesTable
                    expenses={expenses}
                    onEditExpense={handleOpenEditExpense}
                    onDeleteExpense={handleOpenDelete}
                  />

                  {/* Pagination */}
                  <ExpensesPagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalItems={totalItemCount}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                      setPageSize(newSize)
                      setCurrentPage(1)
                    }}
                  />
                </>
              )}
            </div>

            {/* Right Column: Category Breakdown & Recent Actions (4 cols) */}
            <div className="lg:col-span-4">
              <CategorySpendingSidebar
                categoriesData={categoriesData}
                recentExpenses={expenses}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Expense Modal */}
      <ExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingExpense(null)
        }}
        onSubmitExpense={handleFormSubmit}
        initialData={editingExpense}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteExpenseDialog
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setDeletingExpense(null)
        }}
        onConfirm={handleConfirmDelete}
        expense={deletingExpense}
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  )
}

export default ExpensesPage
