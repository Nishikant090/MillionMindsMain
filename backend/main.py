import os
import httpx
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr, Field

import db
import security

app = FastAPI(
    title="Millionminds Ecosystem Portal Backend API",
    description="Python FastAPI backend serving the Millionminds ecosystem portal's services, auth, and lead capture.",
    version="1.0.0"
)

# Configure CORS to permit connection requests from the frontend.
# FRONTEND_URL accepts a comma-separated list, since a site is often reachable
# from more than one origin (bare domain, subdomain, Render preview URL, etc.).
frontend_urls = [
    url.strip()
    for url in os.getenv("FRONTEND_URL", "http://localhost:3000").split(",")
    if url.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── External service base URLs ───────────────────────────────────────────────
AI_BOOTCAMP_API       = "https://million-main.onrender.com"       # service-1 backend
ASPIRE_API            = "https://aspire-backend-932q.onrender.com" # service-2 backend
ARIA_CAMPUS_TAAS_URL  = "https://aria-campus-taas.onrender.com/"   # service-3 (frontend-only)

# Key required in the `X-Admin-Key` header to read captured leads/subscribers.
# Set a real secret via the ADMIN_API_KEY env var before deploying.
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "dev-admin-key")

# ─── Services grid — single source of truth for the homepage services section ─
# Static metadata only (no outbound calls) so the listing endpoint stays fast.
# `icon` is a slug the frontend maps to a lucide-react icon component.
SERVICES_SUMMARY = [
    {
        "id": "service-1",
        "name": "AI Boot Camp",
        "description": "Skill-set training to make students industry-ready — AI Fundamentals and AI Skills for IT and Non-IT students, aligned to functional domains employers actually need.",
        "icon": "brain",
        "link": "https://million-main.vercel.app/",
        "status": "active",
    },
    {
        "id": "service-2",
        "name": "Aspire – Talent Connect Platform",
        "description": "Structured job openings sourced from startup founders, aligned with college placement cells — an added pipeline of opportunities during campus drives.",
        "icon": "briefcase",
        "link": "https://aspire-frontend.onrender.com",
        "status": "active",
    },
    {
        "id": "service-3",
        "name": "Campus TaaS",
        "description": "B2B consultancy where student tech teams (CSE-IT/MCA) help startups and SMBs adopt AI solutions to enhance productivity, charged on project specs.",
        "icon": "graduation-cap",
        "link": "https://aria-campus-taas.onrender.com/",
        "status": "active",
    },
    {
        "id": "service-10",
        "name": "AI Literacy Mission @ Campus",
        "description": "Training One Million GenZ students and young working professionals in AI fundamentals and practical GenAI tools, free of cost, taught by a peer mentors' collective.",
        "icon": "sparkles",
        "link": "https://ai-literacy-mission-campus.vercel.app",
        "status": "active",
    },
    {
        "id": "service-11",
        "name": "ELEVATE: TechFests@Campus",
        "description": "A marketplace connecting campus tech sessions, hackathons, and seminars with startups and corporates as sponsors, mentors, and research collaborators.",
        "icon": "handshake",
        "link": "https://elevate-tech-fests-campus.vercel.app",
        "status": "active",
    },
    {
        "id": "service-4",
        "name": "My AI Buddy!",
        "description": "\"Do it yourself, with your student buddy by your side.\" Student mentors help SMBs and startups develop their own AI tools and web solutions, hands-on.",
        "icon": "bot",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-5",
        "name": "AI Master Class",
        "description": "\"Every generation has its edge — this one's is AI.\" A bouquet of cutting-edge, application-oriented AI sessions for regular upskilling.",
        "icon": "award",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-6",
        "name": "ARIA: Digital Marketing for NBFCs",
        "description": "A learn-and-earn platform where student talent from Management, Finance, MCA, and BMM/BMS/BBA backgrounds delivers digital marketing services at professional benchmarks.",
        "icon": "trending-up",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-7",
        "name": "FUSION: Alumni & Campus Reconnect",
        "description": "Focused upskilling and re-skilling programmes for alumni navigating mid-career pivots, built with industry professionals and academics.",
        "icon": "refresh-cw",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-8",
        "name": "AEGIS: Faculty Knowledge Programme",
        "description": "Day-long workshops and collaborative knowledge exchange between college faculty and AI tech teams on the latest technology advances.",
        "icon": "shield-check",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-9",
        "name": "Campus Analytics",
        "description": "A competitive benchmarking service comparing campus performance across quantifiable metrics, against defined peer sets or best-in-class institutions.",
        "icon": "bar-chart-3",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-12",
        "name": "ALLIANT: Innovation & Incubation",
        "description": "Students pitch innovative ideas to a jury of real startup founders for mentorship, then get process support to turn the strongest ideas into campus startups.",
        "icon": "lightbulb",
        "link": None,
        "status": "coming_soon",
    },
    {
        "id": "service-13",
        "name": "ACORN: R&D as a Service",
        "description": "A marketplace bridging startups seeking domain expertise and R&D infrastructure with campus teams — students, faculty, and lab access on committed timelines.",
        "icon": "flask-conical",
        "link": None,
        "status": "coming_soon",
    },
]


