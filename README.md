# Infranova Global Concept Ltd — Corporate Portal & Management Suite

Official corporate holding portal and administrative platform governing **Infranova Pure Soya Oil** (Agro-Allied Processing) and **Infranova Properties** (Civil Engineering & Luxury Real Estate).

## Overview & Structure

The repository is built as a production-grade, modular web portal:

### 1. Frontend (`frontend/public/`)
- `index.html` — **Parent Holding Entity Portal**: Strategic presentation of the holding group with direct entrance pathways into operating subsidiaries.
- `soya.html` — **Infranova Pure Soya Oil**: Agro-processing milling complex, nutritional profiles, industrial & retail packaging specifications.
- `distributor.html` — **Distributor Onboarding**: Lead generation form with async database capture and pre-populated WhatsApp transmission for wholesale partners.
- `properties.html` — **Infranova Properties Portfolio**: Catalog with state/LGA location filters, property classification, price range sorting, and list/grid views.
- `property-details.html` — **Property Showcase**: High-resolution gallery, interactive video tour modal, architectural specifications, mortgage/ROI calculator, and inspection booking modal.
- `admin.html` — **Unified Admin Dashboard**: Tabbed administrative suite to manage:
  - Property Inventory (creation, editing, deletion, image/video uploads)
  - Inspection Appointments (status workflow, direct WhatsApp contact)
  - Distributor Applications (review, status tracking, direct contact)
- `css/common.css` — Shared luxury brand design system (Deep Brown `#2E1A0D`, Gold `#A9895D`, Olive `#5B6B3A`).

### 2. Backend (`backend/`)
- **Runtime**: Node.js & Express.
- **Dual-Mode Storage**: Connects to MongoDB when available with automatic zero-downtime fallback to local JSON file persistence (`backend/src/data/`), ensuring complete offline functionality.
- **REST APIs**:
  - `/api/properties` — Full CRUD, advanced query filters (city, type, status, price range), sorting.
  - `/api/bookings` — Inspection scheduling and administrative review.
  - `/api/distributors` — Distributor lead ingestion and tracking.
  - `/api/admin` — Token-based authentication (JWT).
  - `/api/upload` — Multer-powered media upload pipeline for property photography and video tours.

## Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm start
```
The server will boot on `http://localhost:5000`.

### 2. Run API Test Suite
```bash
cd backend
node src/scripts/test-api.js
```

### 3. Open Frontend
Open `frontend/public/index.html` or `frontend/public/admin.html` directly in your browser or serve via any static web server (e.g. `npx serve frontend/public`).

Default Admin Credentials:
- **Username**: `admin`
- **Password**: `infranova2026`

## Implementation Status
- [x] Parent Holding Portal (`index.html`)
- [x] Agro-Allied Processing Subsidiary (`soya.html`)
- [x] Nationwide Distributor Onboarding (`distributor.html`)
- [x] Luxury Real Estate Catalog & Nigerian Location Filter (`properties.html`)
- [x] Property Detail Showcase & Inspection Booking (`property-details.html`)
- [x] Tabbed Admin Management Suite (`admin.html`)
- [x] Express REST API with Dual-Mode (MongoDB + Offline JSON Store)
- [x] Automated 12-point API test suite (`test-api.js`)
- [ ] Payment Gateway Integration (Paystack / Flutterwave)
- [ ] Production Deployment (Vercel + Render / Docker)

