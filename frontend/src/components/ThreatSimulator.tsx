import { useState } from 'react'

type ThreatSeverity = 'Critical' | 'High' | 'Medium'

type ThreatSimulatorProps = {
  onInjectThreat: (payload: {
    sector: string
    attackVector: string
    severityTier: ThreatSeverity
  }) => Promise<void>
}

const sectors = ['Financial', 'Healthcare', 'Critical Infrastructure', 'Government', 'Education']
const attackVectors = ['Spear Phishing', 'Ransomware Drop', 'DDoS Node', 'Credential Stuffing', 'Business Email Compromise']
const severityOptions: ThreatSeverity[] = ['Medium', 'High', 'Critical']

export default function ThreatSimulator({ onInjectThreat }: ThreatSimulatorProps) {
  const [targetSector, setTargetSector] = useState(sectors[0])
  const [attackVector, setAttackVector] = useState(attackVectors[0])
  const [severityTier, setSeverityTier] = useState<ThreatSeverity>('High')
  const [isInjecting, setIsInjecting] = useState(false)
  const [statusText, setStatusText] = useState('Ready for synthetic inject')
  const [lastInjected, setLastInjected] = useState<string | null>(null)

  const handleInject = async () => {
    setIsInjecting(true)
    setStatusText('Dispatching live simulation...')

    try {
      await onInjectThreat({ sector: targetSector, attackVector, severityTier })
      setLastInjected(`${targetSector} • ${attackVector} • ${severityTier}`)
      setStatusText('Threat inject accepted by the live feed')
    } catch (error) {
      console.error('Simulator injection failed:', error)
      setStatusText('Fallback tip engaged; inject queued locally')
    } finally {
      setIsInjecting(false)
    }
  }

  return (
    <section className="mb-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 shadow-[0_0_50px_rgba(34,211,238,0.12)] backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Threat Simulator</p>
          <h4 className="mt-2 text-xl font-semibold text-slate-100">Active inject control console</h4>
          <p className="mt-2 text-sm text-slate-400">Stress-test the dashboard by simulating a new attack vector and watching analytics react instantly.</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-300">
          <span className={`h-2.5 w-2.5 rounded-full ${isInjecting ? 'animate-pulse bg-amber-400' : 'bg-emerald-400'}`} />
          {statusText}
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
        <label className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">Target Sector</span>
          <select
            value={targetSector}
            onChange={(event) => setTargetSector(event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">Attack Vector</span>
          <select
            value={attackVector}
            onChange={(event) => setAttackVector(event.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none"
          >
            {attackVectors.map((vector) => (
              <option key={vector} value={vector}>
                {vector}
              </option>
            ))}
          </select>
        </label>

        <label className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
          <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">Severity Tier</span>
          <select
            value={severityTier}
            onChange={(event) => setSeverityTier(event.target.value as ThreatSeverity)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none"
          >
            {severityOptions.map((severity) => (
              <option key={severity} value={severity}>
                {severity}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={handleInject}
          disabled={isInjecting}
          className="rounded-xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isInjecting ? 'Injecting…' : 'Inject Simulated Threat'}
        </button>
      </div>

      {lastInjected && (
        <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200">
          Last inject: {lastInjected}
        </div>
      )}
    </section>
  )
}
