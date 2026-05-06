from fastapi import APIRouter, BackgroundTasks
from app.models.schemas import CompanyProfile
from app.services import scraper_service, nlp_service

router = APIRouter()

@router.get("/companies", response_model=list[CompanyProfile])
def get_companies():
    """Return all tracked companies and their innovations."""
    return [
        {
            "company_id": "trigo-group",
            "name": "TRIGO Group (Scortex)",
            "technological_innovations": [
                {
                    "innovation_id": "spark-multi-view",
                    "title": "Spark Multi View Platform",
                    "category": "Inspection/qualité assistée par IA",
                    "description": "Automated visual inspection using deep learning with 925ms latency. 4-camera support for complex geometries. High adoption in cosmetics (Toly).",
                    "discovery_date": "2024-05-15",
                    "source_url": "https://scortex.io",
                    "disruption_score": 92
                }
            ]
        },
        {
            "company_id": "bosch",
            "name": "Bosch",
            "technological_innovations": [
                {
                    "innovation_id": "cockpit-adas-soc",
                    "title": "Cockpit & ADAS SoC",
                    "category": "Convergence hardware/software",
                    "description": "First system worldwide to merge infotainment and advanced driver assistance on a single System-on-Chip, reducing wiring costs.",
                    "discovery_date": "2024-01-08",
                    "source_url": "https://bosch.com",
                    "disruption_score": 95
                }
            ]
        },
        {
            "company_id": "continental",
            "name": "Continental",
            "technological_innovations": [
                {
                    "innovation_id": "crystal-center-display",
                    "title": "Crystal Center Display",
                    "category": "Convergence hardware/software",
                    "description": "MicroLED technology embedded in a Swarovski crystal housing with invisible biometric facial authentication.",
                    "discovery_date": "2024-01-08",
                    "source_url": "https://continental.com",
                    "disruption_score": 85
                }
            ]
        },
        {
            "company_id": "ceva-logistics",
            "name": "CEVA Logistics",
            "technological_innovations": [
                {
                    "innovation_id": "fvl-prototypes",
                    "title": "FVL & Prototypes Visibility",
                    "category": "Traçabilité temps réel & ETA (RTTVP)",
                    "description": "Finished Vehicle Logistics with end-to-end visibility and prototype securing for OEMs.",
                    "discovery_date": "2024-06-10",
                    "source_url": "https://cevalogistics.com",
                    "disruption_score": 88
                }
            ]
        },
        {
            "company_id": "valeo",
            "name": "Valeo",
            "technological_innovations": [
                {
                    "innovation_id": "scala-3-lidar",
                    "title": "SCALA 3 LiDAR & Ineez",
                    "category": "Inspection/qualité assistée par IA",
                    "description": "CES 2024 Innovation Award winning perception software based on AI, alongside 3kHz ultra-low frequency wireless charging.",
                    "discovery_date": "2024-01-10",
                    "source_url": "https://valeo.com",
                    "disruption_score": 90
                }
            ]
        }
    ]

@router.post("/scan/trigger")
def trigger_scan(background_tasks: BackgroundTasks):
    """Trigger a new background scan of targeted URLs."""
    background_tasks.add_task(scraper_service.run_full_scan)
    return {"status": "Scan initiated in background"}
