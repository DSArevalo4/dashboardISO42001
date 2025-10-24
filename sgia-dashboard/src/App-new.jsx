import { useState } from 'react'
import { BarChart3, FileText, Users, Settings, AlertTriangle, CheckCircle2, Clock, TrendingUp, Activity, Shield, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'

function App() {
  // Datos de KPIs basados en las tablas ISO 42001
  const kpis = {
    accuracy: 96.2,
    bias: 1.8,
    uptime: 99.7,
    incidents: 1,
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
    { mes: 'Abr', incidentes: 1, resueltos: 0 },
  ]

  const riskDistribution = [
    { name: 'Bajo', value: 45, color: '#10b981' },
    { name: 'Medio', value: 35, color: '#f59e0b' },
    { name: 'Alto', value: 15, color: '#ef4444' },
    { name: 'Crítico', value: 5, color: '#991b1b' },
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
        return <Badge variant="success">Completado</Badge>
      case 'En progreso':
        return <Badge className="bg-blue-100 text-blue-800 border-transparent">En progreso</Badge>
      case 'Planificado':
        return <Badge variant="secondary">Planificado</Badge>
      default:
        return <Badge variant="outline">{estado}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      {/* Header Profesional */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  SGIA Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Sistema de Gestión de Inteligencia Artificial - ISO/IEC 42001</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">Geotermia + CNN</Badge>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Activity className="w-3 h-3 mr-1" />
                Sistema Activo
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="requisitos" className="gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Requisitos</span>
            </TabsTrigger>
            <TabsTrigger value="plan" className="gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Plan</span>
            </TabsTrigger>
            <TabsTrigger value="raci" className="gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">RACI</span>
            </TabsTrigger>
            <TabsTrigger value="politica" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Política</span>
            </TabsTrigger>
          </TabsList>

          {/* DASHBOARD TAB */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* KPIs Principales */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.accuracy}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">✓</span> Objetivo ≥95%
                  </p>
                  <Progress value={kpis.accuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sesgo</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.bias}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">✓</span> Objetivo ≤3%
                  </p>
                  <Progress value={(3 - kpis.bias) / 3 * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.uptime}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">✓</span> Objetivo ≥99%
                  </p>
                  <Progress value={kpis.uptime} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Incidentes / mes</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpis.incidents}</div>
                  <p className="text-xs text-muted-foreground">MTTR & CAPA</p>
                  <div className="mt-2 h-2 rounded-full bg-yellow-100"></div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos de Performance */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Tendencia de Métricas</CardTitle>
                  <CardDescription>Evolución mensual de KPIs principales</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Accuracy (%)" />
                      <Line type="monotone" dataKey="uptime" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Uptime (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Incidentes Mensuales</CardTitle>
                  <CardDescription>Registro y resolución de incidentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={incidentsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="incidentes" fill="hsl(var(--chart-4))" name="Incidentes" />
                      <Bar dataKey="resueltos" fill="hsl(var(--chart-2))" name="Resueltos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Métricas Adicionales */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Riesgos con Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{kpis.risksCovered}%</div>
                  <Progress value={kpis.risksCovered} className="mb-2" />
                  <p className="text-xs text-muted-foreground">Cobertura de riesgos identificados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Equipo Formado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{kpis.trainedTeam}%</div>
                  <Progress value={kpis.trainedTeam} className="mb-2" />
                  <p className="text-xs text-muted-foreground">Personal capacitado en IA ética</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cumplimiento Objetivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{kpis.objectives}%</div>
                  <Progress value={kpis.objectives} className="mb-2" />
                  <p className="text-xs text-muted-foreground">OKRs trimestrales alcanzados</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* REQUISITOS ISO 42001 TAB */}
          <TabsContent value="requisitos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Requisitos ISO/IEC 42001</h2>
                <p className="text-muted-foreground">Sistema de Gestión de IA - 7 Requisitos Principales</p>
              </div>
              <Badge className="text-lg px-4 py-2">
                {requisitos.filter(r => r.estado === 'Completado').length}/{requisitos.length} Completados
              </Badge>
            </div>

            <div className="grid gap-4">
              {requisitos.map((req) => (
                <Card key={req.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">{req.id}</Badge>
                          <CardTitle className="text-lg">{req.nombre}</CardTitle>
                          {getStatusBadge(req.estado)}
                        </div>
                        <CardDescription>{req.descripcion}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Implementación</p>
                        <p className="text-sm">{req.implementacion}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Indicadores</p>
                        <p className="text-sm">{req.indicadores}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">
                          <strong>Responsable:</strong> {req.responsable}
                        </span>
                        <span className="text-muted-foreground">
                          <strong>Frecuencia:</strong> {req.frecuencia}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 min-w-[150px]">
                        <Progress value={req.progreso} className="flex-1" />
                        <span className="text-sm font-medium">{req.progreso}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PLAN DE IMPLEMENTACIÓN TAB */}
          <TabsContent value="plan" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Plan de Implementación</h2>
              <p className="text-muted-foreground">Roadmap de 4 fases para el SGIA</p>
            </div>

            <div className="grid gap-4">
              {fases.map((fase, index) => (
                <Card key={index} className={`${fase.progreso === 100 ? 'border-green-200 bg-green-50/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          fase.progreso === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle>{fase.fase}</CardTitle>
                          <CardDescription>{fase.fecha}</CardDescription>
                        </div>
                      </div>
                      <Badge className={fase.progreso === 100 ? 'bg-green-500' : 'bg-blue-500'}>
                        {fase.progreso}% Completo
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-1">Actividades</p>
                        <p className="text-sm text-muted-foreground">{fase.actividades}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Entregables</p>
                        <p className="text-sm text-muted-foreground">{fase.entregables}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Responsable: {fase.responsable}</p>
                      <Progress value={fase.progreso} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* MATRIZ RACI TAB */}
          <TabsContent value="raci" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Matriz RACI</h2>
              <p className="text-muted-foreground">Responsabilidades y roles en actividades clave</p>
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="outline"><strong className="mr-1">R</strong> Responsable</Badge>
                  <Badge variant="outline"><strong className="mr-1">A</strong> Aprobador</Badge>
                  <Badge variant="outline"><strong className="mr-1">C</strong> Consultado</Badge>
                  <Badge variant="outline"><strong className="mr-1">I</strong> Informado</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-4 text-left font-medium">Actividad</th>
                        <th className="p-4 text-center font-medium">R</th>
                        <th className="p-4 text-center font-medium">A</th>
                        <th className="p-4 text-center font-medium">C</th>
                        <th className="p-4 text-center font-medium">I</th>
                      </tr>
                    </thead>
                    <tbody>
                      {raci.map((item, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="p-4 font-medium">{item.actividad}</td>
                          <td className="p-4 text-center text-sm">{item.R}</td>
                          <td className="p-4 text-center text-sm">{item.A}</td>
                          <td className="p-4 text-center text-sm">{item.C}</td>
                          <td className="p-4 text-center text-sm">{item.I}</td>
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
            <div>
              <h2 className="text-2xl font-bold mb-2">Política SGIA</h2>
              <p className="text-muted-foreground">Compromiso con IA Responsable y Ética</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Declaración de Política</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed">
                  Nos comprometemos a desarrollar y operar modelos de IA de forma <strong>ética, segura, explicable y conforme a la ley</strong>. 
                  Protegemos los datos geoespaciales, evaluamos y mitigamos riesgos (sesgo, privacidad, seguridad y seguridad del modelo), 
                  medimos desempeño y mejoramos continuamente. Asignamos roles y recursos, cumplimos con MinTIC y normas aplicables, 
                  y mantenemos evidencia de todas las decisiones del ciclo de vida de IA.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de Aprobación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Aprobada por</p>
                    <p className="text-base">Dirección del proyecto</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fecha de aprobación</p>
                    <p className="text-base">Pendiente</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Revisión</p>
                    <p className="text-base">Semestral</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Responsable</p>
                    <p className="text-base">Líder académico / Dirección de programa</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roles y Responsabilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Encargado SGIA</p>
                      <p className="text-sm text-muted-foreground">Supervisión general del sistema</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <Target className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Dueño de Datos</p>
                      <p className="text-sm text-muted-foreground">Gestión y calidad de datos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <Activity className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Dueño del Modelo</p>
                      <p className="text-sm text-muted-foreground">Desarrollo y mantenimiento del modelo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Oficial Ético</p>
                      <p className="text-sm text-muted-foreground">Evaluación ética y cumplimiento</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Dashboard SGIA - ISO/IEC 42001 | Proyecto Geotermia + CNN
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Última actualización: {new Date().toLocaleDateString('es-ES')}</span>
              <Badge variant="outline">v1.0.0</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
