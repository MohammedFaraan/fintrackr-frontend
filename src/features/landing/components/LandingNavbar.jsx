import React, { useState } from "react"
import { Logo } from "@/components/shared/Logo"
import { Button } from "@/components/ui/button"
import { navLinks } from "../data/navigation"
import { HiOutlineSun, HiOutlineMenu, HiOutlineX } from "react-icons/hi"

export function LandingNavbar({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00b87c] rounded-lg">
          <Logo />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors duration-150 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00b87c] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Icon (Visual only) */}
          <button
            type="button"
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <HiOutlineSun className="w-5 h-5" />
          </button>

          {/* Log in */}
          <a
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            Log in
          </a>

          {/* Get Started CTA */}
          <Button
            variant="default"
            size="default"
            className="px-6 shadow-sm shadow-[#00b87c]/25"
            onClick={() => window.location.href = "/signup"}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <HiOutlineSun className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-[#00b87c] hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="/login"
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              Log in
            </a>
            <Button
              className="w-full justify-center"
              onClick={() => {
                setMobileMenuOpen(false)
                window.location.href = "/signup"
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
