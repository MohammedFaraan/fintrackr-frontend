import React from "react"
import { HiCheck, HiOutlineLockClosed } from "react-icons/hi"
import { RiShieldCheckFill, RiServerLine } from "react-icons/ri"

export function SecurityVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center select-none">
      {/* Background glow circle */}
      <div className="absolute w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none -bottom-4 -right-4"></div>

      {/* Modern 3D/Isometric Security Composition */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Layer 1: Stacked Server / Database Blocks (Back) */}
        <div className="absolute right-12 top-10 w-44 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-3 shadow-2xl space-y-2 transform rotate-1">
          {/* Server shelf 1 */}
          <div className="h-5 rounded-lg bg-slate-950/80 border border-slate-700/50 flex items-center justify-between px-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            </div>
            <div className="w-10 h-1 bg-slate-700 rounded-full"></div>
          </div>
          {/* Server shelf 2 */}
          <div className="h-5 rounded-lg bg-slate-950/80 border border-slate-700/50 flex items-center justify-between px-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
            </div>
            <div className="w-8 h-1 bg-slate-700 rounded-full"></div>
          </div>
          {/* Server shelf 3 */}
          <div className="h-5 rounded-lg bg-slate-950/80 border border-slate-700/50 flex items-center justify-between px-2">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            </div>
            <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
          </div>
        </div>

        {/* Layer 2: Green Shield with Checkmark (Top Right) */}
        <div className="absolute right-4 top-2 z-20 transform hover:scale-105 transition-transform duration-300">
          <div className="relative w-28 h-32 rounded-3xl bg-gradient-to-br from-emerald-400 to-[#00b87c] p-1 shadow-[0_15px_35px_rgba(0,184,124,0.35)] flex items-center justify-center border-2 border-emerald-300/40">
            <div className="w-full h-full rounded-[22px] bg-gradient-to-b from-emerald-500/80 to-[#008f5f] flex items-center justify-center text-white">
              <HiCheck className="w-14 h-14 drop-shadow-md stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Layer 3: Blue Glowing Padlock (Center Left) */}
        <div className="absolute left-10 bottom-6 z-30 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
          <div className="relative w-24 h-28 flex flex-col items-center">
            {/* Shackle */}
            <div className="w-12 h-12 rounded-t-full border-[6px] border-slate-300 border-b-0 bg-transparent -mb-2"></div>
            {/* Body */}
            <div className="w-24 h-20 rounded-2xl bg-gradient-to-b from-blue-500 to-indigo-600 border border-blue-400/50 p-2 shadow-[0_15px_30px_rgba(59,130,246,0.4)] flex items-center justify-center">
              <div className="w-4 h-6 rounded-full bg-white/90 shadow-inner flex flex-col items-center justify-start pt-1">
                <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                <div className="w-1 h-2 bg-blue-900 rounded-b"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 4: Credit Card & Gold Coin (Bottom Right) */}
        <div className="absolute right-10 bottom-4 z-20 transform rotate-6">
          <div className="w-40 h-24 rounded-2xl bg-gradient-to-tr from-slate-700 via-blue-900 to-slate-800 border border-blue-400/40 p-3 shadow-xl flex flex-col justify-between backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="w-6 h-4 rounded bg-amber-300/90 border border-amber-200"></div>
              <span className="text-[9px] text-blue-200 font-mono tracking-wider">FinTrackr</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-300 font-mono">•••• 8832</span>
              <div className="w-4 h-4 rounded-full bg-amber-400 border border-amber-200 flex items-center justify-center text-[8px] font-bold text-amber-950">
                ₹
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
