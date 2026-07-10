type ThreatStatus = 'New' | 'Investigating' | 'Mitigated' | 'False Positive'

type IncidentItem = {
  id: number
  domain: string
  threatType: string
  severity: 'Critical' | 'High' | 'Medium'
  status: ThreatStatus
  createdAt: string
}

type IncidentQueueProps = {
  incidents: IncidentItem[]
  onStatusChange: (id: number, status: ThreatStatus) => void
}

const statusOptions: ThreatStatus[] = ['New', 'Investigating', 'Mitigated', 'False Positive']

const statusStyles: Record<ThreatStatus, string> = {
  New: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
  Investigating: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
  Mitigated: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
  'False Positive': 'border-slate-500/30 bg-slate-500/10 text-slate-200',
}

export default function IncidentQueue({ incidents, onStatusChange }: IncidentQueueProps) {
  const latestIncidents = [...incidents]
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    .slice(0, 6)

  return (
    <section className="mb-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Incident Triage Queue</p>
          <p className="mt-1 text-sm text-slate-400">Move incidents through the analyst workflow and keep the response board current.</p>
        </div>
        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
          {incidents.length} active
        </span>
      </div>

      <div className="space-y-2">
        {latestIncidents.map((incident) => (
          <div key={incident.id} className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/70 p-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-slate-100">{incident.domain}</p>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">{incident.severity}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{incident.threatType}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[incident.status]}`}>
                {incident.status}
              </span>
              <select
                value={incident.status}
                onChange={(event) => onStatusChange(incident.id, event.target.value as ThreatStatus)}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1.5 text-sm text-slate-200 outline-none"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
