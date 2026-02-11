# Seat Swap App

Production-ready Firebase + React application for seat moves and swaps on commercial flights.

## Stack
- React + TypeScript + Vite
- Tailwind + shadcn style primitives
- Firebase Auth, Firestore, Cloud Functions, Hosting
- TanStack Query + React Hook Form + Zod
- Vitest + Playwright + Storybook

## Repository Layout
- `apps/web`: frontend SPA
- `functions`: Cloud Functions and seed script
- `stories`: Storybook stories
- Root Firebase config and security rules

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env:
   ```bash
   cp .env.example .env
   ```
3. Fill Firebase web SDK keys and `AVIATIONSTACK_API_KEY`.

## Firebase Project Setup
1. Create Firebase project.
2. Enable Authentication providers: Email/Password and Google.
3. Create Firestore in production mode.
4. Deploy rules and indexes:
   ```bash
   firebase deploy --only firestore
   ```

## Emulators
```bash
npm run emulators
```

## Seed Data
```bash
npm run seed
```
Creates admin/demo users, default template, a demo flight, seats, and initial assignments.

## Development
```bash
npm run dev
```

## Testing
```bash
npm run test
npm run test:e2e
```

## Deployment
```bash
npm run build
firebase deploy
```

## Architecture Overview
- `searchFlightAndUpsert` calls aviationstack free API and caches normalized flight metadata in `/flights/{flightId}`.
- If API fails or rate limit is hit, function falls back to cached flight record.
- Seats and assignments live only in Firestore and are mutated via transactional callable functions.
- Frontend reads seat docs in real-time and sends seat actions only through callable functions.

## Cache + Rate Limit Behavior
- First search of a flight writes source payload into Firestore cache.
- Subsequent searches reuse cached metadata if API returns errors.
- Users are linked to searched flights at `/users/{uid}/myFlights/{flightId}`.

## Security Model
- Auth required for reads.
- Passengers cannot directly write seats/assignments/swap docs.
- Admin-only creation/assignment/generation callable functions.
- Access to flight docs is constrained by user-flight linkage.
