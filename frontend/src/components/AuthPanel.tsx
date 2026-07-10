import { useState } from 'react'

type UserProfile = {
  name: string
  role: 'Analyst' | 'Administrator'
}

type AuthPanelProps = {
  onAuthenticate: (profile: UserProfile) => void
}

const demoAccounts = [
  { name: 'Alicia Lane', role: 'Analyst' as const, username: 'analyst', password: 'analyst123' },
  { name: 'Maya Ortiz', role: 'Administrator' as const, username: 'admin', password: 'admin123' },
]

export default function AuthPanel({ onAuthenticate }: AuthPanelProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const account = demoAccounts.find(
      (candidate) => candidate.username === username.trim().toLowerCase() && candidate.password === password,
    )

    if (!account) {
      setError('Use analyst / analyst123 or admin / admin123 for the demo access.')
      return
    }

    onAuthenticate({ name: account.name, role: account.role })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a)] px-4 py-10 text-slate-100">
      <div className="w-full max-w-lg rounded-[28px] border border-slate-800/80 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(6,182,212,0.12)] backdrop-blur-md">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Secure Analyst Access</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-100">Enter the SOC workspace</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          This lightweight authentication layer simulates analyst access and keeps your incident board and threat feed persistent between sessions.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Username</span>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none"
              placeholder="analyst or admin"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm text-slate-400">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2.5 text-sm text-slate-100 outline-none"
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="text-sm text-rose-300">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-xl border border-cyan-500/30 bg-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/25"
          >
            Authenticate to Dashboard
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-sm text-slate-400">
          <p className="font-medium text-slate-200">Demo credentials</p>
          <p className="mt-2">Analyst — analyst / analyst123</p>
          <p>Administrator — admin / admin123</p>
        </div>
      </div>
    </div>
  )
}
