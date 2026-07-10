# 🛡️ CommunitySOC AI

## Production-Grade AI Security Operations Center

Monitor • Analyze • Simulate • Protect

A modern, full-stack cybersecurity dashboard designed to demonstrate how AI, live threat intelligence, and interactive simulation workflows can be combined into a polished Security Operations Center experience.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

---

## Project Overview

CommunitySOC AI is a production-inspired SOC platform that brings together live phishing intelligence, AI-assisted content analysis, and real-time incident simulation in a single command-console experience. It is built to showcase practical engineering decisions in cybersecurity software development, including asynchronous backend processing, responsive UI state management, AI integration, and containerized deployment.

### What the platform does

- Monitors public threat signals from OpenPhish in near real time
- Analyzes suspicious URLs, messages, and text with Google Gemini AI
- Simulates attack scenarios directly from the dashboard
- Supports incident triage and status tracking for analyst workflows
- Presents a tactical, dark-glass cyber interface suitable for portfolio and demo use

---

## Recent Enhancements

This release adds several professional-grade capabilities:

- Live threat radar with severity-based filtering and search
- Interactive threat simulator for injecting synthetic incidents into the live feed
- AI-assisted safety guidance generated during simulation events
- Incident triage queue for tracking investigation states such as New, Investigating, Mitigated, and False Positive
- Expanded analytics cards for monitored alerts, critical events, and high-severity activity

---

## Core Features

### Live Threat Intelligence Radar

- Fetches phishing intelligence from OpenPhish
- Uses an in-memory cache to reduce excessive external requests
- Processes enrichment asynchronously with Python concurrency tools
- Updates the dashboard in a responsive, analyst-friendly experience

### AI Threat Analyzer

Users can submit suspicious links, emails, SMS content, or plain text and receive clear, practical guidance from Google Gemini AI. The analyzer is designed to translate complex threat signals into understandable, action-oriented recommendations.

### Threat Simulation Engine

The simulator lets users configure a target sector, attack vector, and severity tier to inject synthetic incidents into the live dashboard. This makes the platform feel operational and demonstrates real-time UI reactivity under simulated pressure.

### Incident Triage Workflow

The new triage queue provides a lightweight case-management workflow so simulated or observed threats can be moved through a realistic analyst lifecycle.

---

## Technology Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19 + TypeScript + Vite |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| Validation | Pydantic |
| AI | Google Gemini 2.5 Flash |
| Runtime | Uvicorn |
| Threat Feed | OpenPhish |
| Deployment | Docker Compose |

---

## Architecture

```text
React Frontend
   │
   ▼
REST API
   │
   ▼
FastAPI Backend
├── OpenPhish Feed
├── Gemini AI Engine
├── Threat Simulator
└── Incident Triage Workflow
```

---

## Project Structure

```text
community-soc-dashboard/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## Local Setup

### Docker workflow

```bash
docker compose up --build
```

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Keep secrets local and never commit them to source control.

---

## Contributing

Contributions, feature ideas, and issue reports are welcome. If you would like to contribute, please open a pull request or share a detailed proposal.

---

## License

This project is licensed under the MIT License.

------------------------------------------------------------------------


## ⭐ Support

If you found this project useful, please consider giving it a **Star**
on GitHub.

### 🛡️ Developed with ❤️ by

# Glen Fernandes

### aka **cyb3rPh03n1x**

**Building secure digital communities through AI-powered
cybersecurity.**

GitHub: https://github.com/glenjr009/community-soc-dashboard

