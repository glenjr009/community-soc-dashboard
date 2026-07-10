# 🛡️ Community SOC AI

## 🚀 Production-Grade AI Security Operations Center

> **Monitor • Analyze • Simulate • Protect**

*A modern, AI-powered cybersecurity dashboard that combines live threat intelligence, artificial intelligence, and interactive incident simulation into a production-inspired Security Operations Center (SOC) experience.*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

---

# 📚 Table of Contents

- 📖 Project Overview
- 🚀 Why CommunitySOC AI?
- ✨ Core Features
- 🛠️ Technology Stack
- 🏗️ Architecture
- 📂 Project Structure
- 🚀 Local Setup
- 🔐 Environment Variables
- 🛣️ Roadmap
- 🤝 Contributing
- 👨‍💻 About the Developer
- 📄 License

---

# 📖 Project Overview

CommunitySOC AI is a production-inspired Security Operations Center (SOC) platform that brings together live phishing intelligence, AI-assisted content analysis, and real-time incident simulation into a single command-console experience.

Built using **React**, **FastAPI**, **Google Gemini AI**, and **Docker**, the platform demonstrates modern cybersecurity engineering concepts such as asynchronous backend processing, responsive frontend design, AI integration, intelligent caching, and containerized deployment.

It serves as both an educational platform and a portfolio-ready project that simulates the workflow of a real Security Operations Center.

Current workflow enhancements include:

- Live threat radar with severity-based filtering and search
- Interactive threat simulator for injecting synthetic incidents into the live feed
- AI-assisted safety guidance generated during simulation events
- Incident triage queue for tracking investigation states such as New, Investigating, Mitigated, and False Positive
- Expanded analytics cards for monitored alerts, critical events, and high-severity activity
- Lightweight analyst authentication flow with local session persistence for a more realistic SOC experience
- In-memory incident triage and status updates backed by the FastAPI service layer

---

# 🚀 Why CommunitySOC AI?

Modern cyber threats evolve every minute, yet many educational dashboards rely on static datasets and mock interfaces.

CommunitySOC AI bridges this gap by combining live threat intelligence, AI-powered security analysis, and interactive threat simulation into a realistic SOC environment.

The platform demonstrates how Artificial Intelligence, modern full-stack development, and cybersecurity workflows can be integrated into a production-ready application suitable for students, recruiters, and security professionals.

---

# ✨ Core Features

## 🌍 Live Threat Intelligence Radar

- Fetches phishing intelligence from OpenPhish
- Intelligent in-memory caching
- Concurrent enrichment using Python async processing
- Live dashboard updates

---

## 🤖 AI-Powered Threat Analyzer

Analyze:

- URLs
- Emails
- SMS
- Messages
- Website links

Powered by **Google Gemini 2.5 Flash** to provide:

- Risk Level
- AI Explanation
- Phishing Indicators
- Recommended Actions
- Human-friendly guidance

---

## 🎯 Tactical Threat Simulation Engine

- Simulate attack scenarios
- Configure target sector
- Choose attack vector
- Select severity level
- Watch dashboard metrics update in real time

---

## 📝 Incident Triage Workflow

Manage investigations through a realistic analyst workflow:

- New
- Investigating
- Mitigated
- False Positive

---

# 🆕 Recent Enhancements

| Feature | Description |
|---------|-------------|
| 🌍 Live Threat Intelligence | Retrieves phishing indicators from OpenPhish with intelligent caching. |
| 🤖 AI Threat Analyzer | Uses Google Gemini AI to explain suspicious content. |
| 🎯 Threat Simulation | Injects synthetic incidents into the dashboard. |
| 📊 Analytics Dashboard | Displays live metrics and severity trends. |
| 📝 Incident Triage | Supports analyst-style investigation workflows. |

---

# 🛠️ Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Validation | Pydantic |
| AI | Google Gemini 2.5 Flash |
| Runtime | Uvicorn |
| Threat Feed | OpenPhish |
| Deployment | Docker Compose |

---

# 🏗️ Architecture

```text
                ┌──────────────────────────────┐
                │      React Frontend          │
                │ Dashboard • Analytics • UI   │
                └──────────────┬───────────────┘
                               │
                           REST API
                               │
                               ▼
                ┌──────────────────────────────┐
                │      FastAPI Backend         │
                └───────┬─────────┬────────────┘
                        │         │
                        ▼         ▼
                OpenPhish      Gemini AI
                        │
                        ▼
             Threat Processing Engine
                        │
                        ▼
           Live Dashboard & Simulation
```

---

# 📂 Project Structure

```text
community-soc-dashboard/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🚀 Local Setup

## 🐳 Docker

```bash
docker compose up --build
```

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Environment Variables

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Keep secrets local and never commit them to source control.

---

# 🛣️ Roadmap

- [ ] WebSocket live updates
- [ ] IOC enrichment
- [ ] Authentication & RBAC
- [ ] Threat timeline visualization
- [ ] PDF incident reports
- [ ] Cloud deployment

---

# 🤝 Contributing

Contributions, feature ideas, and issue reports are welcome.

Fork the repository, create a feature branch, and submit a pull request.

---

# 👨‍💻 About the Developer

## Glen Fernandes *(aka **cyb3rPh03n1x**)*

**Cybersecurity Enthusiast • Full Stack Developer • CTF Player**

I enjoy building AI-powered security tools, experimenting with modern web technologies, and participating in cybersecurity competitions. My goal is to bridge cybersecurity research with practical software engineering through impactful, production-inspired applications.

- 💻 GitHub: https://github.com/glenjr009
- 💼 LinkedIn: https://www.linkedin.com/in/glen-ferns/

---

# 📄 License

Licensed under the **MIT License**.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

> **Building safer digital communities through AI-powered cybersecurity.**
