import { useState } from 'react'

import { requestJson } from '../lib/api'

type AnalysisResult = {
  verdict: string
  confidence: string
  detailedAnalysis: string
}

const verdictStyles: Record<string, string> = {
  Safe: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  Suspicious: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  Scam: 'border-rose-500/40 bg-rose-500/10 text-rose-300',
}

export default function LinkAnalyzer() {
  const [content, setContent] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!content.trim()) {
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const data = await requestJson<AnalysisResult>('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      setResult(data)
    } catch (error) {
      console.error('Unable to analyze content:', error)
      setResult({
        verdict: 'Suspicious',
        confidence: 'Medium',
        detailedAnalysis: 'The scanner could not reach the analysis service. Treat the content as risky until verified through a trusted source.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="space-y-4 p-5 md:p-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Cyber Hygiene / Analyzer</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-100">Paste a suspicious link or message</h3>
        <p className="mt-2 text-sm text-slate-400">The scanner can help assess suspicious SMS messages, emails, or links in plain language.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={8}
          placeholder="Paste a suspicious URL, SMS, or email text here..."
          className="w-full rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-600"
        />

        <button
          onClick={handleScan}
          disabled={loading}
          className="mt-4 inline-flex items-center rounded-xl bg-cyan-500/15 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
              Scanning...
            </span>
          ) : (
            'Scan Content'
          )}
        </button>
      </div>

      {result && (
        <div className={`rounded-2xl border p-4 ${verdictStyles[result.verdict] || 'border-slate-800 bg-slate-900/70 text-slate-300'}`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em]">AI Verdict</p>
              <p className="text-xl font-semibold">{result.verdict}</p>
            </div>
            <span className="rounded-full border border-current px-3 py-1 text-sm">{result.confidence}</span>
          </div>
          <p className="mt-4 text-sm leading-7">{result.detailedAnalysis}</p>
        </div>
      )}
    </section>
  )
}
