from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.api import endpoints
import os

app = FastAPI(
    title="DLOG OSINT API",
    description="API for Technological Intelligence and Scraping Engine",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api/v1")

# Serve frontend static files if they exist (for single-container deployment)
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # backend/
project_root = os.path.dirname(base_dir) # dlog-osint-app/
frontend_dist = os.path.join(project_root, "frontend", "dist")

if os.path.isdir(frontend_dist):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist, "assets")), name="assets")
    
    @app.get("/{catchall:path}")
    def serve_frontend(catchall: str):
        # Prevent Path Traversal
        safe_base = os.path.abspath(frontend_dist)
        file_path = os.path.abspath(os.path.join(frontend_dist, catchall))
        
        if file_path.startswith(safe_base) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    @app.get("/")
    def read_root():
        return {"status": "ok", "service": "DLOG OSINT API is running", "warning": "Frontend dist not found. Run 'npm run build' in frontend/"}
