"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { date: "Ene", accuracy: 94.5, f1: 0.91, latency: 1.8 },
  { date: "Feb", accuracy: 95.1, f1: 0.92, latency: 1.7 },
  { date: "Mar", accuracy: 95.8, f1: 0.93, latency: 1.6 },
  { date: "Abr", accuracy: 95.3, f1: 0.92, latency: 1.9 },
  { date: "May", accuracy: 96.0, f1: 0.94, latency: 1.5 },
  { date: "Jun", accuracy: 96.2, f1: 0.94, latency: 1.4 },
]

export function PerformanceChart() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>Rendimiento del Modelo CNN</span>
          <span className="text-sm font-normal text-cyan-400">Últimos 6 meses</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(255,255,255,0.5)" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(42, 42, 94, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Line
              type="monotone"
              dataKey="accuracy"
              stroke="#4dffff"
              strokeWidth={2}
              name="Accuracy (%)"
              dot={{ fill: "#4dffff", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="f1"
              stroke="#4aff8c"
              strokeWidth={2}
              name="F1 Score"
              dot={{ fill: "#4aff8c", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
