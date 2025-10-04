# ☀️ SunSpot Berlin — Product Requirements Document (PRD)

## 1. Overview
SunSpot helps users find cafés in Berlin where the sun is shining on the terrace or window at a given time. The MVP focuses on **basic sunlight calculation + map/list view + simple reserve links**.  

---

## 2. Goals
- Provide users with real-time information about which cafés are sunny **right now** or later today.  
- Show a simple list/map with “Now Sunny” or “Sunny from X–Y”.  
- Allow users to click a button to **reserve a table (external link)** or open directions.  

---

## 3. Non-Goals
- Full booking integrations (e.g., OpenTable API).  
- Push notifications.  
- Complex personalization.  
- Full weather forecasting (just basic cloudy/rainy warning if possible).  

---

## 4. Target Users
- Berlin residents and tourists who want to enjoy coffee/drinks in the sun.  
- Early adopters in 1–2 neighborhoods (Kreuzberg, Prenzlauer Berg).  

---

## 5. Key Features (MVP)

### 5.1 Café Data
- Store cafés in a simple JSON/DB with:  
  - `name`, `lat`, `lon`, `terrace_orientation_deg`, `reserve_url`, `opens_at`, `closes_at`, `photo_url`, `neighborhood`.

### 5.2 Sun Calculation
- Use **SunCalc (JS library)** to calculate sun position (elevation, azimuth).  
- Define “Sunny” when:  
  - Elevation ≥ 10°  
  - Azimuth within ±35° of terrace orientation.  
- Output:  
  - Badge: **Now Sunny**  
  - OR “Sunny from 17:30–18:10” (next slot today).

### 5.3 User Interface
- **Option A (simplest):** List view sorted by “Now → Soon → Later.”  
- **Option B (nice-to-have):** Map view with pins.  
- Each café card shows: photo, name, neighborhood, badge, reserve button.

### 5.4 Actions
- Button: **Reserve** (opens `reserve_url` in new tab).  
- Button: **Directions** (opens Google Maps with café coordinates).  

### 5.5 Optional (if simple)
- Weather API check: if >80% cloud coverage or raining, show banner “Cloudy today – sun unlikely.”  

---

## 6. User Flow
1. User opens app.  
2. App requests location (optional).  
3. List/map of nearby cafés appears.  
   - “Now Sunny” cafés on top.  
   - Others show “Sunny from X–Y.”  
4. User taps café → sees details → clicks **Reserve** or **Directions.”  

---

## 7. Tech Stack (suggested)
- **Frontend:** React (Next.js) or Vite.  
- **Backend:** Lightweight Node.js/Express (or skip backend, compute in frontend).  
- **Data:** JSON file or small DB (Postgres/Firestore).  
- **APIs:**  
  - SunCalc (sun position)  
  - OpenWeather (optional, for clouds/rain).  
- **Maps:** MapLibre GL (free) or Google Maps embed.  

---

## 8. Metrics for Success
- **Usage:** 1000+ unique visitors in first month.  
- **Engagement:** ≥2 café views per session.  
- **Conversion:** ≥10% clicks on “Reserve” or “Directions.”  

---

## 9. Roadmap (prioritized)

**Phase 1 (2–3 weeks)**  
- Static JSON with 10 cafés.  
- SunCalc integration.  
- List view (Now / Soon / Later).  
- Reserve + Directions buttons.  

**Phase 2 (1–2 months)**  
- Expand to 50–100 cafés.  
- Add Map view.  
- Add basic weather check.  

**Phase 3 (later)**  
- Add push notifications (“Your favorite café is sunny now”).  
- Full booking API integration.  
- Monetization via affiliate links.  