def require_admin(x_admin_key: str = Header(default="")):
    if x_admin_key != ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing X-Admin-Key header")


def require_user(authorization: str = Header(default="")) -> dict:
    """Resolves the Bearer token in the Authorization header to a logged-in user."""
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    email = security.verify_token(authorization.removeprefix("Bearer "))
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired session")
    user = db.find_user_by_email(email)
    if not user:
        raise HTTPException(status_code=401, detail="User no longer exists")
    return {"name": user["name"], "email": user["email"]}

# ─────────────────────────────────────────────────────────────────────────────
# Root
# ─────────────────────────────────────────────────────────────────────────────

@app.get("/")
def read_root():
    return {
        "status": "online",
        "platform": "Millionminds",
        "message": "Welcome to the Millionminds Ecosystem Portal API. The API service is fully operational."
    }


@app.get("/api/services")
def list_services():
    """
    Powers the homepage services grid. The frontend fetches this on load so
    the grid reflects this list without needing a frontend redeploy.
    """
    return {"count": len(SERVICES_SUMMARY), "services": SERVICES_SUMMARY}


# ═════════════════════════════════════════════════════════════════════════════
# SERVICE 1 — AI Boot Camp  (million-main.onrender.com)
# Routes discovered from the deployed JS bundle:
#   /api/alumni/*  /api/college/*  /api/student/*  /api/admin/*  /api/programmes/*
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-1")
def get_ai_boot_camp():
    """Metadata for the AI Boot Camp service."""
    return {
        "service_id": "service-1",
        "name": "AI Boot Camp",
        "description": "Skill-set training to make students industry-ready — AI Fundamentals and AI Skills for IT and Non-IT students, aligned to functional domains employers actually need.",
        "status": "active",
        "provider": "Millionminds",
        "frontend_url": "https://million-main.vercel.app/",
        "backend_url": AI_BOOTCAMP_API,
        "api_docs": f"{AI_BOOTCAMP_API}/docs",
        "endpoints": {
            "health":            "/api/services/service-1/health",
            # Public routes
            "programmes":        "/api/services/service-1/programmes",
            "stats":             "/api/services/service-1/stats",
            # College portal
            "college_register":  "/api/services/service-1/college/register",
            # Alumni portal
            "alumni_programmes": "/api/services/service-1/alumni/programmes",
            "alumni_sessions":   "/api/services/service-1/alumni/sessions",
            "alumni_dashboard":  "/api/services/service-1/alumni/dashboard",
            # Admin
            "admin_dashboard":   "/api/services/service-1/admin/dashboard",
            "admin_colleges":    "/api/services/service-1/admin/colleges",
            "admin_students":    "/api/services/service-1/admin/students",
        },
        "features": [
            "AI & tech upskilling programmes",
            "College batch management",
            "Alumni learning journeys",
            "Live sessions & quizzes",
            "Project-based learning",
            "Certificate generation",
        ],
    }


@app.get("/api/services/service-1/health")
async def ai_bootcamp_health():
    """Proxies a health-check to the live AI Boot Camp backend."""
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            response = await client.get(AI_BOOTCAMP_API)
            return {
                "service_id": "service-1",
                "provider": "Million Minds AI Boot Camp",
                "backend_url": AI_BOOTCAMP_API,
                "status": "up" if response.status_code == 200 else "degraded",
                "http_status_code": response.status_code,
            }
        except httpx.RequestError as exc:
            raise HTTPException(status_code=503, detail={
                "service_id": "service-1",
                "status": "down",
                "error": str(exc),
            })


