import React, { useState } from "react"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { HiChevronDown } from "react-icons/hi"

export function SpendingTrendChart({
  recentExpenses = [],
  period = "this_month",
  onPeriodChange,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null)

  // Generate spending trend points by aggregating expenses by date
  const dateMap = {}
  if (recentExpenses && recentExpenses.length > 0) {
    recentExpenses.forEach((exp) => {
      const d = exp.date
      if (!dateMap[d]) dateMap[d] = 0
      dateMap[d] += Number(exp.amount || 0)
    })
  }

  // Sort dates chronologically
  const sortedDates = Object.keys(dateMap).sort()

  let points = sortedDates.map((date) => ({
    date,
    amount: dateMap[date],
  }))

  // If no expenses or single point, create fallback points for smooth rendering
  if (points.length === 0) {
    points = [
      { date: "Day 1", amount: 0 },
      { date: "Day 8", amount: 0 },
      { date: "Day 15", amount: 0 },
      { date: "Day 22", amount: 0 },
      { date: "Day 30", amount: 0 },
    ]
  } else if (points.length === 1) {
    points = [
      { date: "Start", amount: 0 },
      ...points,
      { date: "End", amount: 0 },
    ]
  }

  // Chart dimensions & scaling
  const maxAmount = Math.max(...points.map((p) => p.amount), 1000)
  const chartHeight = 160
  const chartWidth = 440
  const paddingX = 35
  const paddingY = 20

  const getX = (index) => {
    if (points.length <= 1) return paddingX
    return paddingX + (index / (points.length - 1)) * (chartWidth - paddingX * 2)
  }

  const getY = (amount) => {
    const usableHeight = chartHeight - paddingY * 2
    return chartHeight - paddingY - (amount / maxAmount) * usableHeight
  }

  // Build SVG Path
  const pathD = points.reduce((acc, point, index) => {
    const x = getX(index)
    const y = getY(point.amount)
    if (index === 0) return `M ${x},${y}`

    const prevX = getX(index - 1)
    const prevY = getY(points[index - 1].amount)
    const midX = (prevX + x) / 2
    return `${acc} C ${midX},${prevY} ${midX},${y} ${x},${y}`
  }, "")

  const areaD = `${pathD} L ${getX(points.length - 1)},${chartHeight - paddingY} L ${getX(0)},${chartHeight - paddingY} Z`

  // Format y-axis labels
  const yLabels = [
    { label: formatCurrency(maxAmount), y: getY(maxAmount) },
    { label: formatCurrency(maxAmount * 0.5), y: getY(maxAmount * 0.5) },
    { label: "₹0", y: chartHeight - paddingY },
  ]

  return (
    <div className="rounded-2xl bg-white p-5 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Spending Trend</h3>
          <p className="text-xs text-slate-400">Your expenses over time</p>
        </div>

        {/* Period selector */}
        {onPeriodChange && (
          <div className="relative inline-block">
            <select
              value={period}
              onChange={(e) => onPeriodChange(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg pl-2.5 pr-7 py-1 focus:outline-none cursor-pointer"
            >
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="this_year">This Year</option>
              <option value="this_week">This Week</option>
            </select>
            <HiChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2 pointer-events-none" />
          </div>
        )}
      </div>

      {/* SVG Line & Area Chart */}
      <div className="relative w-full aspect-[16/9] min-h-[170px] mt-2 select-none">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00b87c" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#00b87c" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={getY(maxAmount)}
            x2={chartWidth - paddingX}
            y2={getY(maxAmount)}
            stroke="#f1f5f9"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={getY(maxAmount * 0.5)}
            x2={chartWidth - paddingX}
            y2={getY(maxAmount * 0.5)}
            stroke="#f1f5f9"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={chartHeight - paddingY}
            x2={chartWidth - paddingX}
            y2={chartHeight - paddingY}
            stroke="#e2e8f0"
            strokeWidth="1"
          />

          {/* Y Axis Labels */}
          {yLabels.map((lbl, idx) => (
            <text
              key={idx}
              x={paddingX - 6}
              y={lbl.y + 3}
              fill="#94a3b8"
              fontSize="9"
              textAnchor="end"
              fontWeight="500"
            >
              {lbl.label}
            </text>
          ))}

          {/* Filled Area */}
          <path d={areaD} fill="url(#spendingGradient)" />

          {/* Main Curve Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#00b87c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Data Points */}
          {points.map((point, index) => {
            const cx = getX(index)
            const cy = getY(point.amount)
            const isHovered = hoveredPoint?.index === index

            return (
              <g key={index}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 5.5 : 3.5}
                  fill="#ffffff"
                  stroke="#00b87c"
                  strokeWidth="2.5"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredPoint({ ...point, index, cx, cy })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredPoint.cx / chartWidth) * 100}%`,
              top: `${(hoveredPoint.cy / chartHeight) * 100 - 8}%`,
            }}
          >
            <div>{formatCurrency(hoveredPoint.amount)}</div>
            <div className="text-[9px] text-slate-400 font-normal">
              {formatDate(hoveredPoint.date)}
            </div>
          </div>
        )}
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between px-7 pt-1 text-[10px] text-slate-400 font-medium border-t border-slate-50 mt-1">
        {points.length <= 5 ? (
          points.map((p, idx) => <span key={idx}>{formatDate(p.date) || p.date}</span>)
        ) : (
          <>
            <span>{formatDate(points[0].date)}</span>
            <span>{formatDate(points[Math.floor(points.length / 2)].date)}</span>
            <span>{formatDate(points[points.length - 1].date)}</span>
          </>
        )}
      </div>
    </div>
  )
}
