import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import { AuthHeader } from "../components/AuthHeader"
import { AuthSecurityBadge } from "../components/AuthSecurityBadge"
import { loginSchema } from "../schemas/auth.schema"
import { loginApi } from "../api/auth.api"
import { useAuth } from "../hooks/useAuth"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState(null)
  const { setAuthData } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setApiError(null)
    try {
      const res = await loginApi({
        email: data.email,
        password: data.password,
      })

      // Backend returns: { name, email, access_token, token_type }
      setAuthData(res.access_token, {
        name: res.name,
        email: res.email,
      })

      toast.success("Welcome back!", {
        description: `Logged in as ${res.name || res.email}`,
      })

      navigate("/dashboard")
    } catch (err) {
      const status = err.response?.status
      const detail = err.response?.data?.detail

      let errorMessage = "Unable to sign in. Please check your credentials."
      if (status === 401 || status === 400) {
        errorMessage = typeof detail === "string" ? detail : "Incorrect email or password."
      } else if (err.code === "ERR_NETWORK") {
        errorMessage = "Unable to reach server. Please ensure the backend is running."
      }

      setApiError(errorMessage)
      toast.error("Login failed", { description: errorMessage })
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fcfdfd] relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b87c]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header */}
      <AuthHeader
        linkText="Don't have an account?"
        linkActionText="Sign up"
        linkHref="/signup"
      />

      {/* Main Content Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-md mx-auto">
          {/* Card Container */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_10px_35px_-4px_rgba(0,0,0,0.04)] p-7 sm:p-9">
            {/* Title & Subtitle */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500 mt-2">
                Log in to continue to your FinTrackr account
              </p>
            </div>

            {/* API Error Alert */}
            {apiError && (
              <div className="mb-6 p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-medium">
                {apiError}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Email address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <HiOutlineMail className="w-5 h-5" />
                  </span>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full h-11 pl-11 pr-4 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-rose-400 focus:ring-rose-400/20"
                        : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1.5">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <HiOutlineLockClosed className="w-5 h-5" />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`w-full h-11 pl-11 pr-11 text-sm rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      errors.password
                        ? "border-rose-400 focus:ring-rose-400/20"
                        : "border-slate-200 focus:border-[#00b87c] focus:ring-[#00b87c]/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="w-5 h-5" />
                    ) : (
                      <HiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-500 mt-1.5">{errors.password.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#00b87c] hover:bg-[#00a36d] text-white text-sm font-bold shadow-md shadow-[#00b87c]/25 hover:shadow-lg hover:shadow-[#00b87c]/35 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <span>Log in</span>
                  )}
                </button>
              </div>
            </form>

            {/* Security Badge */}
            <AuthSecurityBadge />
          </div>
        </div>
      </main>

      {/* Footer spacer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        © 2026 FinTrackr. All rights reserved.
      </footer>
    </div>
  )
}

export default LoginPage
