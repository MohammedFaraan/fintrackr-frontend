/**
 * Format monetary amount into Indian Rupee style or localized currency
 * Example: 245500 -> "₹2,45,500"
 */
export function formatCurrency(amount, includeDecimals = false) {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return "₹0"
  }

  const num = Number(amount)
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(num)
}

/**
 * Format ISO date string into compact human readable format
 * Example: "2026-05-31" -> "May 31, 2026"
 */
export function formatDate(dateString, includeYear = false) {
  if (!dateString) return ""
  try {
    const parts = dateString.split("-")
    if (parts.length >= 3) {
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const day = parseInt(parts[2], 10)
      const date = new Date(year, month, day)

      if (isNaN(date.getTime())) return dateString

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        ...(includeYear ? { year: "numeric" } : {}),
      }).format(date)
    }

    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      ...(includeYear ? { year: "numeric" } : {}),
    }).format(date)
  } catch {
    return dateString
  }
}

/**
 * Get Day of Week from ISO date string
 * Example: "2026-05-31" -> "Sunday"
 */
export function formatWeekday(dateString) {
  if (!dateString) return ""
  try {
    const parts = dateString.split("-")
    if (parts.length >= 3) {
      const year = parseInt(parts[0], 10)
      const month = parseInt(parts[1], 10) - 1
      const day = parseInt(parts[2], 10)
      const date = new Date(year, month, day)
      if (isNaN(date.getTime())) return ""
      return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ""
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
  } catch {
    return ""
  }
}

/**
 * Format percentage
 * Example: 78.4 -> "78%"
 */
export function formatPercentage(value) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return "0%"
  }
  const num = Math.round(Number(value))
  return `${num}%`
}
