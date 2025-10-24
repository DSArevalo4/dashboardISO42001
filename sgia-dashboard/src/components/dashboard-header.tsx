import { Bell, Settings, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="border-b border-white/10 bg-[#2a2a5e]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-white">
                SG
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">SGIA Dashboard</h1>
                <p className="text-xs text-cyan-300">Sistema de Gestión de IA</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-white hover:text-cyan-300 transition-colors">
              Inicio
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-cyan-300 transition-colors">
              Modelos
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-cyan-300 transition-colors">
              Datos
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-cyan-300 transition-colors">
              Seguridad
            </a>
            <a href="#" className="text-sm text-white/70 hover:text-cyan-300 transition-colors">
              Reportes
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input
                placeholder="Buscar..."
                className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
