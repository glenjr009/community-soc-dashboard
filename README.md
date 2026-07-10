# 🛡️ CommunitySOC AI --- Production-Grade AI Security Operations Center

::: {align="center"}
# 🚨 AI-Powered Community Security Operations Center

### Monitor • Analyze • Simulate • Protect

*A production-grade cybersecurity dashboard that combines live threat
intelligence, AI-powered phishing analysis, and interactive attack
simulation into a modern Security Operations Center (SOC) experience.*

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![Tailwind
CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Google
Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)
:::

------------------------------------------------------------------------

# 📖 Project Overview

CommunitySOC AI is a production-inspired Security Operations Center
(SOC) platform designed to demonstrate how modern cybersecurity
operations can be built using Artificial Intelligence, live threat
intelligence, and contemporary full-stack technologies.

The platform recreates the experience of working inside a real SOC by
combining live phishing intelligence, AI-powered threat analysis,
interactive attack simulation, and real-time security dashboards. Rather
than displaying static data, CommunitySOC AI provides an operational
environment where users can monitor phishing campaigns, analyze
suspicious emails or URLs using Google Gemini AI, and inject simulated
incidents to visualize how modern security teams monitor and respond to
threats.

The backend is built with FastAPI using asynchronous programming and
intelligent caching to efficiently retrieve and process live threat
intelligence from OpenPhish. The frontend is developed using React 19,
TypeScript, Vite, and Tailwind CSS to deliver a fast, responsive,
cyber-themed dashboard.

CommunitySOC AI demonstrates practical implementation of:

-   🌍 Live Threat Intelligence
-   🤖 AI-assisted Threat Analysis
-   ⚡ Interactive Threat Simulation
-   📊 Real-time Dashboard Analytics
-   🛡️ Secure API Design
-   🐳 Docker-based Deployment

Whether viewed by recruiters, students, developers, or cybersecurity
professionals, the project showcases production-ready engineering
practices and modern SOC workflows.

------------------------------------------------------------------------

# 👨‍💻 Developer

::: {align="center"}
## Glen Fernandes

### *aka **cyb3rPh03n1x***

**Cybersecurity Enthusiast • Full Stack Developer • Security Researcher
• CTF Player**

Building secure, scalable, and AI-powered cybersecurity applications
that bridge modern software engineering with practical security
operations.

**GitHub:** https://github.com/glenjr009

**LinkedIn:** https://www.linkedin.com/in/glen-ferns/
:::

------------------------------------------------------------------------

# ✨ Core Features

## 🌍 Live Threat Intelligence

-   Fetches phishing intelligence from OpenPhish
-   Asynchronous FastAPI backend
-   10-minute in-memory caching
-   Concurrent enrichment using asyncio
-   Dynamic dashboard updates

## 🤖 AI Threat Analyzer

Analyze suspicious: - URLs - Emails - SMS - Messages - Website links

Powered by **Google Gemini 2.5 Flash**, providing: - Risk Level - AI
Explanation - Phishing Indicators - Recommended Actions -
Citizen-friendly guidance

## 🎯 Threat Simulation Engine

Inject simulated incidents by choosing: - Sector - Attack Type -
Severity

Automatically updates: - Dashboard metrics - Threat cards - Severity
counters - Analytics

## 📊 Dashboard Analytics

-   Active Threats
-   Critical Alerts
-   High Severity Events
-   Sector Distribution
-   Threat Categories

------------------------------------------------------------------------

# 🏗️ Technology Stack

  Layer         Technology
  ------------- ------------------------------
  Frontend      React 19 + TypeScript + Vite
  Styling       Tailwind CSS
  Backend       FastAPI
  Validation    Pydantic
  AI            Google Gemini 2.5 Flash
  Runtime       Uvicorn
  Threat Feed   OpenPhish
  Deployment    Docker Compose

------------------------------------------------------------------------

# 🏛️ Architecture

``` text
React Frontend
      │
 REST API
      │
FastAPI Backend
   ├── OpenPhish Feed
   ├── Gemini AI
   └── Threat Simulator
```

------------------------------------------------------------------------

# 📂 Project Structure

``` text
community-soc-dashboard/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── .gitignore
```

------------------------------------------------------------------------

# 🚀 Installation

## Docker

``` bash
docker compose up --build
```

## Backend

``` bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

------------------------------------------------------------------------

# 🔐 Environment Variables

``` env
GEMINI_API_KEY=YOUR_API_KEY
```

Never commit secrets to Git.

------------------------------------------------------------------------

# ⚡ Performance Highlights

-   Async API processing
-   Intelligent caching
-   Fast React rendering
-   Responsive UI
-   Containerized deployment
-   Production-inspired architecture

------------------------------------------------------------------------

# 🚀 Roadmap

-   Authentication & RBAC
-   WebSocket live updates
-   IOC enrichment
-   PDF/CSV reporting
-   Multiple threat intelligence providers
-   Azure/AWS deployment
-   Mobile support

------------------------------------------------------------------------

# 📸 Screenshots

    assets/dashboard.png
    assets/analyzer.png
    assets/threat-feed.png
    assets/simulator.png

------------------------------------------------------------------------

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

``` bash
git checkout -b feature/new-feature
git commit -m "Add new feature"
git push origin feature/new-feature
```

------------------------------------------------------------------------

# 📄 License

Licensed under the MIT License.

------------------------------------------------------------------------

::: {align="center"}
## ⭐ Support

If you found this project useful, please consider giving it a **Star**
on GitHub.

### 🛡️ Developed with ❤️ by

# Glen Fernandes

### aka **cyb3rPh03n1x**

**Building secure digital communities through AI-powered
cybersecurity.**

GitHub: https://github.com/glenjr009/community-soc-dashboard
:::
