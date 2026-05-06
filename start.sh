#!/bin/bash
echo "Starting DLOG OSINT Application..."

cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

cd ../frontend
npm install --legacy-peer-deps
npm run dev &
FRONTEND_PID=$!

echo "Application launched! Press Ctrl+C to stop."
trap "kill $BACKEND_PID $FRONTEND_PID" SIGINT
wait
