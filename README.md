# 🏥 BCH 360° Intelligence V.10

**Hospital AI Executive Dashboard** — ระบบ Dashboard สำหรับผู้บริหารโรงพยาบาล  
เชื่อมต่อ HOSxP XE Live + AI Analytics 11 Modules

## 📋 Quick Start

### Development (แก้ไขโค้ด)

```bash
npm run dev
```

- Frontend: <http://localhost:4001> (Vite HMR — hot reload, proxies `/api` to backend)
- Backend API: <http://localhost:4000>

### Production (ใช้งานจริง — Auto Deploy)

```bash
npm run production
```

- Dashboard: <http://localhost:3000>
- Network:   http://{LAN_IP}:3000
- Auto rebuild เมื่อแก้ไข `src/` หรือ `server/`

## 🏗️ Architecture

```
src/            → Frontend (React + Vite + Tailwind)
server/         → Backend (Express + MySQL + Socket.IO)
  ├── server.js     → Main API (2,300+ lines, 150+ endpoints)
  ├── production.js → Auto-deploy watcher
  ├── db/           → MySQL connection pool (HOSxP XE)
  ├── ai/           → AI modules (EWS, Forecast, DRG, etc.)
  ├── routes/       → Finance, IPD, Clinical, Auth
  └── middleware/    → RBAC, Audit, FHIR
dist/           → Built frontend (auto-generated)
```

## 🔧 Configuration

Copy `.env.example` → `.env` แล้วตั้งค่า:

```bash
cp .env.example .env
```

## 📊 Tabs & Modules

| Tab | Description |
|-----|------------|
| Dashboard | ภาพรวม Revenue, OPD, IPD, ER, Beds |
| OPD | Wait Time Analytics, SQI, Hourly Patterns |
| IPD | Bed Management, LOS, Readmission, EWS |
| ER | Triage, Time-to-Doctor, Surge Prediction |
| Finance | Revenue, DRG, Claims, Payment Variance |
| Clinical | EWS/NEWS2, Drug Interactions, Mortality Risk |
| Dental | แผนกทันตกรรม Analytics |
| Thai Med | แพทย์แผนไทย Analytics |
| Phys Therapy | กายภาพบำบัด Analytics |
| NCD | โรคเรื้อรัง (DM, HT, IHD, Stroke, COPD, CKD) |

## 🧠 AI Modules

1. NEWS2 EWS — Early Warning Score
2. Revenue Forecast — Holt-Winters
3. Readmission Risk Prediction
4. Bed Demand Forecasting
5. DRG Optimizer
6. ER Surge Prediction
7. LOS Predictor
8. Billing Anomaly Detection
9. ER Admission Prediction
10. ER Wait Time Forecast
11. Under-charging Detection

## 🗃️ Database

- **HOSxP XE** (MySQL) — app-local replica at `10.109.0.33:3306` (config via `MYSQL_HOST` env)
- Database: `bchhosxpxe`
- Connection pool: 30 connections, auto health check every 30s

## 📦 Stack

- **Frontend**: React 18 + Recharts + Tailwind CSS
- **Backend**: Express 4 + Socket.IO + mysql2
- **AI**: Custom analytics engines (Node.js)
- **Build**: Vite 5 + esbuild
- **Runtime**: Node.js v24+