@app.get("/api/services/service-1/programmes")
async def ai_bootcamp_programmes():
    """
    Proxies GET /api/programmes from the AI Boot Camp backend.
    Returns the list of available upskilling programmes.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/programmes")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/stats")
async def ai_bootcamp_stats():
    """
    Proxies the admin dashboard stats from the AI Boot Camp backend.
    Returns aggregate metrics: students, colleges, programmes, alumni.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/alumni/admin/dashboard")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/alumni/programmes")
async def ai_bootcamp_alumni_programmes():
    """
    Proxies GET /api/alumni/programmes from the AI Boot Camp backend.
    Returns all available alumni programmes.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/alumni/programmes")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/alumni/sessions")
async def ai_bootcamp_alumni_sessions():
    """
    Proxies GET /api/alumni/sessions from the AI Boot Camp backend.
    Returns scheduled live sessions for alumni.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/alumni/sessions")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/alumni/dashboard")
async def ai_bootcamp_alumni_dashboard(alumni_id: str = Query(..., description="Alumni ID")):
    """
    Proxies GET /api/alumni/dashboard from the AI Boot Camp backend.
    Returns personalised dashboard data for a given alumni_id.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(
                f"{AI_BOOTCAMP_API}/api/alumni/dashboard",
                params={"alumni_id": alumni_id},
            )
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/admin/dashboard")
async def ai_bootcamp_admin_dashboard():
    """
    Proxies GET /api/alumni/admin/dashboard from the AI Boot Camp backend.
    Returns platform-wide admin metrics.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/alumni/admin/dashboard")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/admin/colleges")
async def ai_bootcamp_admin_colleges():
    """
    Proxies GET /api/admin/colleges from the AI Boot Camp backend.
    Returns the list of onboarded colleges.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/admin/colleges")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-1/admin/students")
async def ai_bootcamp_admin_students():
    """
    Proxies GET /api/admin/students from the AI Boot Camp backend.
    Returns the list of registered students.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{AI_BOOTCAMP_API}/api/admin/students")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


# ═════════════════════════════════════════════════════════════════════════════
# SERVICE 2 — Internship Portal / Aspire  (aspire-backend-932q.onrender.com)
# Routes discovered from the OpenAPI spec at /openapi.json:
#   /stats  /jobs  /jobs/featured  /jobs/recommended
#   /opportunities  /opportunities/featured  /opportunities/{id}
#   /students  /students/me  /applications  /applications/me
#   /company/*  /admin/*  /notifications/*
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-2")
def get_internship_portal():
    """Metadata for the Internship Portal (Aspire) service."""
    return {
        "service_id": "service-2",
        "name": "Aspire – Talent Connect Platform",
        "description": "Structured job openings sourced from startup founders, aligned with college placement cells — an added pipeline of opportunities during campus drives.",
        "status": "active",
        "provider": "Millionminds",
        "frontend_url": "https://aspire-frontend.onrender.com",
        "backend_url": ASPIRE_API,
        "api_docs": f"{ASPIRE_API}/docs",
        "endpoints": {
            "health":                  "/api/services/service-2/health",
            # Public
            "stats":                   "/api/services/service-2/stats",
            "jobs":                    "/api/services/service-2/jobs",
            "jobs_featured":           "/api/services/service-2/jobs/featured",
            "opportunities":           "/api/services/service-2/opportunities",
            "opportunities_featured":  "/api/services/service-2/opportunities/featured",
            "company_jobs":            "/api/services/service-2/company-jobs",
        },
        "features": [
            "Unified job & internship feed",
            "Company job postings",
            "Student applications & tracking",
            "Admin opportunity management",
            "Resume upload & applicant pipeline",
            "Real-time notifications",
        ],
    }


@app.get("/api/services/service-2/health")
async def internship_portal_health():
    """Proxies a health-check to the live Aspire backend."""
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            response = await client.get(ASPIRE_API)
            return {
                "service_id": "service-2",
                "provider": "Aspire Internship Portal",
                "backend_url": ASPIRE_API,
                "status": "up" if response.status_code == 200 else "degraded",
                "http_status_code": response.status_code,
            }
        except httpx.RequestError as exc:
            raise HTTPException(status_code=503, detail={
                "service_id": "service-2",
                "status": "down",
                "error": str(exc),
            })


