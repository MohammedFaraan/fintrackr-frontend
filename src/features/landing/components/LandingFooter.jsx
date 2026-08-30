import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import { Logo } from "@/components/shared/Logo"
import { footerLinks } from "../data/navigation"
import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub 
} from "react-icons/fa"
import { HiOutlinePaperAirplane } from "react-icons/hi"

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export function LandingFooter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (data) => {
    // Simulate short network request
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success("Thank you for subscribing to FinTrackr updates!", {
      description: `We've sent a confirmation link to ${data.email}.`,
    })
    reset()
  }

  return (
    <footer className="bg-[#090e1a] text-slate-400 pt-16 pb-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="/" className="inline-block focus-visible:ring-2 focus-visible:ring-[#00b87c] rounded-lg">
              <Logo isLight={true} />
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your all-in-one finance companion to track, plan and grow your money with confidence.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#00b87c] hover:text-white flex items-center justify-center text-slate-300 transition-all"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#00b87c] hover:text-white flex items-center justify-center text-slate-300 transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#00b87c] hover:text-white flex items-center justify-center text-slate-300 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#00b87c] hover:text-white flex items-center justify-center text-slate-300 transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (Col 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links (Col 9-10) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.resources.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (Col 11-12) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Stay Updated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to get financial tips and product updates.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 pt-1">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="w-full h-10 pl-3 pr-10 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b87c] focus:ring-1 focus:ring-[#00b87c]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-1 w-8 h-8 rounded-md bg-[#00b87c] hover:bg-[#00a36d] text-white flex items-center justify-center transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <HiOutlinePaperAirplane className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-400">{errors.email.message}</p>
              )}
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 FinTrackr. All rights reserved.</p>
          <div className="flex gap-4 mt-3 sm:mt-0">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#cookies" className="hover:text-slate-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
