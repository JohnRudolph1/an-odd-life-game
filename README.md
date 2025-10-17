# TransparentSee Vet Rating App

TransparentSee is an Angular 20 application paired with a lightweight Express backend proxy. It helps pet parents compare veterinarians, view community-sourced pricing, and rate their experiences without exposing private API keys.

## Prerequisites

- Node.js **22.18.0**
- npm **10.9.3**
- Angular CLI **20.1.5** (`npm install -g @angular/cli@20.1.5`)

## Project structure

```
/README.md            → setup guide and dependency map
/angular.json         → Angular CLI configuration
/package.json         → Frontend dependencies & scripts
/src/                 → Angular application source
/server/              → Express proxy + community JSON data API
```

## Installation & setup

1. **Backend dependencies**
   ```bash
   cd server
   npm install
   cp .env.sample .env
   # edit .env and set YELP_API_KEY=your_yelp_api_key
   ```

2. **Frontend dependencies**
   ```bash
   cd ..
   npm install
   ```

3. **Firebase configuration**

   Edit `src/environments/environment.ts` and `environment.prod.ts` with your Firebase Email/Password project values:

   ```ts
   export const environment = {
     production: false,
     firebase: {
       apiKey: 'YOUR_KEY',
       authDomain: 'YOUR_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_BUCKET',
       messagingSenderId: 'YOUR_SENDER',
       appId: 'YOUR_APP_ID',
     },
     apiBaseUrl: 'http://localhost:3000/api',
   };
   ```

## Running the apps

Open **two terminals** (Windows users can use separate PowerShell instances).

### Terminal 1 – backend API

```bash
cd server
npm run server
```

- Loads environment variables from `.env`
- Proxies Yelp requests safely and serves the community data API on `http://localhost:3000`

### Terminal 2 – Angular frontend

```bash
# from the project root
npm start
```

- Serves the Angular app at `http://localhost:4200`
- The CLI automatically reconnects to the backend at `http://localhost:3000/api`

### Combined helper script

From the project root you can run:

```bash
npm run dev:all
```

This prints a reminder to start the backend and frontend in two terminals.

## Proxy endpoints

The Express API exposes safe proxy routes to hide the Yelp API key:

- `GET /api/yelp/search?location=<city or zip>&sort_by=<best_match|rating|review_count|distance>`
- `GET /api/yelp/business/:id`

Community data routes (persisted in `server/data/db.json`):

- `GET /api/vets`
- `GET /api/vets/:id`
- `POST /api/vets` – create manual vet entries (name + address required)
- `POST /api/vets/:id/services` – body `{ serviceName: string; price: number }`
- `POST /api/vets/:id/ratings` – body `{ rating: number }`

## Troubleshooting

| Issue | Fix |
| ----- | --- |
| **CORS errors in the browser** | Confirm the backend is running on `http://localhost:3000` and the `.env` file is present. |
| **`FirebaseError: Firebase: Error (auth/... )`** | Ensure Firebase Email/Password sign-in is enabled and the environment files contain valid keys. |
| **`ng` command not found** | Install the Angular CLI globally: `npm install -g @angular/cli@20.1.5`. |
| **`NG0100: Expression has changed` warnings** | Make sure forms import `FormsModule` (already configured in `AppModule`). |
| **`mat-*` components not recognized`** | Verify `MaterialModule` exports include the needed Angular Material component (e.g., add `MatTableModule` for new tables). |
| **`Cannot find module fs-extra/esm`** | Run `npm install` in the `server/` folder to pull in backend dependencies. |

## Dependency map (change impact matrix)

The following cross-file relationships are critical when refactoring:

- **Routing changes** – Updating routes in `src/app/app-routing.module.ts` must stay in sync with navigation links in:
  - `src/app/layout/main-layout/main-layout.component.html`
  - `README.md` run instructions for available pages
- **Yelp data contracts** – Editing interfaces in `src/app/models/yelp.models.ts` requires updates to:
  - `src/app/services/yelp.service.ts`
  - `src/app/components/yelp-vet-list/yelp-vet-list.component.ts`
  - `src/app/components/vet-detail/vet-detail.component.ts`
- **Community vet schema** – Changes in `src/app/models/vet.models.ts` propagate to:
  - `src/app/services/vet.service.ts`
  - Backend helpers in `server/utils/db.js`
  - Express routes in `server/routes/vets.js`
  - UI components (`community-vet-list`, `vet-detail`, `add-price`, `rate-vet`)
- **Auth service API** – Renaming methods in `src/app/services/auth.service.ts` requires touching:
  - `src/app/guards/auth.guard.ts`
  - `src/app/layout/main-layout/main-layout.component.ts`
  - Auth components (`login`, `signup`)
- **Material module exports** – Any new Angular Material component usage must be reflected in `src/app/shared/material.module.ts` to avoid missing module errors.

## How to run

```bash
# Terminal 1 (server)
cd server
npm i
cp .env.sample .env   # then put YELP_API_KEY=...
npm run server

# Terminal 2 (frontend)
# open a new terminal at the project root
npm i
ng serve -o
```
