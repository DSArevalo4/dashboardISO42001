import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, Clock } from "lucide-react"

const incidents = [
  {
    id: "INC-001",
    title: "Latencia elevada en API",
    status: "resolved",
    time: "Hace 2 días",
    severity: "low",
  },
  {
    id: "INC-002",
    title: "Actualización de modelo CNN",
    status: "in-progress",
    time: "Hace 5 horas",
    severity: "medium",
  },
  {
    id: "INC-003",
    title: "Mantenimiento programado",
    status: "scheduled",
    time: "En 2 días",
    severity: "low",
  },
]

export function RecentIncidents() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Incidentes Recientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {incidents.map((incident) => {
          const Icon =
            incident.status === "resolved" ? CheckCircle2 : incident.status === "in-progress" ? AlertCircle : Clock
          const statusColor =
            incident.status === "resolved"
              ? "text-green-400"
              : incident.status === "in-progress"
                ? "text-yellow-400"
                : "text-cyan-400"

          return (
            <div
              key={incident.id}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10"
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-5 h-5 mt-0.5 ${statusColor}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{incident.title}</span>
                    <span className="text-xs text-white/50">{incident.id}</span>
                  </div>
                  <p className="text-xs text-white/60">{incident.time}</p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
