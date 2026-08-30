import React from "react"
import { featuresData } from "../data/features"
import { FeatureCard } from "../components/FeatureCard"

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block text-xs font-extrabold tracking-widest text-[#00b87c] uppercase">
            POWERFUL FEATURES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need to take control
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-normal">
            Designed to make personal finance simple, beautiful and powerful.
          </p>
        </div>

        {/* 3-Column Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
