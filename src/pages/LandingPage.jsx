import React from "react"
import { LandingLayout } from "@/layouts/LandingLayout"
import { HeroSection } from "@/features/landing/sections/HeroSection"
import { FeaturesSection } from "@/features/landing/sections/FeaturesSection"
import { SecuritySection } from "@/features/landing/sections/SecuritySection"
import { StatsSection } from "@/features/landing/sections/StatsSection"
import { TestimonialsSection } from "@/features/landing/sections/TestimonialsSection"
import { FinalCtaSection } from "@/features/landing/sections/FinalCtaSection"

export function LandingPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <StatsSection />
      <TestimonialsSection />
      <FinalCtaSection />
    </LandingLayout>
  )
}

export default LandingPage