@app.get("/api/services/service-2/stats")
async def internship_portal_stats():
    """
    Proxies GET /stats from Aspire backend.
    Returns platform-wide statistics for the home page
    (total students, companies, jobs, applications).
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{ASPIRE_API}/stats")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/jobs")
async def internship_portal_jobs(
    search: str = Query(None, description="Search keyword"),
    type:   str = Query(None, description="Job type filter"),
    company: str = Query(None, description="Company name filter"),
):
    """
    Proxies GET /jobs from Aspire backend.
    Returns merged job feed from admin opportunities and company-posted jobs.
    Supports ?search=, ?type=, ?company= query params.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            params = {k: v for k, v in {"search": search, "type": type, "company": company}.items() if v}
            resp = await client.get(f"{ASPIRE_API}/jobs", params=params)
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/jobs/featured")
async def internship_portal_featured_jobs():
    """
    Proxies GET /jobs/featured from Aspire backend.
    Returns the latest jobs for home page recommendations.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{ASPIRE_API}/jobs/featured")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/opportunities")
async def internship_portal_opportunities(
    search: str = Query(None, description="Search keyword"),
    type:   str = Query(None, description="Opportunity type filter"),
    company: str = Query(None, description="Company name filter"),
):
    """
    Proxies GET /opportunities from Aspire backend.
    Returns all opportunities with optional filtering.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            params = {k: v for k, v in {"search": search, "type": type, "company": company}.items() if v}
            resp = await client.get(f"{ASPIRE_API}/opportunities", params=params)
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/opportunities/featured")
async def internship_portal_featured_opportunities():
    """
    Proxies GET /opportunities/featured from Aspire backend.
    Returns the 6 most recent opportunities for the home page.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{ASPIRE_API}/opportunities/featured")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/opportunities/{opportunity_id}")
async def internship_portal_opportunity_detail(opportunity_id: int):
    """
    Proxies GET /opportunities/{id} from Aspire backend.
    Returns details for a single opportunity by its integer ID.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            resp = await client.get(f"{ASPIRE_API}/opportunities/{opportunity_id}")
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


@app.get("/api/services/service-2/company-jobs")
async def internship_portal_company_jobs(
    search: str = Query(None, description="Search keyword"),
    type:   str = Query(None, description="Job type filter"),
):
    """
    Proxies GET /company-jobs from Aspire backend.
    Returns all active company-posted jobs shown on the student browse page.
    """
    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            params = {k: v for k, v in {"search": search, "type": type}.items() if v}
            resp = await client.get(f"{ASPIRE_API}/company-jobs", params=params)
            return resp.json()
        except httpx.RequestError as exc:
            raise HTTPException(status_code=502, detail={"error": str(exc)})


# ═════════════════════════════════════════════════════════════════════════════
# SERVICE 3 — Campus TaaS  (Aria Campus TaaS — frontend only)
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-3")
def get_placement_management():
    """
    Triggers a 302 redirect directly to the live Aria Campus TaaS platform.
    Any client (browser, curl, frontend card) that hits this endpoint is
    immediately relocated to https://aria-campus-taas.onrender.com/
    """
    return RedirectResponse(url=ARIA_CAMPUS_TAAS_URL, status_code=302)


@app.get("/api/services/service-3/info")
def get_placement_management_info():
    """
    Returns JSON metadata for the Campus TaaS service
    without triggering a redirect.
    """
    return {
        "service_id": "service-3",
        "name": "Campus TaaS",
        "description": (
            "B2B consultancy where student tech teams (CSE-IT/MCA) help startups "
            "and SMBs adopt AI solutions to enhance productivity, charged on project specs."
        ),
        "status": "active",
        "provider": "Millionminds",
        "url": ARIA_CAMPUS_TAAS_URL,
        "endpoints": {
            "trigger":  "/api/services/service-3",        # → 302 redirect to Aria TaaS
            "info":     "/api/services/service-3/info",   # → this JSON response
            "health":   "/api/services/service-3/health",
        },
        "features": [
            "Outsourced AI adaptation service for StartUp & SMB clients",
            "Delivered by Engg CSE-IT/MCA students skilled in AI tools & GenAI agents",
            "Tech + Operational student team enables client AI adoption",
        ],
    }


@app.get("/api/services/service-3/health")
async def placement_management_health():
    """
    Proxies a health-check to the live Aria Campus TaaS service and
    returns its availability status back to the caller.
    """
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            response = await client.get(ARIA_CAMPUS_TAAS_URL)
            is_up = response.status_code == 200
            return {
                "service_id": "service-3",
                "provider": "Aria Campus TaaS",
                "external_url": ARIA_CAMPUS_TAAS_URL,
                "status": "up" if is_up else "degraded",
                "http_status_code": response.status_code,
            }
        except httpx.RequestError as exc:
            raise HTTPException(
                status_code=503,
                detail={
                    "service_id": "service-3",
                    "provider": "Aria Campus TaaS",
                    "external_url": ARIA_CAMPUS_TAAS_URL,
                    "status": "down",
                    "error": str(exc),
                },
            )


