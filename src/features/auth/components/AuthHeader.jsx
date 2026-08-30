import React from "react"
import { Logo } from "@/components/shared/Logo"

export function AuthHeader({ linkText, linkActionText, linkHref }) {
  return (
    <header className="w-full bg-white border-b border-slate-100 py-4 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b87c] rounded-lg">
          <Logo />
        </a>

        <div className="text-xs sm:text-sm text-slate-600">
          <span>{linkText} </span>
          <a
            href={linkHref}
            className="font-semibold text-[#00b87c] hover:text-[#00a36d] hover:underline transition-colors"
          >
            {linkActionText}
          </a>
        </div>
      </div>
    </header>
  )
}
