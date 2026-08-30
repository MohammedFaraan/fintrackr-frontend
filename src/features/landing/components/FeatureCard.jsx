import React from "react"
import { HiOutlineArrowNarrowRight } from "react-icons/hi"
import { cn } from "@/lib/utils"

export function FeatureCard({ feature }) {
  const Icon = feature.icon

  return (
    <div className="group relative rounded-2xl bg-white p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Icon Container */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110",
            feature.iconBg,
            feature.iconColor
          )}
        >
          <Icon className="w-6 h-6" />
        </div>

        {/* Feature Title */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#00b87c] transition-colors">
          {feature.title}
        </h3>

        {/* Feature Description */}
        <p className="text-sm leading-relaxed text-slate-500 mb-6">
          {feature.description}
        </p>
      </div>

      {/* Explore Link */}
      <div>
        <a
          href={feature.href || "#"}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00b87c] hover:text-[#00a36d] transition-colors"
        >
          Explore <HiOutlineArrowNarrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  )
}