# ═════════════════════════════════════════════════════════════════════════════
# AUTH — Signup / Login (real accounts + a login_events log for admin stats)
# ═════════════════════════════════════════════════════════════════════════════

class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=200)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=200)


@app.post("/api/auth/signup", status_code=201)
def signup(payload: SignupRequest):
    email = payload.email.lower()
    created = db.create_user({
        "name": payload.name,
        "email": email,
        "password_hash": security.hash_password(payload.password),
        "created_at": db.now_iso(),
    })
    if not created:
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    db.record_login(email)
    return {"token": security.create_token(email), "user": {"name": payload.name, "email": email}}


@app.post("/api/auth/login")
def login(payload: LoginRequest):
    email = payload.email.lower()
    user = db.find_user_by_email(email)
    if not user or not security.verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    db.record_login(email)
    return {"token": security.create_token(email), "user": {"name": user["name"], "email": email}}


@app.get("/api/auth/me")
def get_me(current_user: dict = Depends(require_user)):
    return current_user


@app.get("/api/admin/login-stats")
def get_login_stats(_: None = Depends(require_admin)):
    return {
        "total_users": db.count_users(),
        "total_logins": db.count_logins(),
        "recent_logins": db.list_login_events()[:50],
    }


@app.get("/api/admin/users")
def get_users(_: None = Depends(require_admin)):
    users = db.list_users()
    return {"count": len(users), "users": users}


# ═════════════════════════════════════════════════════════════════════════════
# PLATFORM DATA — Newsletter signups & contact leads (persisted via db.py)
# ═════════════════════════════════════════════════════════════════════════════

class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr


class ContactRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)


@app.get("/api/health/db")
def db_health():
    """Reports which data backend is active (mongodb or the local tinydb fallback)."""
    return {"backend": db.BACKEND_NAME}


@app.post("/api/newsletter/subscribe", status_code=201)
def subscribe_newsletter(payload: NewsletterSubscribeRequest):
    email = payload.email.lower()
    created = db.insert_subscriber({"email": email, "created_at": db.now_iso()})
    if not created:
        return {"status": "already_subscribed", "email": email}
    return {"status": "subscribed", "email": email}


@app.get("/api/admin/newsletter/subscribers")
def get_newsletter_subscribers(_: None = Depends(require_admin)):
    subscribers = db.list_subscribers()
    return {"count": len(subscribers), "subscribers": subscribers}


@app.post("/api/contact", status_code=201)
def submit_contact(payload: ContactRequest):
    doc = payload.model_dump()
    doc["created_at"] = db.now_iso()
    db.insert_contact_message(doc)
    return {"status": "received"}


@app.get("/api/admin/contact-messages")
def get_contact_messages(_: None = Depends(require_admin)):
    messages = db.list_contact_messages()
    return {"count": len(messages), "messages": messages}


# ═════════════════════════════════════════════════════════════════════════════
# SERVICES 4-9, 12-13 — Real Millionminds initiatives, not yet live as standalone
# apps. Descriptions sourced directly from Millionminds' own service notes.
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-4")
def get_ai_buddy():
    return {
        "service_id": "service-4",
        "name": "My AI Buddy!",
        "description": "\"Do it yourself, with your student buddy by your side.\" A B2B service where campus student teams help StartUps and SMBs develop their own AI and web solutions for day-to-day business problems.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Students with AI tool expertise act as process enablers and mentors",
            "Charged to clients on project specs, like a consultancy engagement",
            "Focused on solving specific day-to-day productivity problems",
        ],
    }

@app.get("/api/services/service-5")
def get_ai_master_class():
    return {
        "service_id": "service-5",
        "name": "AI Master Class",
        "description": "\"Every generation has its edge. This one's is AI.\" Regular upskilling sessions on cutting-edge, application-oriented, future-focused AI skills.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Bouquet of sessions for continuous relevance in a capability-driven economy",
            "Application-oriented, not just theory",
            "Aimed at both students and working professionals",
        ],
    }

@app.get("/api/services/service-6")
def get_aria_nbfc():
    return {
        "service_id": "service-6",
        "name": "ARIA: Digital Marketing for NBFCs",
        "description": "A dedicated platform where student talent from Management, Finance, MCA, and courses like BMM/BMS/BBA/BBI deliver AI-enabled digital marketing services for NBFCs, in a unique learn-and-earn mode.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Student teams benchmarked at professional service-firm quality",
            "Cost-advantage, value-for-money service delivery",
            "Learn-and-earn model for participating students",
        ],
    }

