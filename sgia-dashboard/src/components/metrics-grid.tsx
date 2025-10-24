import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react"

const metrics = [
  {
    title: "Disponibilidad",
    value: "99.8%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-green-400",
  },
  {
    title: "Accuracy del Modelo",
    value: "96.2%",
    change: "+1.2%",
    trend: "up",
    icon: Activity,
    color: "text-cyan-400",
  },
  {
    title: "F1 Score",
    value: "0.94",
    change: "+0.04",
    trend: "up",
    icon: TrendingUp,
    color: "text-green-400",
  },
  {
    title: "MTTR",
    value: "45 min",
    change: "-15 min",
    trend: "up",
    icon: Clock,
    color: "text-cyan-400",
  },
  {
    title: "Incidentes Críticos",
    value: "0",
    change: "0",
    trend: "neutral",
    icon: AlertTriangle,
    color: "text-green-400",
  },
  {
    title: "Data Drift",
    value: "2.1%",
    change: "+0.5%",
    trend: "down",
    icon: TrendingDown,
    color: "text-yellow-400",
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.trend === "up"
        const isNeutral = metric.trend === "neutral"

        return (
          <Card
            key={metric.title}
            className="p-4 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg bg-white/10 ${metric.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              {!isNeutral && (
                <span className={`text-xs font-medium ${isPositive ? "text-green-400" : "text-yellow-400"}`}>
                  {metric.change}
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
              <p className="text-xs text-white/60">{metric.title}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
