# Salud Conecta IA - Architecture & Recommendations

This document provides a comprehensive analysis of the "Salud Conecta IA" repository, explaining its core architecture, data flows, key technologies, and provides actionable recommendations to improve the application.

## 1. Architecture Overview

"Salud Conecta IA" is a progressive web application (PWA) built with modern frontend technologies that relies heavily on a Backend-as-a-Service (BaaS) paradigm. It is an "Offline-First" app designed to offer health triage, appointment booking, and clinic mapping even under poor network conditions.

### 1.1 Core Technologies
- **Frontend Framework:** React 19 + Vite.
- **Styling:** Tailwind CSS.
- **State Management:** React Context API (`UserContext`, `NetworkContext`, `LanguageContext`).
- **Backend & Auth:** Firebase (Authentication, Firestore Database).
- **Artificial Intelligence:** Google Gemini (`@google/genai` SDK).
- **Offline Persistence:** Dexie.js (IndexedDB wrapper) for caching data locally.
- **Service Worker:** `vite-plugin-pwa` (Workbox) for caching static assets and managing PWA installation.

### 1.2 Data Flow & Sync Strategy
The application employs a robust offline-first synchronization strategy (implemented via `offlineDatabase.ts` and `syncService.ts`):
1. **Local Writes First:** When a user creates a triage record or books an appointment, the data is primarily written to IndexedDB (via Dexie) and flagged with a `syncStatus: 'pending'`.
2. **Sync Queue:** An entry is added to a `syncQueue` local table.
3. **Background Sync:** Once the device goes online (detected via `NetworkProvider` / `useNetworkStatus.ts`), the `syncService.ts` iterates over the queue. It sends requests to Firestore.
4. **Resolution:** Upon a successful Firebase write, the local IndexedDB record is updated with the real `serverId`, and the sync status changes to `'synced'`. Failed attempts are retried up to 3 times.

---

## 2. Domain & Folder Breakdown (`/src`)

### `/components`
This folder is logically divided by business domains:
- **`auth/`**: Contains the Login component, handling Firebase auth (Google Sign-In).
- **`chat/` & `triage/`**: UI for AI integrations. The `TriageChecker` component relies heavily on Gemini to analyze symptoms.
- **`maps/`**: Uses geolocation services to display nearby health centers (`HealthMap`, `PremiumHealthMap`).
- **`dashboard/` & `registration/`**: Views specific for medical providers, pharmacies, and clinics to manage their status.
- **`membership/`**: Logic for Premium/Free tiers, points config, and activity logs.

### `/lib`
Core utilities and configuration logic:
- **`firebase.ts`**: Initializes Firebase App, Firestore (with offline caching enabled via `persistentLocalCache`), and Auth.
- **`gemini.ts`**: The brain of the AI integrations. It provides daily tips, health assistant chats, and "Smart Triage" using structured JSON prompts.
- **`offlineDatabase.ts`**: Defines the Dexie schemas (`SaludConectaDB`) holding tables like `chatMessages`, `triageRecords`, `appointments`, and `syncQueue`.
- **`geolocationService.ts`**: Computes distances (Haversine formula) to recommend the closest hospital/clinic based on the user's GPS coordinates.

### `/services`
Domain-specific functions mediating between the UI, the offline database, and Firestore:
- **`triageService.ts`**: Highly complex logic. Combines AI triage (from Gemini) with static data (`centros_salud.json`), calculates nearby clinics using user coordinates, and falls back to a local heuristic database (`granadaDatabase.ts`) if the AI fails or hits quota limits.
- **`syncService.ts`**: Consumes `offlineDatabase.ts` queue and syncs payload to Firebase.
- **`appointmentService.ts`**: Interfaces with Firestore for appointments management.

### `/contexts` & `/hooks`
- Provides global state. The most notable is `NetworkContext.tsx` combined with `useNetworkStatus.ts`, which listens to `window.online` and `window.offline` events to trigger PWA UI banners (`OfflineBanner`) and background syncs.

---

## 3. Areas of Improvement & Recommendations

While the application is well-structured and handles offline scenarios gracefully, there are several key areas that can be improved for better performance, maintainability, and scalability.

### 3.1 Code Architecture & Clean Code
- **Separation of Concerns in Services:** Files like `triageService.ts` do too much. It handles AI calls, fallback logic, Haversine geolocation calculations, business rules for members (free vs premium), and formatting strings for the UI.
  - *Action:* Extract geolocation math into pure utility functions. Extract the fallback database logic into a dedicated "LocalTriageStrategy".
- **Magic Strings and Hardcoded Values:** There are hardcoded coordinates (e.g., Granada Centro: `lat: 11.93749, lng: -85.968`) and hardcoded role checks across components.
  - *Action:* Move these to configuration files or constants (`src/constants/`).

### 3.2 Performance & PWA
- **Dexie vs Firestore Caching:** The app currently uses *both* Dexie for offline logic and Firestore's `persistentLocalCache`. This can lead to race conditions or duplicate states if not carefully managed.
  - *Action:* Standardize offline data. Prefer Dexie for temporary "offline actions" (like a draft triage), but rely entirely on Firestore's native offline caching (`getDocsFromCache`, etc.) for reading data. The custom `syncQueue` is great for explicit user actions, but might be reinventing the wheel for simple read/writes.
- **Bundle Size:** Importing the entire `firebase/firestore` and `firebase/auth` modules can bloat the initial load. Vite code-splitting works, but can be optimized.
  - *Action:* Ensure lazy loading is consistently applied not just for routes (which is correctly done in `App.tsx`) but for heavy libraries if they aren't needed immediately.

### 3.3 Artificial Intelligence (Gemini Integration)
- **Prompt Engineering & Schema Validation:** `gemini.ts` asks Gemini to return JSON and parses it manually `JSON.parse(text)`. This is prone to breaking if the AI includes Markdown (e.g., `\`\`\`json ... \`\`\``).
  - *Action:* Strip Markdown wrappers using a regex before parsing, or upgrade to Gemini's latest structured outputs feature to guarantee the schema natively.
- **Error Handling (429 Quota Exceeded):** The current fallback logic drops back to static data if Gemini fails. This is good, but could be enhanced with exponential backoff retries before immediately abandoning the AI call.

### 3.4 UX and UI
- **Loading States:** In `App.tsx`, `isInitializing` locks the entire UI until Firebase Auth finishes checking redirect results.
  - *Action:* Show the app shell immediately with placeholder skeletons so the app feels faster, rather than a full-screen loading spinner.
- **Form Validations:** The `EntityRegistration` flows lack robust schema validation.
  - *Action:* Integrate a library like `Zod` alongside `react-hook-form` to ensure valid data is sent to IndexedDB and Firestore.

---

## 4. Proposed Immediate Next Steps (Roadmap)

If you are looking to advance the application right away, I recommend prioritizing these steps:

1. **Refactor `gemini.ts` JSON parsing:** Make it resilient against Markdown formatting to prevent the AI triage from unexpectedly crashing.
2. **Implement Data Validation (Zod):** Secure your data entry points (Appointments, Registrations) before sending them to Firestore.
3. **Consolidate Offline Strategies:** Review if Firestore's native offline persistence can replace some of the custom Dexie `syncService` logic to reduce technical debt and state management bugs.
4. **Abstract Business Logic from Services:** Clean up `triageService.ts` to make it easily testable via unit tests (Jest/Vitest).
