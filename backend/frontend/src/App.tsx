import { useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import './App.css';

type Threat = {
  id: number;
  domain: string;
  type: string;
  risk: string;
  description: string;
  action: string;
  last_seen: string;
};

type Summary = {
  total_threats: number;
  critical: number;
  high: number;
  public_tip: string;
};

type Analysis = {
  domain: string;
  risk: string;
  score: number;
  reasons: string[];
  guidance: string;
};

const fallbackThreats: Threat[] = [
  {
    id: 1,
    domain: 'bank-secure-login.com',
    type: 'Phishing',
    risk: 'Critical',
    description: 'Spoofed bank login page used to harvest credentials.',
    action: 'Do not enter passwords or MFA codes.',
    last_seen: '10 min ago',
  },
  {
    id: 2,
    domain: 'free-gift-rewards.net',
    type: 'Scam',
    risk: 'High',
    description: 'Fake reward page targeting residents with prize bait.',
    action: 'Ignore this message and report the link.',
    last_seen: '25 min ago',
  },
];

const fallbackSummary: Summary = {
  total_threats: fallbackThreats.length,
  critical: 1,
  high: 1,
  public_tip: 'Urgent requests for passwords or payment details are a major red flag.',
};

const workflowSteps = [
  { label: 'Fresh intel', value: '12 new' },
  { label: 'Triage queue', value: '4 pending' },
  { label: 'Escalations', value: '2 urgent' },
];

const incidentCards = [
  { title: 'Credential phishing', severity: 'Critical', owner: 'Analyst-1' },
  { title: 'SMS spoofing campaign', severity: 'High', owner: 'Analyst-2' },
  { title: 'Suspicious login burst', severity: 'Medium', owner: 'Analyst-3' },
];

const enrichmentItems = [
  'WHOIS context',
  'Threat intel match',
  'Related domains',
  'Campaign history',
];

const guidanceTips = [
  'Never share passwords, MFA codes, or payment details from a message.',
  'Verify a link by hovering over it and checking the full domain.',
  'Report suspicious messages to your local cyber safety team or service provider.',
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [domain, setDomain] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [message, setMessage] = useState('');
  const [messageAnalysis, setMessageAnalysis] = useState<Analysis | null>(null);
  const [feedback, setFeedback] = useState('');
  const [messageFeedback, setMessageFeedback] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [threatsRes, summaryRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/threats`),
          axios.get(`${API_BASE_URL}/api/summary`),
        ]);
        setThreats(threatsRes.data.threats);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error(error);
        setThreats(fallbackThreats);
        setSummary(fallbackSummary);
        setFeedback('The dashboard is running in demo mode while the API is unavailable.');
      }
    };

    loadData();
  }, []);

  const handleCheck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!domain.trim()) {
      setFeedback('Enter a website address to check it.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/check-domain`, { domain });
      setAnalysis(response.data);
      setFeedback('');
    } catch (error) {
      console.error(error);
      setFeedback('Checking failed. Please try again.');
    }
  };

  const handleMessageCheck = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim()) {
      setMessageFeedback('Paste a suspicious SMS or email body to scan it.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/check-message`, { message });
      setMessageAnalysis(response.data);
      setMessageFeedback('');
    } catch (error) {
      console.error(error);
      setMessageFeedback('The scanner could not analyze the message.');
    }
  };

  return (
    <div className="dashboard-shell">
      <header className="hero-card">
        <div className="hero-main">
          <div className="hero-badge">SOC / Community Watch</div>
          <h1>Community SOC Command Center</h1>
          <p className="hero-copy">
            Monitor live phishing activity, triage suspicious domains and messages, and help residents stay safe with analyst-grade insights.
          </p>
          <div className="hero-actions">
            <span className="hero-pill">Live threat feed</span>
            <span className="hero-pill">Public protection</span>
            <span className="hero-pill">Rapid triage</span>
          </div>
        </div>

        <div className="hero-panel">
          <p className="hero-panel-title">Today at a glance</p>
          <div className="hero-panel-grid">
            <div>
              <strong>{summary?.total_threats ?? 0}</strong>
              <span>active alerts</span>
            </div>
            <div>
              <strong>{summary?.critical ?? 0}</strong>
              <span>critical</span>
            </div>
            <div>
              <strong>{summary?.high ?? 0}</strong>
              <span>high risk</span>
            </div>
          </div>
        </div>
      </header>

      <section className="metrics-grid">
        <article className="stat-card">
          <p className="stat-label">Threat activity</p>
          <p className="stat-value">{summary?.total_threats ?? 0}</p>
          <p className="stat-foot">live indicators under review</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">Critical cases</p>
          <p className="stat-value critical">{summary?.critical ?? 0}</p>
          <p className="stat-foot">immediate attention needed</p>
        </article>
        <article className="stat-card">
          <p className="stat-label">High risk signals</p>
          <p className="stat-value high">{summary?.high ?? 0}</p>
          <p className="stat-foot">public safety escalations</p>
        </article>
      </section>

      <section className="workspace-grid">
        <div className="main-stack">
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Operations</p>
                <h2>Threat intelligence feed</h2>
              </div>
              <span className="live-pill">LIVE</span>
            </div>

            <div className="alert-list">
              {threats.map((threat) => (
                <article key={threat.id} className="alert-card">
                  <div className="alert-topline">
                    <strong>{threat.domain}</strong>
                    <span className={`risk-pill ${threat.risk.toLowerCase()}`}>{threat.risk}</span>
                  </div>
                  <p>{threat.description}</p>
                  <div className="alert-meta">
                    <span>{threat.type}</span>
                    <span>Seen {threat.last_seen}</span>
                  </div>
                  <p className="action-text">{threat.action}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Workflow</p>
                <h2>Analyst queue</h2>
              </div>
            </div>
            <div className="workflow-grid">
              {workflowSteps.map((step) => (
                <div key={step.label} className="workflow-card">
                  <span>{step.label}</span>
                  <strong>{step.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Caseboard</p>
                <h2>Active incidents</h2>
              </div>
            </div>
            <div className="incident-list">
              {incidentCards.map((incident) => (
                <div key={incident.title} className="incident-card">
                  <div>
                    <strong>{incident.title}</strong>
                    <p>{incident.owner}</p>
                  </div>
                  <span className={`severity-badge ${incident.severity.toLowerCase()}`}>{incident.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Triage</p>
                <h2>Quick response tools</h2>
              </div>
            </div>

            <div className="tool-card">
              <h3>Domain inspection</h3>
              <form onSubmit={handleCheck} className="check-form">
                <input
                  type="text"
                  placeholder="Enter a domain or link"
                  value={domain}
                  onChange={(event) => setDomain(event.target.value)}
                />
                <button type="submit">Analyze</button>
              </form>

              {feedback ? <p className="feedback">{feedback}</p> : null}

              {analysis ? (
                <div className={`analysis-card ${analysis.risk.toLowerCase()}`}>
                  <div className="analysis-head">
                    <strong>{analysis.domain}</strong>
                    <span>{analysis.risk}</span>
                  </div>
                  <p>Signal score: {analysis.score}</p>
                  <ul>
                    {analysis.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  <p className="guidance">{analysis.guidance}</p>
                </div>
              ) : null}
            </div>

            <div className="tool-card">
              <h3>Message scanner</h3>
              <form onSubmit={handleMessageCheck} className="check-form message-form">
                <textarea
                  rows={5}
                  placeholder="Paste a suspicious SMS, email, or chat message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Scan message</button>
              </form>

              {messageFeedback ? <p className="feedback">{messageFeedback}</p> : null}

              {messageAnalysis ? (
                <div className={`analysis-card ${messageAnalysis.risk.toLowerCase()}`}>
                  <div className="analysis-head">
                    <strong>Message scan</strong>
                    <span>{messageAnalysis.risk}</span>
                  </div>
                  <p>Signal score: {messageAnalysis.score}</p>
                  <ul>
                    {messageAnalysis.reasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                  <p className="guidance">{messageAnalysis.guidance}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Enrichment</p>
                <h2>Threat context</h2>
              </div>
            </div>
            <div className="enrichment-list">
              {enrichmentItems.map((item) => (
                <div key={item} className="enrichment-item">{item}</div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow small">Guidance</p>
                <h2>Community safety playbook</h2>
              </div>
            </div>
            <ul className="tips-list">
              {guidanceTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;