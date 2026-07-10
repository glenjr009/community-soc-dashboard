import { useEffect, useMemo, useState } from 'react'

import AuthPanel from './components/AuthPanel'
import Header from './components/Header'
import IncidentQueue from './components/IncidentQueue'
import LinkAnalyzer from './components/LinkAnalyzer'
import Sidebar from './components/Sidebar'
import ThreatCard from './components/ThreatCard'
import ThreatSimulator from './components/ThreatSimulator'
import { requestJson } from './lib/api'

type Threat = {
  id: number
  domain: string
  threatType: string
  severity: 'Critical' | 'High' | 'Medium'
  safetyTip: string
}

type SeverityFilter = 'All' | 'Critical' | 'High' | 'Medium'
type ThreatStatus = 'New' | 'Investigating' | 'Mitigated' | 'False Positive'

type Incident = {
  id: number
  domain: string
  threatType: string
  severity: 'Critical' | 'High' | 'Medium'
  status: ThreatStatus
  createdAt: string
}

export default function App() {
  const [threats, setThreats] = useState<Threat[]>([])
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<'threats' | 'analyzer'>('threats')
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem('community-soc-auth') === 'true'
  })
  const [userProfile, setUserProfile] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const fetchThreats = async () => {
      try {
        const data = await requestJson<Threat[]>('/api/threats')
        setThreats(data)
      } catch (error) {
        console.error('Unable to load threats from the backend:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchIncidents = async () => {
      try {
        const data = await requestJson<Incident[]>('/api/incidents')
        setIncidents(data)
      } catch (error) {
        console.error('Unable to load incidents from the backend:', error)
      }
    }

    if (isAuthenticated) {
      void fetchThreats()
      void fetchIncidents()
    }
  }, [isAuthenticated])

  const filteredThreats = useMemo(() => {
    return threats.filter((threat) => {
      const matchesSeverity = severityFilter === 'All' || threat.severity === severityFilter
      const lowerSearch = searchTerm.toLowerCase()
      const matchesSearch =
        threat.domain.toLowerCase().includes(lowerSearch) ||
        threat.threatType.toLowerCase().includes(lowerSearch) ||
        threat.safetyTip.toLowerCase().includes(lowerSearch)

      return matchesSeverity && matchesSearch
    })
  }, [threats, severityFilter, searchTerm])

  const criticalCount = threats.filter((threat) => threat.severity === 'Critical').length
  const highCount = threats.filter((threat) => threat.severity === 'High').length

  const handleStatusChange = async (id: number, status: ThreatStatus) => {
    try {
      const updatedIncident = await requestJson<Incident>(`/api/incidents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) => (incident.id === id ? updatedIncident : incident)),
      )
    } catch (error) {
      console.error('Unable to update incident status:', error)
    }
  }

  const handleAuthenticate = (profile: { name: string; role: string }) => {
    setUserProfile(profile)
    setIsAuthenticated(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('community-soc-auth', 'true')
    }
  }

  const handleInjectThreat = async ({ sector, attackVector, severityTier }: { sector: string; attackVector: string; severityTier: 'Critical' | 'High' | 'Medium' }) => {
    const candidateDomain = `${attackVector.toLowerCase().replace(/\s+/g, '-')}.${sector.toLowerCase().replace(/\s+/g, '-')}.sim`
    const prompt = `Simulate a ${severityTier.toLowerCase()} cyber incident for the ${sector} sector using ${attackVector.toLowerCase()} as the attack vector. Describe the immediate containment steps and why the event should be escalated.`

    let safetyTip = `Synthetic ${severityTier.toLowerCase()} inject targeting ${sector.toLowerCase()} via ${attackVector.toLowerCase()}. Contain the event, isolate affected endpoints, and notify response teams immediately.`

    try {
      const analysis = await requestJson<{ detailedAnalysis?: string; verdict?: string }>('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: prompt }),
      })

      if (analysis.detailedAnalysis) {
        safetyTip = `${analysis.verdict ?? severityTier} response: ${analysis.detailedAnalysis}`
      }
    } catch (error) {
      console.error('Unable to fetch dynamic simulator safety tip:', error)
    }

    const generatedThreat: Threat = {
      id: Date.now(),
      domain: candidateDomain,
      threatType: `${attackVector} • ${sector}`,
      severity: severityTier,
      safetyTip,
    }

    try {
      const createdIncident = await requestJson<Incident>('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: candidateDomain,
          threatType: `${attackVector} • ${sector}`,
          severity: severityTier,
          status: 'New',
        }),
      })

      setIncidents((currentIncidents) => [createdIncident, ...currentIncidents])
    } catch (error) {
      console.error('Unable to persist incident:', error)
    }

    setThreats((currentThreats) => [generatedThreat, ...currentThreats])
  }

  if (!isAuthenticated) {
    return <AuthPanel onAuthenticate={handleAuthenticate} />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a)] text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="lg:w-64">
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
        </div>

        <main className="flex-1 p-3 md:p-4 lg:p-5">
          <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/60 p-2 shadow-[0_0_80px_rgba(6,182,212,0.12)] backdrop-blur-md md:p-3">
            <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            {userProfile ? (
              <div className="border-b border-slate-800/80 bg-slate-900/70 px-5 py-3 text-sm text-slate-400">
                Signed in as <span className="font-semibold text-cyan-300">{userProfile.name}</span> · <span className="text-emerald-300">{userProfile.role}</span>
              </div>
            ) : null}

            {activeView === 'analyzer' ? (
              <LinkAnalyzer />
            ) : (
              <section className="p-3 md:p-4">
                <div className="mb-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Threat Overview</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-100">Live community threat radar</h3>
                      <p className="mt-2 text-sm text-slate-400">Real-time public phishing and scam signals, filtered by severity and domain.</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(['All', 'Critical', 'High', 'Medium'] as SeverityFilter[]).map((filter) => (
                        <button
                          key={filter}
                          onClick={() => setSeverityFilter(filter)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            severityFilter === filter
                              ? 'border-cyan-400/70 bg-cyan-500/15 text-cyan-300'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-300'
                          }`}
                        >
                          {filter === 'All' ? 'All Threats' : filter === 'Critical' ? 'Critical Only' : filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <ThreatSimulator onInjectThreat={handleInjectThreat} />

                <div className="mb-4 grid gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="text-sm text-slate-400">Total Alerts Monitored</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-100">{threats.length}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="text-sm text-slate-400">Critical Vector Count</p>
                    <p className="mt-2 text-3xl font-semibold text-rose-300">{criticalCount}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="text-sm text-slate-400">High Severity Events</p>
                    <p className="mt-2 text-3xl font-semibold text-amber-300">{highCount}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                      </span>
                      <p className="text-sm text-slate-400">Active Threat Feed Status</p>
                    </div>
                    <p className="mt-2 text-lg font-semibold text-emerald-300">Live radar engaged</p>
                  </div>
                </div>

                <IncidentQueue incidents={incidents} onStatusChange={handleStatusChange} />

                {loading ? (
                  <div className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 text-sm text-slate-400">Loading threat intelligence...</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredThreats.map((threat) => (
                      <ThreatCard key={threat.id} {...threat} />
                    ))}
                  </div>
                )}
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
