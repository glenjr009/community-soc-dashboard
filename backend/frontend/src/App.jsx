import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [threats, setThreats] = useState([]);
  const [summary, setSummary] = useState(null);
  const [domain, setDomain] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [threatsRes, summaryRes] = await Promise.all([
          axios.get('http://localhost:8000/api/threats'),
          axios.get('http://localhost:8000/api/summary'),
        ]);
        setThreats(threatsRes.data.threats);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error(error);
        setFeedback('The dashboard could not reach the backend yet.');
      }
    };

    loadData();
  }, []);

  const handleCheck = async (event) => {
    event.preventDefault();

    if (!domain.trim()) {
      setFeedback('Enter a website address to check it.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/check-domain', { domain });
      setAnalysis(response.data);
      setFeedback('');
    } catch (error) {
      console.error(error);
      setFeedback('Checking failed. Please try again.');
    }
  };

  return (
    <div className="dashboard-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">Community digital safety</p>
          <h1>Protect neighbors from phishing and scam websites.</h1>
          <p className="hero-copy">
            This dashboard highlights suspicious domains affecting the public and gives residents a quick way to verify a link before they click.
          </p>
        </div>
        <div className="hero-badge">Public issue: phishing</div>
      </header>

      <section className="stats-grid">
        <article className="stat-card">
          <h2>Active alerts</h2>
          <p className="stat-value">{summary?.total_threats ?? 0}</p>
        </article>
        <article className="stat-card">
          <h2>Critical risk</h2>
          <p className="stat-value critical">{summary?.critical ?? 0}</p>
        </article>
        <article className="stat-card">
          <h2>High risk</h2>
          <p className="stat-value high">{summary?.high ?? 0}</p>
        </article>
      </section>

      <section className="content-grid">
        <div className="panel">
          <h2>Current scam alerts</h2>
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
          <h2>Check a suspicious site</h2>
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

          <div className="tips-box">
            <h3>Public safety tips</h3>
            <ul>
              <li>Never share passwords or one-time codes from a message.</li>
              <li>Check the full web address before you log in.</li>
              <li>Contact your bank or local authority using official channels.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;