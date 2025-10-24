"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

const regions = [
  { name: "Zona Norte", predictions: 1247, accuracy: 96.8, color: "bg-cyan-400" },
  { name: "Zona Centro", predictions: 2134, accuracy: 95.2, color: "bg-green-400" },
  { name: "Zona Sur", predictions: 1856, accuracy: 97.1, color: "bg-blue-400" },
  { name: "Zona Este", predictions: 982, accuracy: 94.5, color: "bg-purple-400" },
]

export function GeographicDistribution() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Distribución Geográfica</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {regions.map((region) => (
          <div
            key={region.name}
            className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">{region.name}</span>
              </div>
              <span className="text-xs text-green-400">{region.accuracy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/60">{region.predictions.toLocaleString()} predicciones</span>
              <div className={`w-2 h-2 rounded-full ${region.color}`}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
