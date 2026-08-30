import React from "react"
import { LandingNavbar } from "@/features/landing/components/LandingNavbar"
import { LandingFooter } from "@/features/landing/components/LandingFooter"

export function LandingLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfd] text-slate-900 selection:bg-[#00b87c]/20 selection:text-[#008f5f]">
      {/* Sticky Header */}
      <LandingNavbar />

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}
