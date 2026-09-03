import React, { useState, useMemo } from "react"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useRecurringExpenses } from "../hooks/useRecurringExpenses"
import { RecurringExpensesHeader } from "../components/RecurringExpensesHeader"
import { RecurringExpensesSummaryCards } from "../components/RecurringExpensesSummaryCards"
import { RecurringExpensesFilterBar } from "../components/RecurringExpensesFilterBar"
import { RecurringExpensesTable } from "../components/RecurringExpensesTable"
import { UpcomingPaymentsCard } from "../components/UpcomingPaymentsCard"
import { RecurringSpendingByCategoryCard } from "../components/RecurringSpendingByCategoryCard"
import { ReminderBannerCard } from "../components/ReminderBannerCard"
import { RecurringExpenseFormModal } from "../components/RecurringExpenseFormModal"
import { DeleteRecurringDialog } from "../components/DeleteRecurringDialog"
import { RecurringExpensesSkeleton } from "../components/RecurringExpensesSkeleton"
import { RecurringExpensesEmptyState } from "../components/RecurringExpensesEmptyState"
import { formatDate } from "@/lib/formatters"
import { toast } from "sonner"

export function RecurringExpensesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState(null)

  const {
    recurringExpenses,
    upcomingRecurring,
    isLoading,
    createRecurringExpense,
    isCreating,
    updateRecurringExpense,
    isUpdating,
    deleteRecurringExpense,
    isDeleting,
  } = useRecurringExpenses()

  // Filter recurring expenses client-side
  const filteredExpenses = useMemo(() => {
    return recurringExpenses.filter((item) => {
      const name = (item.name || "").toLowerCase()
      const cat = (item.category || "").toLowerCase()
      const query = searchQuery.toLowerCase()

      if (query && !name.includes(query) && !cat.includes(query)) return false

      if (statusFilter === "active" && item.is_active === false) return false
      if (statusFilter === "inactive" && item.is_active !== false) return false

      if (selectedCategory !== "All Categories" && item.category !== selectedCategory) return false

      return true
    })
  }, [recurringExpenses, searchQuery, statusFilter, selectedCategory])

  const isFiltered = !!searchQuery || statusFilter !== "all" || selectedCategory !== "All Categories"

  // Date range label for header
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const start = new Date(y, m, 1).toISOString().split("T")[0]
  const end = new Date(y, m + 1, 0).toISOString().split("T")[0]
  const dateRangeLabel = `${formatDate(start)} - ${formatDate(end, true)}`

  const handleOpenAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleFormSubmit = async (formData) => {
    if (editingItem) {
      await updateRecurringExpense({ id: editingItem.id, data: formData })
    } else {
      await createRecurringExpense(formData)
    }
  }

  const handleOpenDelete = (item) => {
    setDeletingItem(item)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!deletingItem) return
    try {
      await deleteRecurringExpense(deletingItem.id)
      toast.success("Recurring expense deleted successfully")
      setDeleteDialogOpen(false)
      setDeletingItem(null)
    } catch (err) {
      toast.error("Failed to delete", {
        description: err.response?.data?.detail || "Please try again.",
      })
    }
  }

  const handleReset = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setSelectedCategory("All Categories")
  }

  // Showing count label
  const showingLabel = `Showing 1 to ${filteredExpenses.length} of ${filteredExpenses.length} subscription${filteredExpenses.length !== 1 ? "s" : ""}`

  return (
    <DashboardLayout>
      {isLoading ? (
        <RecurringExpensesSkeleton />
      ) : (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Header */}
          <RecurringExpensesHeader
            dateRangeLabel={dateRangeLabel}
            onOpenAddRecurring={handleOpenAdd}
          />

          {/* Summary Cards */}
          <RecurringExpensesSummaryCards
            recurringExpenses={recurringExpenses}
            upcomingRecurring={upcomingRecurring}
          />

          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Filter + Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Section Title */}
              <h2 className="text-sm font-bold text-slate-900">Recurring Expenses</h2>

              {/* Filter Bar */}
              <RecurringExpensesFilterBar
                searchQuery={searchQuery}
                onSearchChange={(val) => setSearchQuery(val)}
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onResetFilters={handleReset}
              />

              {/* Table or Empty State */}
              {filteredExpenses.length === 0 ? (
                <RecurringExpensesEmptyState
                  isFiltered={isFiltered}
                  onOpenAdd={handleOpenAdd}
                  onResetFilters={handleReset}
                />
              ) : (
                <>
                  <RecurringExpensesTable
                    recurringExpenses={filteredExpenses}
                    onEdit={handleOpenEdit}
                    onDelete={handleOpenDelete}
                  />
                  <p className="text-xs text-slate-400 pt-1">{showingLabel}</p>
                </>
              )}
            </div>

            {/* Right Column: Sidebar Widgets */}
            <div className="lg:col-span-4 space-y-5">
              <UpcomingPaymentsCard recurringExpenses={recurringExpenses} />
              <RecurringSpendingByCategoryCard recurringExpenses={recurringExpenses} />
            </div>
          </div>

          {/* Reminder Banner */}
          <ReminderBannerCard />
        </div>
      )}

      {/* Add / Edit Modal */}
      <RecurringExpenseFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingItem(null) }}
        onSubmit={handleFormSubmit}
        initialData={editingItem}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Delete Confirmation */}
      <DeleteRecurringDialog
        isOpen={deleteDialogOpen}
        onClose={() => { setDeleteDialogOpen(false); setDeletingItem(null) }}
        onConfirm={handleConfirmDelete}
        item={deletingItem}
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  )
}

export default RecurringExpensesPage
