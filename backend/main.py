from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Million Minds AI Platform Backend API",
    description="Python FastAPI backend template serving EdTech, Startup, and Skill Development services.",
    version="1.0.0"
)

# Configure CORS to permit local connection requests from the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "platform": "Million Minds AI",
        "message": "Welcome to the Platform Backend API. The API service is fully operational."
    }

# Mock API endpoints matching the 9 platform services for structural reference:

@app.get("/api/services/service-1")
def get_ai_career_assistant():
    return {
        "service_id": "service-1",
        "name": "AI Career Assistant",
        "status": "placeholder_active",
        "endpoints": ["/api/resume/scan", "/api/interview/mock", "/api/pathway/generate"]
    }

@app.get("/api/services/service-2")
def get_internship_portal():
    return {
        "service_id": "service-2",
        "name": "Internship Portal",
        "status": "placeholder_active",
        "endpoints": ["/api/internships/active", "/api/internships/apply"]
    }

@app.get("/api/services/service-3")
def get_placement_management():
    return {
        "service_id": "service-3",
        "name": "Placement Management",
        "status": "placeholder_active",
        "endpoints": ["/api/placements/drives", "/api/placements/statistics"]
    }

@app.get("/api/services/service-4")
def get_lms():
    return {
        "service_id": "service-4",
        "name": "Learning Management System",
        "status": "placeholder_active",
        "endpoints": ["/api/courses/list", "/api/courses/grades"]
    }

@app.get("/api/services/service-5")
def get_startup_incubation():
    return {
        "service_id": "service-5",
        "name": "Startup Incubation",
        "status": "placeholder_active",
        "endpoints": ["/api/incubation/cohorts", "/api/incubation/pitch"]
    }

@app.get("/api/services/service-6")
def get_hackathon_platform():
    return {
        "service_id": "service-6",
        "name": "Hackathon Platform",
        "status": "placeholder_active",
        "endpoints": ["/api/hackathons/active", "/api/hackathons/submit"]
    }

@app.get("/api/services/service-7")
def get_student_dashboard():
    return {
        "service_id": "service-7",
        "name": "Student Dashboard",
        "status": "placeholder_active",
        "endpoints": ["/api/student/profile", "/api/student/metrics"]
    }

@app.get("/api/services/service-8")
def get_company_portal():
    return {
        "service_id": "service-8",
        "name": "Company Portal",
        "status": "placeholder_active",
        "endpoints": ["/api/jobs/create", "/api/candidates/list"]
    }

@app.get("/api/services/service-9")
def get_analytics_dashboard():
    return {
        "service_id": "service-9",
        "name": "Analytics Dashboard",
        "status": "placeholder_active",
        "endpoints": ["/api/analytics/employment", "/api/analytics/skills"]
    }
