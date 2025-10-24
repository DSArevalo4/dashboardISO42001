import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Shield, Lock, Database } from "lucide-react"

const risks = [
  {
    category: "Seguridad",
    level: "Bajo",
    score: 2,
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    category: "Privacidad",
    level: "Bajo",
    score: 2,
    icon: Lock,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
  },
  {
    category: "Sesgo del Modelo",
    level: "Medio",
    score: 3,
    icon: AlertTriangle,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    category: "Data Drift",
    level: "Medio",
    score: 3,
    icon: Database,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
]

export function RiskMatrix() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Matriz de Riesgos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {risks.map((risk) => {
          const Icon = risk.icon

          return (
            <div
              key={risk.category}
              className={`p-4 rounded-lg ${risk.bgColor} border border-white/10 hover:border-white/20 transition-all`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${risk.color}`} />
                  <span className="text-sm font-medium text-white">{risk.category}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${risk.color} bg-white/10`}>{risk.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${risk.color.replace("text-", "bg-")}`}
                    style={{ width: `${(risk.score / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white/60">{risk.score}/5</span>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
