import React from "react"
import { 
  HiOutlineHome, 
  HiOutlineCreditCard, 
  HiOutlineChartBar, 
  HiOutlineCog, 
  HiOutlineBell,
  HiOutlineSearch,
  HiArrowSmUp,
  HiArrowSmDown,
  HiOutlineArrowNarrowRight
} from "react-icons/hi"
import { 
  RiWallet3Line, 
  RiExchangeDollarLine, 
  RiPieChart2Line, 
  RiFlag2Line,
  RiLineChartLine,
  RiFileList3Line
} from "react-icons/ri"
import { 
  SiSwiggy, 
  SiNetflix 
} from "react-icons/si"
import { FaAmazon } from "react-icons/fa"
import { TbReceipt } from "react-icons/tb"

export function DashboardMockup() {
  return (
    <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-200/90 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12)] overflow-hidden text-left select-none">
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
        </div>
        <div className="text-xs font-medium text-slate-400">fintrackr.app/dashboard</div>
        <div className="w-10"></div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex min-h-[460px]">
        {/* Left Sidebar */}
        <aside className="w-48 border-r border-slate-100 bg-slate-50/40 p-4 hidden lg:flex flex-col justify-between shrink-0">
          <div className="space-y-6">
            {/* Logo in sidebar */}
            <div className="flex items-center gap-2 px-2">
              <div className="w-6 h-6 rounded-md bg-[#00b87c] flex items-center justify-center text-white text-xs font-bold">
                F
              </div>
              <span className="text-sm font-bold text-slate-800 tracking-tight">FinTrackr</span>
            </div>

            {/* Sidebar nav items */}
            <nav className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#00b87c] bg-[#e6f8f1] rounded-lg">
                <HiOutlineHome className="w-4 h-4" />
                <span>Overview</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiExchangeDollarLine className="w-4 h-4" />
                <span>Transactions</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiWallet3Line className="w-4 h-4" />
                <span>Accounts</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiPieChart2Line className="w-4 h-4" />
                <span>Budgets</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiFlag2Line className="w-4 h-4" />
                <span>Goals</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiLineChartLine className="w-4 h-4" />
                <span>Investments</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <RiFileList3Line className="w-4 h-4" />
                <span>Reports</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 rounded-lg">
                <HiOutlineCog className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </nav>
          </div>

          <div className="px-2 py-3 bg-white rounded-xl border border-slate-200/60 p-3 shadow-xs">
            <div className="text-[11px] font-semibold text-slate-700">Pro Plan Active</div>
            <div className="text-[10px] text-slate-400">Renews in 24 days</div>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-5 md:p-6 bg-white overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base md:text-lg font-bold text-slate-900">Overview</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <HiOutlineBell className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#00b87c]/20 text-[#008f5f] flex items-center justify-center text-xs font-bold">
                  A
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="pt-4 pb-4">
            <h3 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-1.5">
              Welcome back, Arjun <span className="text-base">👋</span>
            </h3>
            <p className="text-xs text-slate-400">Here's what's happening with your money today</p>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {/* Total Balance */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
                <div className="w-4 h-4 rounded bg-blue-50 text-blue-600 flex items-center justify-center text-[10px]">
                  <RiWallet3Line />
                </div>
                <span>Total Balance</span>
              </div>
              <div className="text-base md:text-lg font-extrabold text-slate-900">₹2,45,500</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                <HiArrowSmUp className="w-3 h-3" />
                <span>+12.5% <span className="text-slate-400 font-normal">from last month</span></span>
              </div>
            </div>

            {/* Total Income */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
                <div className="w-4 h-4 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px]">
                  <HiArrowSmUp />
                </div>
                <span>Total Income</span>
              </div>
              <div className="text-base md:text-lg font-extrabold text-slate-900">₹1,80,000</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                <HiArrowSmUp className="w-3 h-3" />
                <span>+8.2% <span className="text-slate-400 font-normal">from last month</span></span>
              </div>
            </div>

            {/* Total Expenses */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
                <div className="w-4 h-4 rounded bg-rose-50 text-rose-500 flex items-center justify-center text-[10px]">
                  <HiArrowSmDown />
                </div>
                <span>Total Expenses</span>
              </div>
              <div className="text-base md:text-lg font-extrabold text-slate-900">₹78,450</div>
              <div className="flex items-center gap-1 text-[10px] text-rose-500 font-semibold mt-0.5">
                <HiArrowSmDown className="w-3 h-3" />
                <span>-3.4% <span className="text-slate-400 font-normal">from last month</span></span>
              </div>
            </div>

            {/* Total Savings / Investments */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-xs hover:border-slate-200 transition-all">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium mb-1">
                <div className="w-4 h-4 rounded bg-purple-50 text-purple-600 flex items-center justify-center text-[10px]">
                  <RiLineChartLine />
                </div>
                <span>Investments</span>
              </div>
              <div className="text-base md:text-lg font-extrabold text-slate-900">₹1,02,050</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                <HiArrowSmUp className="w-3 h-3" />
                <span>+5.2% <span className="text-slate-400 font-normal">from last month</span></span>
              </div>
            </div>
          </div>

          {/* Lower Grid: Cash Flow Chart + Recent Transactions */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Cash Flow Area Chart */}
            <div className="md:col-span-7 p-4 rounded-xl border border-slate-100 bg-white shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-slate-800">Cash Flow</div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-[#00b87c]"></span> Income
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span> Expenses
                  </span>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative h-40 w-full">
                <svg viewBox="0 0 360 140" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00b87c" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00b87c" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="25" y1="20" x2="350" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="25" y1="50" x2="350" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="25" y1="80" x2="350" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="25" y1="110" x2="350" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Y-Axis labels */}
                  <text x="5" y="24" fill="#94a3b8" fontSize="8" textAnchor="start">1000</text>
                  <text x="5" y="54" fill="#94a3b8" fontSize="8" textAnchor="start">600</text>
                  <text x="5" y="84" fill="#94a3b8" fontSize="8" textAnchor="start">200</text>
                  <text x="5" y="114" fill="#94a3b8" fontSize="8" textAnchor="start">0</text>

                  {/* Income Filled Area & Line */}
                  <path
                    d="M 30,85 C 70,75 110,40 160,50 C 210,60 260,25 310,35 C 330,38 340,30 350,28 L 350,110 L 30,110 Z"
                    fill="url(#incomeGrad)"
                  />
                  <path
                    d="M 30,85 C 70,75 110,40 160,50 C 210,60 260,25 310,35 C 330,38 340,30 350,28"
                    fill="none"
                    stroke="#00b87c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Expenses Filled Area & Line */}
                  <path
                    d="M 30,95 C 80,90 120,70 170,75 C 220,80 270,60 320,68 C 335,70 345,65 350,62 L 350,110 L 30,110 Z"
                    fill="url(#expenseGrad)"
                  />
                  <path
                    d="M 30,95 C 80,90 120,70 170,75 C 220,80 270,60 320,68 C 335,70 345,65 350,62"
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between px-6 pt-1 text-[9px] text-slate-400 font-medium">
                  <span>1 May</span>
                  <span>8 May</span>
                  <span>15 May</span>
                  <span>22 May</span>
                  <span>29 May</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions List */}
            <div className="md:col-span-5 p-4 rounded-xl border border-slate-100 bg-white shadow-xs flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 mb-3">Recent Transactions</div>
                <div className="space-y-2.5">
                  {/* Item 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-xs font-bold">
                        <SiSwiggy />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">Swiggy</div>
                        <div className="text-[10px] text-slate-400">Food & Dining</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-800">-₹450</div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#00b87c] flex items-center justify-center text-xs font-bold">
                        <RiWallet3Line />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">Salary</div>
                        <div className="text-[10px] text-slate-400">Income</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#00b87c]">+₹1,80,000</div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-yellow-50 text-amber-600 flex items-center justify-center text-xs font-bold">
                        <FaAmazon />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">Amazon</div>
                        <div className="text-[10px] text-slate-400">Shopping</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-800">-₹2,499</div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold">
                        <SiNetflix />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 leading-tight">Netflix</div>
                        <div className="text-[10px] text-slate-400">Entertainment</div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-800">-₹649</div>
                  </div>
                </div>
              </div>

              {/* View all link */}
              <div className="pt-2 text-right">
                <a href="#transactions" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00b87c] hover:underline">
                  View all transactions <HiOutlineArrowNarrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
