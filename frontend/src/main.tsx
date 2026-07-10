import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">Community SOC Dashboard</p>
        <h1 className="text-4xl font-semibold">Real-time cyber safety for the public.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          A clean, modular starting point for phishing intelligence, scam alerts, and analyst-friendly insights.
        </p>
      </div>
    </main>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
