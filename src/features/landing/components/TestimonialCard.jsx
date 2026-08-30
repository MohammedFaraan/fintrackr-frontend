import React, { useState } from "react"
import { FaQuoteLeft } from "react-icons/fa"

export function TestimonialCard({ testimonial }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="rounded-2xl bg-white p-7 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-[0_10px_30px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 transition-all duration-300">
      <div>
        {/* Quote Icon */}
        <div className="text-slate-300 mb-4">
          <FaQuoteLeft className="w-5 h-5 text-slate-300" />
        </div>

        {/* Quote Body */}
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-6">
          "{testimonial.quote}"
        </p>
      </div>

      {/* User Information */}
      <div className="flex items-center gap-3 pt-2">
        {!imageError ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            onError={() => setImageError(true)}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
            {testimonial.initials}
          </div>
        )}

        <div>
          <h4 className="text-sm font-bold text-slate-900 leading-tight">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}
