import React from "react"
import { 
  HiOutlinePaperAirplane, 
  HiOutlineDownload, 
  HiOutlineRefresh, 
  HiOutlineQrcode,
  HiPlus,
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineChartPie,
  HiOutlineUser
} from "react-icons/hi"
import { SiStarbucks } from "react-icons/si"
import { RiWallet3Line } from "react-icons/ri"

export function MobileMockup() {
  return (
    <div className="w-[260px] sm:w-[280px] rounded-[38px] bg-slate-950 p-2.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] border-4 border-slate-800 text-white select-none transition-transform duration-300 hover:scale-[1.02]">
      {/* Phone Screen Container */}
      <div className="relative rounded-[30px] bg-[#0c1322] p-4 pt-3 flex flex-col justify-between overflow-hidden min-h-[460px] border border-slate-800/60">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 z-20">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700/50"></div>
        </div>

        {/* Top Header */}
        <div className="pt-5 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              Good morning, Arjun <span className="text-xs">☀️</span>
            </div>
            <div className="text-[10px] text-slate-500">Track, Plan, Grow</div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#00b87c]/30 border border-[#00b87c]/60 text-emerald-300 flex items-center justify-center text-xs font-bold">
            A
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-br from-[#0f1f1d] to-[#0d1627] border border-[#00b87c]/30 shadow-inner relative overflow-hidden">
          {/* Subtle green ambient light */}
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#00b87c]/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="text-[10px] text-slate-400 font-medium">Total Balance</div>
          <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">₹2,45,500</div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              +12.5% this month
            </span>
            <span className="text-[9px] text-slate-400 font-mono">**** 4920</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="mt-3.5">
          <div className="text-[10px] font-semibold text-slate-400 mb-2">Quick Actions</div>
          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-[#00b87c] hover:bg-slate-700 transition-colors">
                <HiOutlinePaperAirplane className="w-4 h-4 -rotate-45" />
              </div>
              <span className="text-[9px] text-slate-300 font-medium">Send</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-[#00b87c] hover:bg-slate-700 transition-colors">
                <HiOutlineDownload className="w-4 h-4" />
              </div>
              <span className="text-[9px] text-slate-300 font-medium">Receive</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-[#00b87c] hover:bg-slate-700 transition-colors">
                <HiOutlineRefresh className="w-4 h-4" />
              </div>
              <span className="text-[9px] text-slate-300 font-medium">Transfer</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-[#00b87c] hover:bg-slate-700 transition-colors">
                <HiOutlineQrcode className="w-4 h-4" />
              </div>
              <span className="text-[9px] text-slate-300 font-medium">Scan QR</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-2">
            <span>Recent Transactions</span>
            <span className="text-[#00b87c] text-[9px] font-medium">See all</span>
          </div>

          <div className="space-y-2">
            {/* Transaction 1 */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center text-xs">
                  <SiStarbucks />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white leading-tight">Starbucks</div>
                  <div className="text-[8px] text-slate-400">Today, 9:15 AM</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-slate-200">-₹350</div>
            </div>

            {/* Transaction 2 */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-900/50 text-[#00b87c] flex items-center justify-center text-xs">
                  <RiWallet3Line />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white leading-tight">Salary</div>
                  <div className="text-[8px] text-slate-400">Yesterday, 5:00 PM</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-[#00b87c]">+₹1,80,000</div>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="mt-4 -mx-4 -mb-4 bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-between relative">
          <div className="text-slate-400 hover:text-white cursor-pointer">
            <HiOutlineHome className="w-4 h-4 text-[#00b87c]" />
          </div>
          <div className="text-slate-500 hover:text-white cursor-pointer">
            <HiOutlineCreditCard className="w-4 h-4" />
          </div>

          {/* Floating Action Button */}
          <div className="-mt-6 w-9 h-9 rounded-full bg-[#00b87c] text-white flex items-center justify-center shadow-lg shadow-[#00b87c]/40 cursor-pointer hover:bg-[#00a36d] transition-colors">
            <HiPlus className="w-5 h-5" />
          </div>

          <div className="text-slate-500 hover:text-white cursor-pointer">
            <HiOutlineChartPie className="w-4 h-4" />
          </div>
          <div className="text-slate-500 hover:text-white cursor-pointer">
            <HiOutlineUser className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
