import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardMockup } from "../components/DashboardMockup"
import { MobileMockup } from "../components/MobileMockup"
import { 
  HiOutlineShieldCheck, 
  HiOutlineRefresh, 
  HiOutlineLockClosed,
  HiOutlineArrowNarrowRight,
  HiChevronRight
} from "react-icons/hi"
import { RiSparklingFill } from "react-icons/ri"

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-gradient-to-b from-[#f7fcf9]/60 via-[#fcfdfd] to-[#f8fafc]">
      {/* Background subtle atmospheric glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-5 text-left space-y-7 z-10">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8fbf3] border border-[#00b87c]/25 text-[#008f5f] text-xs font-semibold shadow-xs">
              <span className="text-amber-500 text-xs">✨</span>
              <span>New: Investment tracking & advanced insights</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Track Smarter. <br />
              Spend Better. <br />
              <span className="text-[#00b87c]">Live Freer.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-normal">
              FinTrackr is your all-in-one personal finance companion. Track expenses, build budgets, set goals and grow wealth with powerful insights.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                size="lg"
                className="px-7 py-3 text-sm font-bold shadow-lg shadow-[#00b87c]/30 hover:shadow-[#00b87c]/40"
                onClick={() => window.location.href = "/signup"}
              >
                Get Started for Free
                <HiOutlineArrowNarrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 text-sm font-semibold border-slate-200 hover:bg-slate-50 text-slate-700 shadow-xs"
                onClick={() => {
                  const el = document.getElementById("features")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                View Demo
                <HiChevronRight className="w-4 h-4 text-slate-400" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <HiOutlineShieldCheck className="w-4 h-4 text-[#00b87c]" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineRefresh className="w-4 h-4 text-[#00b87c]" />
                <span>Real-time Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HiOutlineLockClosed className="w-4 h-4 text-[#00b87c]" />
                <span>100% Private</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Realistic Mockups */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            {/* Dashboard Mockup (Main Screen) */}
            <div className="w-full max-w-2xl transform lg:scale-[0.98] xl:scale-100 transition-all">
              <DashboardMockup />
            </div>

            {/* Floating Mobile Mockup (Overlapping Bottom Left) */}
            <div className="absolute -bottom-8 -left-4 sm:left-2 md:-bottom-10 md:left-6 z-20 hidden sm:block animate-float">
              <MobileMockup />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
