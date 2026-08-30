import React from "react"
import { Button } from "@/components/ui/button"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

export function FinalCtaSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f7faf8] border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Take control of your money today.
        </h2>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto font-normal">
          Track, plan and grow your finances with FinTrackr.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            className="px-8 py-3.5 text-base font-bold shadow-lg shadow-[#00b87c]/30 hover:shadow-[#00b87c]/40"
            onClick={() => window.location.href = "/signup"}
          >
            Get Started for Free
            <HiOutlineArrowNarrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
