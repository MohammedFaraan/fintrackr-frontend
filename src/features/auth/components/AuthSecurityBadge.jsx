import React from "react"
import { HiOutlineShieldCheck } from "react-icons/hi"

export function AuthSecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-6">
      <HiOutlineShieldCheck className="w-4 h-4 text-[#00b87c] shrink-0" />
      <span>Your credentials are securely protected.</span>
    </div>
  )
}
