import { useState } from 'react'
import { BarChart3, FileText, Users, Settings, AlertTriangle, CheckCircle2, Clock, TrendingUp, Activity, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Badge } from './components/ui/badge'
import { Progress } from './components/ui/progress'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  // Datos de ejemplo basados en las tablas ISO 42001
  const kpis = {
    accuracy: 96.2,
    bias: 1.8,
    uptime: 99.7,
    incidents: 1,
    risksCovered: 85,
    trainedTeam: 78,
    objectives: 92
  }

  const requisitos = [
    {
      id: 1,
      nombre: 'Contexto de la organización',
      descripcion: 'Identificar factores internos/externos, alcance y partes interesadas',
      implementacion: 'Levantamiento de contexto: objetivos científicos, restricciones éticas, fuentes de datos geoespaciales',
      indicadores: 'Acta publicada (sí/no); nº partes interesadas; riesgos identificados',
      responsable: 'Comité SGIA',
      frecuencia: 'Anual',
      estado: 'Completado'
    },
    {
      id: 2,
      nombre: 'Liderazgo y compromiso',
      descripcion: 'Política SGIA, roles, recursos y liderazgo visible',
      implementacion: 'Política de IA responsable; roles asignados (Encargado SGIA, Dueño de Datos, Oficial Ético)',
      indicadores: 'Política firmada; % roles cubiertos; horas dedicadas',
      responsable: 'Líder académico',
      frecuencia: 'Semestral',
      estado: 'En progreso'
    },
    {
      id: 3,
      nombre: 'Planificación',
      descripcion: 'Gestión de riesgos y oportunidades; objetivos y métricas',
      implementacion: 'Matriz de riesgos MAGERIT/NIST; objetivos (accuracy≥95%, sesgo≤3%, uptime≥99%)',
      indicadores: '% riesgos con plan; cumplimiento objetivos trimestrales',
      responsable: 'Data Lead',
      frecuencia: 'Trimestral',
      estado: 'En progreso'
    },
    {
      id: 4,
      nombre: 'Soporte',
      descripcion: 'Competencias, formación, comunicación y control documental',
      implementacion: 'Plan de formación en ética de IA, privacidad, MLOps',
      indicadores: '% equipo formado; nº comunicaciones/mes; % documentos',
      responsable: 'PM',
      frecuencia: 'Mensual',
      estado: 'En progreso'
    },
    {
      id: 5,
      nombre: 'Operación',
      descripcion: 'Procesos de ciclo de vida de IA seguros y trazables',
      implementacion: 'Pipeline MLOps con controles de calidad, trazabilidad, explainability',
      indicadores: '% pipelines validados; drift detectado/resuelto',
      responsable: 'MLOps Lead',
      frecuencia: 'Continuo',
      estado: 'En progreso'
    },
    {
      id: 6,
      nombre: 'Evaluación del desempeño',
      descripcion: 'Mediciones, auditorías internas, análisis de incidentes',
      implementacion: 'Tablero SGIA con métricas; auditoría semestral; post-mortem',
      indicadores: '% KPIs verdes; hallazgos por auditoría',
      responsable: 'PMO / Auditor',
      frecuencia: 'Semestral',
      estado: 'Planificado'
    },
    {
      id: 7,
      nombre: 'Mejora continua',
      descripcion: 'Corrección de desviaciones y optimización del sistema',
      implementacion: 'CAPA; retro de sprint; actualización de controles',
      indicadores: '% acciones cerradas; tiempo medio de mejora',
      responsable: 'Comité SGIA',
      frecuencia: 'Mensual',
      estado: 'Planificado'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold">SGIA Dashboard</h1>
          <p className="text-blue-100 mt-1">Sistema de Gestión de Inteligencia Artificial - ISO/IEC 42001</p>
          <p className="text-sm text-blue-200 mt-1">Proyecto: Geotermia + CNN</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'requisitos', label: 'Requisitos ISO 42001', icon: FileText },
              { id: 'plan', label: 'Plan Implementación', icon: Clock },
              { id: 'raci', label: 'Matriz RACI', icon: Users },
              { id: 'politica', label: 'Política', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">KPIs Principales</h2>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Accuracy</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.accuracy}%</p>
                    <p className="text-xs text-green-600 mt-1">✓ Objetivo ≥95%</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sesgo</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.bias}%</p>
                    <p className="text-xs text-green-600 mt-1">✓ Objetivo ≤3%</p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Uptime</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.uptime}%</p>
                    <p className="text-xs text-green-600 mt-1">✓ Objetivo ≥99%</p>
                  </div>
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Incidentes / mes</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpis.incidents}</p>
                    <p className="text-xs text-gray-500 mt-1">MTTR & CAPA</p>
                  </div>
                  <AlertTriangle className="w-12 h-12 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Additional KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Riesgos con Plan</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpis.risksCovered}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${kpis.risksCovered}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Equipo Formado</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpis.trainedTeam}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${kpis.trainedTeam}%` }}></div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Cumplimiento Objetivos</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{kpis.objectives}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${kpis.objectives}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requisitos ISO 42001 Tab */}
        {activeTab === 'requisitos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Requisitos ISO/IEC 42001</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requisito</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Implementación</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicadores</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requisitos.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{req.nombre}</div>
                          <div className="text-sm text-gray-500">{req.descripcion}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{req.implementacion}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{req.indicadores}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{req.responsable}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            req.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                            req.estado === 'En progreso' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {req.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Plan de Implementación Tab */}
        {activeTab === 'plan' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Plan de Implementación</h2>
            <div className="space-y-4">
              {fases.map((fase, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{fase.fase}</h3>
                    <span className="text-sm text-gray-500">{fase.fecha}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Actividades</p>
                      <p className="text-sm text-gray-900 mt-1">{fase.actividades}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Entregables</p>
                      <p className="text-sm text-gray-900 mt-1">{fase.entregables}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-600 mb-1">Responsable: {fase.responsable}</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progreso</span>
                      <span className="text-sm font-medium text-gray-900">{fase.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${fase.progreso === 100 ? 'bg-green-600' : 'bg-blue-600'}`}
                        style={{ width: `${fase.progreso}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matriz RACI Tab */}
        {activeTab === 'raci' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Matriz RACI</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>R</strong> = Responsable | <strong>A</strong> = Aprobador | <strong>C</strong> = Consultado | <strong>I</strong> = Informado
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actividad</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">R</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">A</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">C</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">I</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {raci.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.actividad}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.R}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.A}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.C}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">{item.I}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Política Tab */}
        {activeTab === 'politica' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Política SGIA</h2>
            <div className="bg-white rounded-lg shadow p-8">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nos comprometemos a desarrollar y operar modelos de IA de forma ética, segura, explicable y conforme a la ley. 
                  Protegemos los datos geoespaciales, evaluamos y mitigamos riesgos (sesgo, privacidad, seguridad y seguridad del modelo), 
                  medimos desempeño y mejoramos continuamente. Asignamos roles y recursos, cumplimos con MinTIC y normas aplicables, 
                  y mantenemos evidencia de todas las decisiones del ciclo de vida de IA.
                </p>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Aprobada por:</strong> Dirección del proyecto<br />
                    <strong>Fecha de aprobación:</strong> Pendiente<br />
                    <strong>Revisión:</strong> Semestral<br />
                    <strong>Responsable:</strong> Líder académico / Dirección de programa
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Roles y Responsabilidades</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700"><strong>Encargado SGIA:</strong> Supervisión general del sistema</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700"><strong>Dueño de Datos:</strong> Gestión y calidad de datos</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700"><strong>Dueño del Modelo:</strong> Desarrollo y mantenimiento del modelo</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span className="text-gray-700"><strong>Oficial Ético:</strong> Evaluación ética y cumplimiento</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Dashboard SGIA - ISO/IEC 42001 | Proyecto Geotermia + CNN | Generado: {new Date().toLocaleDateString('es-ES')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
