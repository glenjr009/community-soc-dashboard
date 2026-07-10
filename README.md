# Production-Grade, Live AI-Driven Community Security Operations Center Console

A premium full-stack cybersecurity portfolio project that transforms public cyber-safety awareness into an interactive, mission-style command experience. This application combines live threat intelligence, AI-powered analysis, and real-time simulation controls into a polished SOC dashboard designed for modern developers, security practitioners, and technical recruiters.

## Why this project stands out

This platform is more than a visual dashboard. It is a live operational workspace for:

- monitoring public-facing cyber threats in near real time
- analyzing suspicious text and links with AI assistance
- simulating attack scenarios to demonstrate live UI responsiveness and resilience
- presenting a professional, security-first interface that feels like a real command console

## Core capabilities

### Live Threat Intelligence Radar

The dashboard ingests public threat intelligence from OpenPhish and processes it through a FastAPI backend. Threat feed retrieval is optimized with a 10-minute in-memory cache on the server side, reducing unnecessary external requests while keeping the interface responsive. The feed assembly is performed asynchronously using Python's asyncio utilities, allowing multiple threat enrichment tasks to run concurrently.

### Proactive AI Text & Link Analyzer

Users can paste suspicious text, emails, or links into the analyzer workspace and receive a structured assessment from the Google Gemini AI engine. The application uses the Gemini 2.5 Flash model to translate complex phishing patterns into plain, citizen-friendly guidance that is clear, actionable, and easy to understand.

### Tactical Simulation Injector

The simulator widget gives the dashboard a real operational feel. Analysts can select a target sector, attack vector, and severity tier to inject synthetic threat events directly into the local feed. The dashboard immediately updates the metrics, threat card grid, and analytics surface so the experience feels live and dynamic.

## Architecture and modern tech stack

| Layer | Technology | Role |
| --- | --- | --- |
| Frontend | React 19 + TypeScript + Vite | High-performance dashboard shell and interactive UI |
| Styling | Tailwind CSS | Dark glassmorphism, neon cyber aesthetic, responsive layout |
| Backend | FastAPI + Pydantic + Uvicorn | REST API orchestration, request validation, async services |
| AI Engine | Google Gemini API | Threat and content analysis with plain-language safety guidance |
| Infrastructure | Docker Compose | Containerized full-stack deployment workflow |

## Project structure

```text
community-soc-dashboard/
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── .gitignore
```

## Local deployment options

### Option 1: Docker workflow

Use Docker Compose for the fastest full-stack startup experience.

```bash
docker compose up --build
```

This launches the backend and frontend in a coordinated container environment.

### Option 2: Bare-metal split terminal setup

#### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will typically run on the Vite dev server port, while the backend serves the FastAPI API on port 8000.

## Secure configuration note

> Important: Keep all secrets, API keys, and environment variables in local .env files and never commit them to source control. The repository includes a root .gitignore rule to prevent .env files from being tracked.

## Suggested next enhancements

- add live charting and timeline analytics
- connect to a broader threat feed provider
- add authentication and role-based analyst views
- deploy to a cloud platform such as Vercel or Azure

## Summary

This project represents a production-minded, security-centric dashboard that demonstrates strong full-stack engineering, resilient UI design, AI integration, and a polished portfolio-ready architecture.
