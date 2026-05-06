# DLOG OSINT Platform - Veille Technologique 🚀

Plateforme de veille technologique et de renseignement open-source (OSINT) conçue pour le groupe DLOG. Cette application web fournit un tableau de bord analytique des innovations technologiques en matière de vision industrielle, contrôle qualité assisté par Intelligence Artificielle (IA), robotique autonome, et gouvernance IA.

## 🌟 Fonctionnalités Principales

- **Dashboard Analytique** : Vue globale sur les taxinomies technologiques, les cibles prioritaires, et le volume de détections.
- **Radar Technologique** : Fiches détaillées sur les innovations mondiales en vision (TRIGO, Bureau Veritas, Applus+, etc.).
- **Annuaire des Entreprises** : Liste exhaustive des fournisseurs et leaders en vision et contrôle qualité en Europe, USA, et Asie (ex: Sipotek, Hikrobot, QEIS, Cognex, etc.).
- **Calendrier des Salons** : Suivi des événements technologiques imminents (Control 2025, VISION 2026, LogiMAT, etc.).

## 🏗️ Architecture Technique

Le projet est divisé en deux parties :
- **Frontend** : Application React construite avec Vite, Tailwind CSS, Recharts et Lucide-React.
- **Backend** : API RESTful développée en Python avec FastAPI (prêt pour l'intégration de scrapers OSINT).

## 🚀 Démarrage Rapide (Local)

### Prérequis
- [Node.js](https://nodejs.org/) (version 18+)
- [Python](https://www.python.org/) (version 3.10+)

### Installation & Lancement Automatique (Windows)
Un script batch est fourni pour installer les dépendances et lancer les deux serveurs (frontend et backend) simultanément.

Double-cliquez sur :
```bash
start.bat
```

### Lancement Manuel

**1. Démarrer le Backend (FastAPI)**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**2. Démarrer le Frontend (React/Vite)**
```bash
cd frontend
npm install
npm run dev -- --host
```

L'application sera accessible sur `http://localhost:5173`.

## 📦 Remarques sur le Déploiement
Le frontend a été configuré pour être accessible sur le réseau local (`--host 0.0.0.0`). Si vous rencontrez des problèmes de verrouillage de fichiers (`EBUSY`, `EPERM`) dus à une synchronisation Cloud (ex: Google Drive), il est recommandé de déplacer le projet vers un dossier local physique (ex: `C:\Projets\dlog-osint-app`) avant d'exécuter `npm install`.

## 📄 Licence
Propriété de DLOG - Usage interne et stratégique.
