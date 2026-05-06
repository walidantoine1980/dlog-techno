from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import date

class Innovation(BaseModel):
    innovation_id: str
    title: str
    category: str
    subcategory: Optional[str] = None
    description: str
    discovery_date: date
    source_url: HttpUrl
    disruption_score: int

class Financials(BaseModel):
    annual_revenue_eur: Optional[float] = None
    growth_rate_percent: Optional[float] = None
    headcount: Optional[int] = None
    last_updated: Optional[date] = None

class MarketPosition(BaseModel):
    core_business: List[str]
    target_industries: List[str]

class CompanyProfile(BaseModel):
    company_id: str
    name: str
    headquarters: Optional[str] = None
    website: Optional[HttpUrl] = None
    financials: Optional[Financials] = None
    market_position: Optional[MarketPosition] = None
    technological_innovations: List[Innovation] = []
