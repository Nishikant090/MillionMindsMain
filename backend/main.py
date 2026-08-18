import os
import httpx
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr, Field

import db
import security

app = FastAPI(
    title="Million Minds AI Platform Backend API",
    description="Python FastAPI backend serving EdTech, Internship, and Placement services.",
    version="1.0.0"
)

# Configure CORS to permit connection requests from the frontend
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
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
        "platform": "Million Minds AI",
        "message": "Welcome to the Platform Backend API. The API service is fully operational."
    }


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
        "description": "Join an immersive learning experience focused on AI, innovation, and career-ready skills.",
        "status": "active",
        "provider": "Million Minds",
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
        "name": "Internship Portal",
        "description": "Find verified experienceships and paid internships with startup builders and corporate giants.",
        "status": "active",
        "provider": "Aspire",
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
# SERVICE 3 — Placement Management  (Aria Campus TaaS — frontend only)
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
    Returns JSON metadata for the Placement Management service
    without triggering a redirect.
    """
    return {
        "service_id": "service-3",
        "name": "Placement Management",
        "description": (
            "Optimize your corporate campus hiring, coordinate recruitment drives, "
            "and track incoming offers."
        ),
        "status": "active",
        "provider": "Aria Campus TaaS",
        "url": ARIA_CAMPUS_TAAS_URL,
        "endpoints": {
            "trigger":  "/api/services/service-3",        # → 302 redirect to Aria TaaS
            "info":     "/api/services/service-3/info",   # → this JSON response
            "health":   "/api/services/service-3/health",
        },
        "features": [
            "Campus recruitment drive coordination",
            "Offer tracking and management",
            "Corporate hiring pipeline",
            "Student placement analytics",
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
# SERVICES 4-9 — Placeholder stubs (not yet live)
# ═════════════════════════════════════════════════════════════════════════════

@app.get("/api/services/service-4")
def get_lms():
    return {
        "service_id": "service-4",
        "name": "Learning Management System",
        "status": "coming_soon",
    }

@app.get("/api/services/service-5")
def get_ai_studio():
    return {
        "service_id": "service-5",
        "name": "AI Studio",
        "status": "coming_soon",
    }

@app.get("/api/services/service-6")
def get_hackathon_platform():
    return {
        "service_id": "service-6",
        "name": "Hackathon Platform",
        "status": "coming_soon",
    }

@app.get("/api/services/service-7")
def get_student_dashboard():
    return {
        "service_id": "service-7",
        "name": "Student Dashboard",
        "status": "coming_soon",
    }

@app.get("/api/services/service-8")
def get_company_portal():
    return {
        "service_id": "service-8",
        "name": "Company Portal",
        "status": "coming_soon",
    }

@app.get("/api/services/service-9")
def get_analytics_dashboard():
    return {
        "service_id": "service-9",
        "name": "Analytics Dashboard",
        "status": "coming_soon",
    }