@app.get("/api/services/service-7")
def get_fusion():
    return {
        "service_id": "service-7",
        "name": "FUSION: Alumni & Campus Reconnect",
        "description": "Focused learning programmes for alumni navigating a working world where skills go stale fast — short-term upskilling courses and structured re-skilling for mid-career pivots.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Built in coordination with industry professionals and academics",
            "Short-burst learning formats for working professionals",
            "Cross-functional and multi-domain learning tracks",
        ],
    }

@app.get("/api/services/service-8")
def get_aegis():
    return {
        "service_id": "service-8",
        "name": "AEGIS: Faculty Knowledge Programme",
        "description": "Exchange of thoughts and views between college faculty and AI tech teams to imbibe the latest technology advances and innovations, including day-long on-campus workshops.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Content is technology- or domain-focused, tailored per campus",
            "Collaborative knowledge exchange, not one-way lectures",
            "Keeps faculty current with fast-moving AI tooling",
        ],
    }

@app.get("/api/services/service-9")
def get_campus_analytics():
    return {
        "service_id": "service-9",
        "name": "Campus Analytics",
        "description": "A competitive benchmarking service comparing and reporting campus performance on quantifiable metrics, against defined peer groups, next-tier campuses, or best-in-class institutions.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Benchmarks at overall market level or against a chosen parity set",
            "Quantifiable, metric-driven comparisons",
            "Helps institutions identify where they stand and where to improve",
        ],
    }

@app.get("/api/services/service-12")
def get_alliant():
    return {
        "service_id": "service-12",
        "name": "ALLIANT: Innovation & Incubation",
        "description": "Students pitch innovative ideas — big or small — to a jury of real startup founders for mentorship and perspective, with a path from idea to campus-based incubation.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Direct mentorship from real startup-founder practitioners",
            "Guidance for high-potential ideas on next steps",
            "Incubation support to turn student ideas into startups on campus",
        ],
    }

@app.get("/api/services/service-13")
def get_acorn():
    return {
        "service_id": "service-13",
        "name": "ACORN: R&D as a Service",
        "description": "A marketplace bridging startups seeking domain expertise and R&D infrastructure with academic institutions — campuses commit student and faculty teams with clear time commitments.",
        "status": "coming_soon",
        "provider": "Millionminds",
        "features": [
            "Taps into the talent base available across partner campuses",
            "Campus commits team + faculty + infrastructure access",
            "Structured around clear deliverables and timelines",
        ],
    }


# ═════════════════════════════════════════════════════════════════════════════
# SERVICE 10 — AI Literacy Mission @ Campus (ai-literacy-mission-campus.vercel.app)
# SERVICE 11 — ELEVATE: TechFests@Campus (elevate-tech-fests-campus.vercel.app)
# Both are frontend-only Vercel deployments — metadata only, no backend proxy.
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-10")
def get_ai_literacy_mission():
    return {
        "service_id": "service-10",
        "name": "AI Literacy Mission @ Campus",
        "description": "A free, mentor-led 70-hour programme (30h MasterClass + 30h self-practice + 10h capstone) training students in practical GenAI skills.",
        "status": "active",
        "provider": "Millionminds UpSkill Academy",
        "frontend_url": "https://ai-literacy-mission-campus.vercel.app",
        "features": [
            "1:1 mentorship from verified college mentors",
            "20 live MasterClass sessions on GenAI tools & prompt engineering",
            "Structured self-practice assignments",
            "Capstone project with a verified certificate",
        ],
    }


@app.get("/api/services/service-11")
def get_elevate_techfests():
    return {
        "service_id": "service-11",
        "name": "ELEVATE: TechFests@Campus",
        "description": "Connects campus hackathons, ideathons, and tech fests with startups and corporates as sponsors, mentors, and collaborators.",
        "status": "active",
        "provider": "Millionminds UpSkill Academy",
        "frontend_url": "https://elevate-tech-fests-campus.vercel.app",
        "features": [
            "Campuses list hackathons, ideathons, workshops, and seminars",
            "Startups & SMBs discover and filter events by domain, location, scale",
            "Express interest as sponsor, mentor, or collaborator",
            "Deal closure and deliverables tracked in-platform",
        ],
    }
