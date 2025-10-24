import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"

const statusItems = [
  {
    label: "Pipeline MLOps",
    status: "operational",
    time: "Activo",
    icon: CheckCircle2,
  },
  {
    label: "Infraestructura Cloud",
    status: "operational",
    time: "Activo",
    icon: CheckCircle2,
  },
  {
    label: "Base de Datos",
    status: "operational",
    time: "Activo",
    icon: CheckCircle2,
  },
  {
    label: "API Gateway",
    status: "operational",
    time: "Activo",
    icon: CheckCircle2,
  },
  {
    label: "Monitoreo",
    status: "warning",
    time: "Mantenimiento",
    icon: Clock,
  },
]

export function SystemStatus() {
  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full">
      <CardHeader>
        <CardTitle className="text-white">Estado del Sistema</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statusItems.map((item) => {
          const Icon = item.icon
          const isOperational = item.status === "operational"

          return (
            <div
              key={item.label}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isOperational ? "text-green-400" : "text-yellow-400"}`} />
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-white/60">{item.time}</p>
                </div>
              </div>
              <div
                className={`w-2 h-2 rounded-full ${isOperational ? "bg-green-400" : "bg-yellow-400"} animate-pulse`}
              ></div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
