@echo off
echo Starting DLOG OSINT Application...

start cmd /k "cd backend && python -m pip install -r requirements.txt && python -m uvicorn app.main:app --host 0.0.0.0 --reload --port 8000"

echo Wait for backend to install dependencies...
timeout /t 5

start cmd /k "cd frontend && npm install --legacy-peer-deps && npm run dev -- --host"

echo Application launched!
