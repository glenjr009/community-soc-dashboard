type HeaderProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export default function Header({ searchTerm, onSearchChange }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-slate-800/80 bg-slate-900/70 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500" />
        </span>
        <div>
          <p className="text-sm font-medium text-emerald-400">SYSTEM STATUS: ACTIVE MONITORING</p>
          <p className="text-xs text-slate-500">Threat intel refreshed every 30 seconds</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex items-center rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-sm text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span className="mr-2 text-cyan-400">⌕</span>
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-slate-600 sm:w-64"
            placeholder="Search community signals"
          />
        </label>

        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-semibold text-cyan-400">
            AL
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Alicia Lane</p>
            <p className="text-xs text-slate-500">SOC Analyst</p>
          </div>
        </div>
      </div>
    </header>
  )
}
