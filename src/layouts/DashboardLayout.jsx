import React, { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router"
import { Logo } from "@/components/shared/Logo"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { 
  HiOutlineViewGrid, 
  HiOutlineReceiptTax, 
  HiOutlineCalculator, 
  HiOutlineRefresh, 
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX
} from "react-icons/hi"
import { TbReportAnalytics } from "react-icons/tb"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: HiOutlineViewGrid },
  { label: "Expenses", href: "/expenses", icon: HiOutlineReceiptTax },
  { label: "Budgets", href: "/budgets", icon: HiOutlineCalculator },
  { label: "Recurring Expenses", href: "/recurring-expenses", icon: HiOutlineRefresh },
  { label: "Reports", href: "/reports", icon: TbReportAnalytics },
  { label: "Settings", href: "/settings", icon: HiOutlineCog },
]

export function DashboardLayout({ children }) {
  const { user, clearAuthData } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    clearAuthData()
    navigate("/login")
  }

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : "U")

  return (
    <div className="min-h-screen bg-[#fcfdfd] text-slate-900 flex flex-col md:flex-row">
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-slate-100 bg-white min-h-screen p-6 sticky top-0 shrink-0 select-none">
        <div className="space-y-8">
          {/* Top Logo */}
          <div className="px-2">
            <Link to="/dashboard" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b87c] rounded-lg">
              <Logo iconSize={28} />
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5" aria-label="Sidebar Navigation">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || (item.href === "/dashboard" && location.pathname === "/")
              const Icon = item.icon

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-[#e6f8f1] text-[#00b87c]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-[#00b87c]" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-3 px-2">
            {/* User Avatar Circle */}
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
              {userInitial}
            </div>

            {/* Name and Email */}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-900 truncate">
                {user?.name || "FinTrackr User"}
              </div>
              <div className="text-xs text-slate-400 truncate">
                {user?.email || "user@example.com"}
              </div>
            </div>
          </div>

          {/* Log out button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50/60 rounded-lg transition-colors"
          >
            <HiOutlineLogout className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE HEADER ================= */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link to="/dashboard">
          <Logo iconSize={24} />
        </Link>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
            {userInitial}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 z-50 bg-white p-5 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? "bg-[#e6f8f1] text-[#00b87c]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                {userInitial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-slate-900 truncate">
                  {user?.name || "FinTrackr User"}
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {user?.email || "user@example.com"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 text-center text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
            >
              Log out
            </button>
          </div>
        </div>
      )}

      {/* ================= MAIN DASHBOARD BODY ================= */}
      <main className="flex-1 min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}
