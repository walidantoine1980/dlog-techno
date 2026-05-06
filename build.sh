#!/bin/bash
set -ex

echo "Starting unified build process..."

# 1. Setup Backend
echo "Setting up Python environment..."
python -m venv /opt/venv
. /opt/venv/bin/activate
cd backend
pip install -r requirements.txt
cd ..

# 2. Setup Frontend
echo "Setting up Node environment..."
cd frontend

# Clean strictly to avoid cached corrupted binaries
rm -rf node_modules package-lock.json dist

# Install dependencies (forcing devDependencies)
export NODE_ENV=development
npm cache clean --force
npm install

# Build the Vite application, capturing logs if it fails
echo "Running Vite Build..."
if ! npm run build; then
    echo "====================================="
    echo "❌ NPM BUILD FAILED!"
    echo "Dumping npm debug logs if available:"
    cat /root/.npm/_logs/*-debug.log || true
    echo "====================================="
    exit 1
fi

echo "Build process completed successfully!"
