type NavItem = {
  label: string
  key: 'threats' | 'analyzer'
  active?: boolean
}

const navItems: NavItem[] = [
  { label: 'Threat Feed', key: 'threats', active: true },
  { label: 'Cyber Hygiene / Analyzer', key: 'analyzer' },
]

type SidebarProps = {
  activeView: 'threats' | 'analyzer'
  onNavigate: (view: 'threats' | 'analyzer') => void
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-full border-b border-slate-800/80 bg-slate-900/60 px-5 py-6 backdrop-blur-md lg:w-64 lg:border-b-0 lg:border-r">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-cyan-400">Cyber-SOC</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-100">Community Watch</h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.key)}
            className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm transition ${
              activeView === item.key
                ? 'bg-cyan-500/10 text-emerald-400 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-cyan-400'
            }`}
          >
            <span className="mr-3 h-2 w-2 rounded-full bg-current" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live Queue</p>
        <p className="mt-2 text-sm text-slate-300">12 unresolved public alerts</p>
        <p className="mt-1 text-xs text-emerald-400">Priority triage in progress</p>
      </div>
    </aside>
  )
}
