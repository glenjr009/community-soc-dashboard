type Severity = 'Critical' | 'High' | 'Medium'

type ThreatCardProps = {
  domain: string
  threatType: string
  severity: Severity
  safetyTip: string
}

const toneStyles: Record<Severity, string> = {
  Critical: 'border-red-500/40 shadow-[0_0_0_1px_rgba(248,113,113,0.15),0_0_30px_rgba(248,113,113,0.12)]',
  High: 'border-orange-500/40 shadow-[0_0_0_1px_rgba(249,115,22,0.15)]',
  Medium: 'border-cyan-500/40 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]',
}

const badgeStyles: Record<Severity, string> = {
  Critical: 'bg-red-500/15 text-red-300',
  High: 'bg-orange-500/15 text-orange-300',
  Medium: 'bg-cyan-500/15 text-cyan-300',
}

export default function ThreatCard({ domain, threatType, severity, safetyTip }: ThreatCardProps) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border bg-slate-900/80 p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.01] ${toneStyles[severity]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Observed Domain</p>
            <p className="mt-1 text-lg font-semibold text-slate-100">{domain}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[severity]}`}>
            {severity}
          </span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3">
          <p className="text-sm text-slate-400">Threat Type</p>
          <p className="mt-1 text-sm font-medium text-cyan-400">{threatType}</p>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-300">{safetyTip}</p>
      </div>
    </article>
  )
}
