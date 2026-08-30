import React, { useState } from "react"
import { testimonialsData } from "../data/testimonials"
import { TestimonialCard } from "../components/TestimonialCard"

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#fcfdfd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block text-xs font-extrabold tracking-widest text-[#00b87c] uppercase">
            LOVED BY USERS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Here's what our users say
          </h2>
          <p className="text-base sm:text-lg text-slate-500 font-normal">
            Real people. Real stories. Real impact.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            type="button"
            onClick={() => setActiveIndex(0)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === 0 ? "w-6 bg-[#00b87c]" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label="Slide 1"
          />
          <button
            type="button"
            onClick={() => setActiveIndex(1)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === 1 ? "w-6 bg-[#00b87c]" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label="Slide 2"
          />
          <button
            type="button"
            onClick={() => setActiveIndex(2)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === 2 ? "w-6 bg-[#00b87c]" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label="Slide 3"
          />
          <button
            type="button"
            onClick={() => setActiveIndex(3)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === 3 ? "w-6 bg-[#00b87c]" : "w-2 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label="Slide 4"
          />
        </div>
      </div>
    </section>
  )
}
