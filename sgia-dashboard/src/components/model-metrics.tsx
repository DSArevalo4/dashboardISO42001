"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const metrics = [
  { label: "Accuracy", value: 96.2, target: 95, color: "bg-cyan-400" },
  { label: "Precision", value: 94.8, target: 90, color: "bg-green-400" },
  { label: "Recall", value: 95.5, target: 90, color: "bg-blue-400" },
  { label: "F1 Score", value: 94.0, target: 90, color: "bg-purple-400" },
]

export function ModelMetrics() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Métricas del Modelo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/80">{metric.label}</span>
              <span className="text-sm font-bold text-white">{metric.value}%</span>
            </div>
            <div className="relative">
              <Progress value={metric.value} className="h-2 bg-white/10" />
              <div
                className="absolute top-0 h-2 rounded-full transition-all"
                style={{
                  width: `${metric.value}%`,
                  background: `linear-gradient(90deg, ${metric.color.replace("bg-", "rgb(var(--color-chart-1))")}, ${metric.color.replace("bg-", "rgb(var(--color-chart-2))")})`,
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-white/50">Objetivo: {metric.target}%</span>
              <span className="text-xs text-green-400">+{(metric.value - metric.target).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
