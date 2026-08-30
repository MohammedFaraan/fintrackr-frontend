import React from "react"
import { SecurityVisual } from "../components/SecurityVisual"
import { HiOutlineShieldCheck, HiOutlineLockClosed, HiOutlineCloudUpload } from "react-icons/hi"
import { RiCheckLine } from "react-icons/ri"

export function SecuritySection() {
  return (
    <section id="security" className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark Navy Rounded Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#0f172a] to-[#0a0f1d] border border-slate-800 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b87c]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                YOUR DATA, YOURS ONLY
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Privacy First. <br className="hidden sm:inline" />
                <span className="text-white">Always.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                Your financial data is encrypted, secure and never shared. We use bank-level security to protect what matters most — your trust.
              </p>

              {/* 3 Security Points */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <HiOutlineLockClosed className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">End-to-end Encryption</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <HiOutlineShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">No Data Sharing</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <HiOutlineCloudUpload className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">Secure Cloud Backup</span>
                </div>
              </div>
            </div>

            {/* Right Security 3D Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <SecurityVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
