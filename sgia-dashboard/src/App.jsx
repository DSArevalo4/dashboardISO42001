import { useState } from 'react'
import { BarChart3, FileText, Users, Settings, Bell, Search, Activity, TrendingUp, Clock, Target, AlertTriangle, CheckCircle2, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function App() {
  // Datos de KPIs basados en las tablas ISO 42001
  const kpis = {
    uptime: 99.8,
    accuracy: 96.2,
    f1Score: 0.94,
    responseTime: 45,
    incidents: 0,
    bias: 2.1,
    risksCovered: 85,
    trainedTeam: 78,
    objectives: 92
  }

  // Datos históricos para gráficos
  const performanceData = [
    { month: 'Ene', accuracy: 94.5, bias: 2.8, uptime: 98.5 },
    { month: 'Feb', accuracy: 95.1, bias: 2.5, uptime: 99.1 },
    { month: 'Mar', accuracy: 95.8, bias: 2.2, uptime: 99.3 },
    { month: 'Abr', accuracy: 96.2, bias: 1.8, uptime: 99.7 },
  ]

  const incidentsData = [
    { mes: 'Ene', incidentes: 3, resueltos: 3 },
    { mes: 'Feb', incidentes: 2, resueltos: 2 },
    { mes: 'Mar', incidentes: 1, resueltos: 1 },
    { mes: 'Abr', incidentes: 0, resueltos: 0 },
  ]

  const requisitos = [
    {
      id: 1,
      nombre: 'Contexto de la organización',
      descripcion: 'Identificar factores internos/externos, alcance y partes interesadas',
      implementacion: 'Levantamiento de contexto: objetivos científicos, restricciones éticas, fuentes de datos geoespaciales',
      indicadores: 'Acta publicada (sí/no); nº partes interesadas; riesgos identificados',
      responsable: 'Comité SGIA',
      frecuencia: 'Anual',
      estado: 'Completado',
      progreso: 100
    },
    {
      id: 2,
      nombre: 'Liderazgo y compromiso',
      descripcion: 'Política SGIA, roles, recursos y liderazgo visible',
      implementacion: 'Política de IA responsable; roles asignados (Encargado SGIA, Dueño de Datos, Oficial Ético)',
      indicadores: 'Política firmada; % roles cubiertos; horas dedicadas',
      responsable: 'Líder académico',
      frecuencia: 'Semestral',
      estado: 'En progreso',
      progreso: 85
    },
    {
      id: 3,
      nombre: 'Planificación',
      descripcion: 'Gestión de riesgos y oportunidades; objetivos y métricas',
      implementacion: 'Matriz de riesgos MAGERIT/NIST; objetivos (accuracy≥95%, sesgo≤3%, uptime≥99%)',
      indicadores: '% riesgos con plan; cumplimiento objetivos trimestrales',
      responsable: 'Data Lead',
      frecuencia: 'Trimestral',
      estado: 'En progreso',
      progreso: 75
    },
    {
      id: 4,
      nombre: 'Soporte',
      descripcion: 'Competencias, formación, comunicación y control documental',
      implementacion: 'Plan de formación en ética de IA, privacidad, MLOps',
      indicadores: '% equipo formado; nº comunicaciones/mes; % documentos',
      responsable: 'PM',
      frecuencia: 'Mensual',
      estado: 'En progreso',
      progreso: 78
    },
    {
      id: 5,
      nombre: 'Operación',
      descripcion: 'Procesos de ciclo de vida de IA seguros y trazables',
      implementacion: 'Pipeline MLOps con controles de calidad, trazabilidad, explainability',
      indicadores: '% pipelines validados; drift detectado/resuelto',
      responsable: 'MLOps Lead',
      frecuencia: 'Continuo',
      estado: 'En progreso',
      progreso: 65
    },
    {
      id: 6,
      nombre: 'Evaluación del desempeño',
      descripcion: 'Mediciones, auditorías internas, análisis de incidentes',
      implementacion: 'Tablero SGIA con métricas; auditoría semestral; post-mortem',
      indicadores: '% KPIs verdes; hallazgos por auditoría',
      responsable: 'PMO / Auditor',
      frecuencia: 'Semestral',
      estado: 'Planificado',
      progreso: 40
    },
    {
      id: 7,
      nombre: 'Mejora continua',
      descripcion: 'Corrección de desviaciones y optimización del sistema',
      implementacion: 'CAPA; retro de sprint; actualización de controles',
      indicadores: '% acciones cerradas; tiempo medio de mejora',
      responsable: 'Comité SGIA',
      frecuencia: 'Mensual',
      estado: 'Planificado',
      progreso: 30
    }
  ]

  const fases = [
    {
      fase: 'F1 – Preparar',
      actividades: 'Contexto y alcance; Política SGIA; RACI; Mapa de stakeholders',
      entregables: 'Documento de Contexto; Política; RACI',
      responsable: 'PM / Comité SGIA',
      fecha: 'Semana 1–2',
      progreso: 100
    },
    {
      fase: 'F2 – Diseñar',
      actividades: 'Objetivos y KPIs; matriz de riesgos; blueprint MLOps',
      entregables: 'OKRs/KPIs; Matriz de riesgos; Blueprint',
      responsable: 'Tech Lead / Ética',
      fecha: 'Fin semana 3',
      progreso: 75
    },
    {
      fase: 'F3 – Implementar',
      actividades: 'Pipelines; controles; documentación',
      entregables: 'Data/Model cards; CI/CD; Checklists',
      responsable: 'MLOps / Data Lead',
      fecha: 'Semana 8',
      progreso: 45
    },
    {
      fase: 'F4 – Operar',
      actividades: 'Monitor KPIs; auditoría; CAPA',
      entregables: 'BSC SGIA; Informe auditoría; CAPA',
      responsable: 'PMO / Auditor',
      fecha: 'Continuo',
      progreso: 20
    }
  ]

  const raci = [
    { actividad: 'Política SGIA', R: 'Dirección', A: 'Líder SGIA', C: 'Ética / Legal', I: 'Todo el equipo' },
    { actividad: 'Matriz de riesgos', R: 'Líder SGIA', A: 'Riesgos', C: 'Tech Lead / Ética', I: 'Dirección' },
    { actividad: 'Pipeline MLOps', R: 'Tech Lead', A: 'MLOps', C: 'Data Lead', I: 'PM' },
    { actividad: 'Auditoría interna', R: 'PMO/Auditor', A: 'Dirección', C: 'Tech Lead', I: 'Equipo' }
  ]

  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'Completado':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completado</Badge>
      case 'En progreso':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">En progreso</Badge>
      case 'Planificado':
        return <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Planificado</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1629]">
      {/* Header Estilo Dark Professional */}
      <header className="bg-[#1a2035] border-b border-slate-800/50 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  SG
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">SGIA Dashboard</h1>
                  <p className="text-sm text-slate-400">Sistema de Gestión de IA</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <a href="#" className="text-white font-medium">Inicio</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Modelos</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Datos</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Seguridad</a>
                <a href="#" className="text-slate-400 hover:text-white transition">Reportes</a>
              </nav>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="bg-[#0f1629] border border-slate-700 rounded-lg px-4 py-2 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button className="relative p-2 hover:bg-slate-800 rounded-lg transition">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 hover:bg-slate-800 rounded-lg transition">
                  <Settings className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="bg-[#1a2035] border border-slate-800/50 p-1 mb-8">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#0f1629]">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="requisitos" className="data-[state=active]:bg-[#0f1629]">
              <FileText className="w-4 h-4 mr-2" />
              Requisitos ISO 42001
            </TabsTrigger>
            <TabsTrigger value="plan" className="data-[state=active]:bg-[#0f1629]">
              <Clock className="w-4 h-4 mr-2" />
              Plan Implementación
            </TabsTrigger>
            <TabsTrigger value="raci" className="data-[state=active]:bg-[#0f1629]">
              <Users className="w-4 h-4 mr-2" />
              Matriz RACI
            </TabsTrigger>
            <TabsTrigger value="politica" className="data-[state=active]:bg-[#0f1629]">
              <Shield className="w-4 h-4 mr-2" />
              Política
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-8">
            {/* KPIs Principales - Grid 3x2 más grande */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      +0.3%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.uptime}%</h3>
                    <p className="text-slate-400 text-sm">Disponibilidad</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      +1.2%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.accuracy}%</h3>
                    <p className="text-slate-400 text-sm">Accuracy del Modelo</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      +0.04
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.f1Score}</h3>
                    <p className="text-slate-400 text-sm">F1 Score</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-cyan-500/10 rounded-xl">
                      <Clock className="w-6 h-6 text-cyan-400" />
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                      -15 min
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.responseTime} min</h3>
                    <p className="text-slate-400 text-sm">Tiempo de Respuesta</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-yellow-500/10 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.incidents}</h3>
                    <p className="text-slate-400 text-sm">Incidentes Críticos</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition p-6">
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                      <Target className="w-6 h-6 text-amber-400" />
                    </div>
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                      +0.5%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-5xl font-bold text-white">{kpis.bias}%</h3>
                    <p className="text-slate-400 text-sm">Sesgo del Modelo</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Tendencia de Métricas</CardTitle>
                  <CardDescription className="text-slate-400">Evolución mensual de KPIs principales</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} name="Accuracy (%)" />
                      <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} name="Uptime (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Incidentes Mensuales</CardTitle>
                  <CardDescription className="text-slate-400">Registro y resolución de incidentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incidentsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="mes" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        labelStyle={{ color: '#e2e8f0' }}
                      />
                      <Legend />
                      <Bar dataKey="incidentes" fill="#f59e0b" name="Incidentes" />
                      <Bar dataKey="resueltos" fill="#10b981" name="Resueltos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Métricas Adicionales */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Riesgos con Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-3 text-white">{kpis.risksCovered}%</div>
                  <Progress value={kpis.risksCovered} className="mb-3 h-3" />
                  <p className="text-sm text-slate-400">Cobertura de riesgos identificados</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Equipo Formado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-3 text-white">{kpis.trainedTeam}%</div>
                  <Progress value={kpis.trainedTeam} className="mb-3 h-3" />
                  <p className="text-sm text-slate-400">Personal capacitado en IA ética</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Cumplimiento Objetivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold mb-3 text-white">{kpis.objectives}%</div>
                  <Progress value={kpis.objectives} className="mb-3 h-3" />
                  <p className="text-sm text-slate-400">OKRs trimestrales alcanzados</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* REQUISITOS ISO 42001 TAB */}
          <TabsContent value="requisitos" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white">Requisitos ISO/IEC 42001</h2>
                <p className="text-slate-400 mt-1">Sistema de Gestión de IA - 7 Requisitos Principales</p>
              </div>
              <Badge className="text-lg px-4 py-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                {requisitos.filter(r => r.estado === 'Completado').length}/{requisitos.length} Completados
              </Badge>
            </div>

            <div className="grid gap-6">
              {requisitos.map((req) => (
                <Card key={req.id} className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="outline" className="font-mono text-purple-400 border-purple-500/30">
                            REQ-{req.id}
                          </Badge>
                          <CardTitle className="text-xl text-white">{req.nombre}</CardTitle>
                          {getStatusBadge(req.estado)}
                        </div>
                        <CardDescription className="text-slate-400 text-base">{req.descripcion}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-300">Implementación</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{req.implementacion}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-300">Indicadores</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{req.indicadores}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className="flex gap-6 text-sm">
                        <span className="text-slate-400">
                          <strong className="text-slate-300">Responsable:</strong> {req.responsable}
                        </span>
                        <span className="text-slate-400">
                          <strong className="text-slate-300">Frecuencia:</strong> {req.frecuencia}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Progress value={req.progreso} className="flex-1 h-2" />
                        <span className="text-sm font-semibold text-white w-12">{req.progreso}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PLAN DE IMPLEMENTACIÓN TAB */}
          <TabsContent value="plan" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Plan de Implementación</h2>
              <p className="text-slate-400">Roadmap de 4 fases para el SGIA</p>
            </div>

            <div className="grid gap-6">
              {fases.map((fase, index) => (
                <Card key={index} className={`bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm hover:bg-[#1e293b]/70 transition ${fase.progreso === 100 ? 'border-emerald-500/30' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-xl ${
                          fase.progreso === 100 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        } shadow-lg`}>
                          F{index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-xl text-white">{fase.fase}</CardTitle>
                          <CardDescription className="text-slate-400 text-base mt-1">{fase.fecha}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`text-base px-4 py-2 ${fase.progreso === 100 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                        {fase.progreso}% Completo
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-300">Actividades</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{fase.actividades}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-300">Entregables</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{fase.entregables}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-slate-300">Responsable: {fase.responsable}</p>
                      <Progress value={fase.progreso} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* MATRIZ RACI TAB */}
          <TabsContent value="raci" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Matriz RACI</h2>
              <p className="text-slate-400">Responsabilidades y roles en actividades clave</p>
            </div>

            <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-base px-3 py-1">
                    <strong className="mr-2">R</strong> Responsable
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-base px-3 py-1">
                    <strong className="mr-2">A</strong> Aprobador
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-base px-3 py-1">
                    <strong className="mr-2">C</strong> Consultado
                  </Badge>
                  <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-base px-3 py-1">
                    <strong className="mr-2">I</strong> Informado
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-slate-800/50 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/50 bg-slate-900/50">
                        <th className="p-5 text-left font-semibold text-white text-base">Actividad</th>
                        <th className="p-5 text-center font-semibold text-white text-base">R</th>
                        <th className="p-5 text-center font-semibold text-white text-base">A</th>
                        <th className="p-5 text-center font-semibold text-white text-base">C</th>
                        <th className="p-5 text-center font-semibold text-white text-base">I</th>
                      </tr>
                    </thead>
                    <tbody>
                      {raci.map((item, index) => (
                        <tr key={index} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-900/30 transition">
                          <td className="p-5 font-medium text-white text-base">{item.actividad}</td>
                          <td className="p-5 text-center text-slate-300 text-base">{item.R}</td>
                          <td className="p-5 text-center text-slate-300 text-base">{item.A}</td>
                          <td className="p-5 text-center text-slate-300 text-base">{item.C}</td>
                          <td className="p-5 text-center text-slate-300 text-base">{item.I}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* POLÍTICA TAB */}
          <TabsContent value="politica" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Política SGIA</h2>
              <p className="text-slate-400">Compromiso con IA Responsable y Ética</p>
            </div>

            <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">Declaración de Política</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-slate-300">
                  Nos comprometemos a desarrollar y operar modelos de IA de forma <strong className="text-white">ética, segura, explicable y conforme a la ley</strong>. 
                  Protegemos los datos geoespaciales, evaluamos y mitigamos riesgos (sesgo, privacidad, seguridad y seguridad del modelo), 
                  medimos desempeño y mejoramos continuamente. Asignamos roles y recursos, cumplimos con MinTIC y normas aplicables, 
                  y mantenemos evidencia de todas las decisiones del ciclo de vida de IA.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">Información de Aprobación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Aprobada por</p>
                    <p className="text-base text-white">Dirección del proyecto</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Fecha de aprobación</p>
                    <p className="text-base text-white">Pendiente</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Revisión</p>
                    <p className="text-base text-white">Semestral</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Responsable</p>
                    <p className="text-base text-white">Líder académico / Dirección de programa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1e293b]/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-xl">Roles y Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-700/50 bg-slate-900/30">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <Shield className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base mb-1">Encargado SGIA</p>
                      <p className="text-sm text-slate-400">Supervisión general del sistema</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-700/50 bg-slate-900/30">
                    <div className="p-3 bg-emerald-500/10 rounded-xl">
                      <Target className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base mb-1">Dueño de Datos</p>
                      <p className="text-sm text-slate-400">Gestión y calidad de datos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-700/50 bg-slate-900/30">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Activity className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base mb-1">Dueño del Modelo</p>
                      <p className="text-sm text-slate-400">Desarrollo y mantenimiento del modelo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-700/50 bg-slate-900/30">
                    <div className="p-3 bg-amber-500/10 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base mb-1">Oficial Ético</p>
                      <p className="text-sm text-slate-400">Evaluación ética y cumplimiento</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 bg-[#1a2035] mt-12">
        <div className="container mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              Dashboard SGIA - ISO/IEC 42001 | Proyecto Geotermia + CNN
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>Última actualización: {new Date().toLocaleDateString('es-ES')}</span>
              <Badge variant="outline" className="border-slate-700 text-slate-400">v1.0.0</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
