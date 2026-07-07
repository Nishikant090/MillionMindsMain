# Million Minds AI Platform

An enterprise-grade, premium EdTech, Skill Development, Innovation, and Startup Incubation ecosystem. This platform is designed to connect students, academic institutions, and corporate recruiters through AI-driven tools.

The codebase is split into a **Next.js 16 (App Router) Frontend** and a **Python FastAPI Backend** to support modularity and easy service expansion.

---

## 📂 Project Architecture

```text
├── frontend/                   # Next.js 16 Web Application
│   ├── app/                    # Next.js App Router (Pages, Layouts, CSS)
│   ├── components/             # Reusable UI & Layout Components (Navbar, Footer, Buttons)
│   ├── sections/               # Modular Home/Landing page section blocks
│   ├── hooks/                  # Custom React hooks (e.g., scroll position tracking)
│   ├── lib/                    # Shared utility files (e.g., tailwind merge)
│   └── package.json            # Frontend dependency specifications
│
├── backend/                    # Python FastAPI API Service
│   ├── .venv/                  # Python Virtual Environment
│   ├── main.py                 # FastAPI Main Entry Point with API endpoints
│   └── requirements.txt        # Python backend dependency specifications
│
└── README.md                   # Workspace setup and execution guide
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or higher (Recommended: `v20+`)
- **Python**: `3.10` or higher
- **npm**: `v9.x` or higher

---

### 1. Backend Setup & Run (FastAPI)

The backend runs inside a Python virtual environment to isolate dependencies.

#### Step 1: Navigate to the backend directory
```powershell
cd backend
```

#### Step 2: Set up & Activate the Virtual Environment
- **Windows (PowerShell)**:
  ```powershell
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  ```
- **Windows (CMD)**:
  ```cmd
  python -m venv .venv
  .\.venv\Scripts\activate.bat
  ```
- **macOS / Linux**:
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Run the API Server
```bash
uvicorn main:app --reload --port 8000
```
- The backend API will be available at **[http://localhost:8000](http://localhost:8000)**.
- Interactive API documentation (Swagger UI) is available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

### 2. Frontend Setup & Run (Next.js 16)

The frontend is built using Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion.

#### Step 1: Navigate to the frontend directory
```powershell
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Run the Development Server
```bash
npm run dev
```
- The frontend will be available at **[http://localhost:3000](http://localhost:3000)**.
- Note: It is pre-configured to utilize the Next.js **Turbopack** engine for fast compile times.

#### Step 4: Build for Production
To build the static application assets and optimize resources:
```bash
npm run build
```
To run the production build locally:
```bash
npm run start
```

---

## 🛠️ API Endpoint References

The backend serves mock endpoints matching the 9 platform services:

| Service ID | Service Name | Endpoint Route |
| :--- | :--- | :--- |
| **`service-1`** | AI Career Assistant | `GET http://localhost:8000/api/services/service-1` |
| **`service-2`** | Internship Portal | `GET http://localhost:8000/api/services/service-2` |
| **`service-3`** | Placement Management | `GET http://localhost:8000/api/services/service-3` |
| **`service-4`** | Learning Management System | `GET http://localhost:8000/api/services/service-4` |
| **`service-5`** | Startup Incubation | `GET http://localhost:8000/api/services/service-5` |
| **`service-6`** | Hackathon Platform | `GET http://localhost:8000/api/services/service-6` |
| **`service-7`** | Student Dashboard | `GET http://localhost:8000/api/services/service-7` |
| **`service-8`** | Company Portal | `GET http://localhost:8000/api/services/service-8` |
| **`service-9`** | Analytics Dashboard | `GET http://localhost:8000/api/services/service-9` |

---

## 🎨 Visual Features & Aesthetics
- **Scrolling Glassmorphic Navbar**: Smoothly transitions from fully transparent to blur backdrop as you scroll down.
- **Dynamic Counters**: Responsive statistics counting animation for partner colleges, active students, etc.
- **Infinite Partners Logo Scroll**: Smooth CSS marquee showing corporate partner logos.
- **Staggered Animations**: Micro-animations powered by Framer Motion on features, timelines, and testimonial cards.
