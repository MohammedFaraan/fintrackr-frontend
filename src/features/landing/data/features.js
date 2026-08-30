import { 
  HiOutlineViewGrid, 
  HiOutlineReceiptTax, 
  HiOutlineCalculator, 
  HiOutlineTrendingUp 
} from "react-icons/hi"
import { 
  RiTargetLine, 
  RiPieChart2Line,
  RiWallet3Line,
  RiLineChartLine
} from "react-icons/ri"
import { 
  TbPigMoney,
  TbReportAnalytics,
  TbChartDots
} from "react-icons/tb"

export const featuresData = [
  {
    id: "smart-dashboard",
    title: "Smart Dashboard",
    description: "Get a real-time overview of your finances with beautiful charts and actionable insights.",
    icon: RiWallet3Line,
    iconColor: "text-[#00b87c]",
    iconBg: "bg-[#e6f8f1]",
    borderColor: "border-[#00b87c]/20",
    href: "#dashboard",
  },
  {
    id: "expense-tracking",
    title: "Expense Tracking",
    description: "Track every rupee you spend. Categorize, filter and understand your spending habits.",
    icon: HiOutlineReceiptTax,
    iconColor: "text-[#3b82f6]",
    iconBg: "bg-[#eff6ff]",
    borderColor: "border-[#3b82f6]/20",
    href: "#expenses",
  },
  {
    id: "budget-planning",
    title: "Budget Planning",
    description: "Create smart budgets, set limits and get alerts when you're close to overspending.",
    icon: HiOutlineCalculator,
    iconColor: "text-[#a855f7]",
    iconBg: "bg-[#faf5ff]",
    borderColor: "border-[#a855f7]/20",
    href: "#budgeting",
  },
  {
    id: "goal-management",
    title: "Goal Management",
    description: "Set financial goals and track your progress. Big dreams start with small steps.",
    icon: RiTargetLine,
    iconColor: "text-[#f97316]",
    iconBg: "bg-[#fff7ed]",
    borderColor: "border-[#f97316]/20",
    href: "#goals",
  },
  {
    id: "investment-tracking",
    title: "Investment Tracking",
    description: "Track your investments, analyze performance and grow your wealth over time.",
    icon: RiLineChartLine,
    iconColor: "text-[#ec4899]",
    iconBg: "bg-[#fdf2f8]",
    borderColor: "border-[#ec4899]/20",
    href: "#investments",
  },
  {
    id: "reports-insights",
    title: "Reports & Insights",
    description: "Dive deep into your finances with advanced reports and intelligent insights.",
    icon: TbReportAnalytics,
    iconColor: "text-[#06b6d4]",
    iconBg: "bg-[#ecfeff]",
    borderColor: "border-[#06b6d4]/20",
    href: "#reports",
  },
]
