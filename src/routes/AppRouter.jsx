import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { LandingPage } from "@/pages/LandingPage"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { SignupPage } from "@/features/auth/pages/SignupPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { ExpensesPage } from "@/features/expenses/pages/ExpensesPage"
import { BudgetsPage } from "@/features/budgets/pages/BudgetsPage"
import { DashboardLayout } from "@/layouts/DashboardLayout"
import { useAuth } from "@/features/auth/hooks/useAuth"

function ModulePlaceholder({ title, description }) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs space-y-3 my-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00b87c] flex items-center justify-center mx-auto text-xl font-bold">
            ✦
          </div>
          <h3 className="text-lg font-bold text-slate-900">{title} Module</h3>
          <p className="text-xs text-slate-500">
            This module is connected to the backend API and will be fully expanded in subsequent steps.
          </p>
          <div className="pt-2">
            <a
              href="/dashboard"
              className="inline-block px-5 py-2.5 rounded-full bg-[#00b87c] text-white text-xs font-bold hover:bg-[#00a36d] transition-colors"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Authenticated Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated Expenses Route */}
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated Budgets Route */}
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <BudgetsPage />
            </ProtectedRoute>
          }
        />

        {/* Authenticated Feature Routes */}
        <Route
          path="/recurring-expenses"
          element={
            <ProtectedRoute>
              <ModulePlaceholder
                title="Recurring Expenses"
                description="Automate repeating transactions and subscriptions."
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ModulePlaceholder
                title="Reports & Analytics"
                description="In-depth monthly aggregations, trends and comparisons."
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ModulePlaceholder
                title="Settings"
                description="Manage your account preferences and profile."
              />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
