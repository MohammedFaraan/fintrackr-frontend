import React, { useState, useMemo } from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiChevronDown } from "react-icons/hi"

export function SpendingOverTimeChart({ expenses = [], monthlyData, startDate, endDate }) {
  const [granularity, setGranularity] = useState("daily") // "daily" | "monthly"
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Aggregate points based on granularity
  const chartData = useMemo(() => {
    if (granularity === "monthly" && monthlyData?.months) {
      return monthlyData.months.map((m) => ({
        label: m.month_name.slice(0, 3),
        date: m.month_name,
        amount: Number(m.total_amount || 0),
        count: m.expense_count,
      }))
    }

    // Daily aggregation from expenses
    const dateMap = {}
    expenses.forEach((exp) => {
      const d = exp.date
      if (!dateMap[d]) {
        dateMap[d] = { amount: 0, count: 0 }
      }
      dateMap[d].amount += Number(exp.amount || 0)
      dateMap[d].count += 1
    })

    const sortedDates = Object.keys(dateMap).sort()
    if (sortedDates.length === 0) return []

    return sortedDates.map((d) => ({
      label: formatDate(d),
      date: d,
      amount: dateMap[d].amount,
      count: dateMap[d].count,
    }))
  }, [granularity, monthlyData, expenses])

  // SVG dimensions
  const width = 560
  const height = 220
  const paddingLeft = 45
  const paddingRight = 20
  const paddingTop = 20
  const paddingBottom = 30

  const maxAmount = Math.max(...chartData.map((d) => d.amount), 1000)
  const yTicks = [0, maxAmount * 0.25, maxAmount * 0.5, maxAmount * 0.75, maxAmount]

  const points = chartData.map((d, index) => {
    const x =
      chartData.length > 1
        ? paddingLeft + (index / (chartData.length - 1)) * (width - paddingLeft - paddingRight)
        : width / 2
    const y =
      height - paddingBottom - (d.amount / maxAmount) * (height - paddingTop - paddingBottom)
    return { ...d, x, y }
  })

  // Build SVG path
  let pathD = ""
  let areaD = ""
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i]
      const p1 = points[i + 1]
      const cpX = (p0.x + p1.x) / 2
      pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`
    }
    areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`
  }

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Spending Over Time</h3>
          <p className="text-xs text-slate-400">
            {granularity === "monthly" ? "Monthly spending trend" : "Daily spending trend"}
          </p>
        </div>

        {/* Granularity Dropdown */}
        <div className="relative">
          <select
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
            className="h-8 pl-3 pr-7 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer appearance-none shadow-2xs"
            aria-label="Chart granularity"
          >
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
          </select>
          <HiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* SVG Chart */}
      {points.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-xs text-slate-400">
          No spending records for this period
        </div>
      ) : (
        <div className="relative w-full overflow-hidden">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="reportsSpendingGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00b87c" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00b87c" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            {yTicks.map((tick, idx) => {
              const y =
                height - paddingBottom - (tick / maxAmount) * (height - paddingTop - paddingBottom)
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke="#f1f5f9"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={y + 3.5}
                    textAnchor="end"
                    className="text-[10px] fill-slate-400 font-medium"
                  >
                    {tick >= 1000 ? `₹${Math.round(tick / 1000)}k` : `₹${Math.round(tick)}`}
                  </text>
                </g>
              )
            })}

            {/* Gradient Area Fill */}
            <path d={areaD} fill="url(#reportsSpendingGrad)" />

            {/* Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#00b87c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Data Points */}
            {points.map((p, idx) => (
              <g
                key={idx}
                onMouseEnter={() => setHoveredPoint(p)}
                onMouseLeave={() => setHoveredPoint(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.date === p.date ? "5" : "3.5"}
                  fill="#ffffff"
                  stroke="#00b87c"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />
              </g>
            ))}

            {/* X-axis labels */}
            {points.map((p, idx) => {
              // Show label for first, last, and every few intervals
              const shouldShowLabel =
                points.length <= 8 ||
                idx === 0 ||
                idx === points.length - 1 ||
                idx === Math.floor(points.length / 4) ||
                idx === Math.floor(points.length / 2) ||
                idx === Math.floor((3 * points.length) / 4)

              if (!shouldShowLabel) return null

              return (
                <text
                  key={idx}
                  x={p.x}
                  y={height - 8}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-medium"
                >
                  {p.label}
                </text>
              )
            })}
          </svg>

          {/* Hover Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none bg-slate-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-xl -translate-x-1/2 -translate-y-full z-10 animate-in fade-in zoom-in-95 duration-100"
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                top: `${(hoveredPoint.y / height) * 100 - 6}%`,
              }}
            >
              <div className="text-[10px] text-slate-300 font-normal">
                {hoveredPoint.date}
              </div>
              <div className="text-xs font-bold text-[#00b87c]">
                {formatCurrency(hoveredPoint.amount, true)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
