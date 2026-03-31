# Fitness Member Management Frontend

Frontend web app for managing gym memberships and check-ins.

- Framework: React + TypeScript
- Bundler: Vite
- Testing: Vitest + React Testing Library
- API: Axios/fetch client to backend (shared HTTP service in `src/lib/api-client.ts`)

## Key Features

- Sign-in and authentication (`src/features/auth`)
- Member CRUD (`src/features/members`)
- Membership assignment and cancellation
- Check-in logging
- Reusable UI components (`src/components/ui`)
- Public and private routes (`src/router`)

## Requirements

- Node.js 20+ (recommended)
- npm

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Production Build

```bash
npm run build
```

## Tests

```bash
npm run test
```

(Uses `vitest` and `@testing-library/react`.)

## Folder Structure

- `src/pages`: App views
- `src/components`: UI and high-level components
- `src/features`: Feature domains (auth, members)
- `src/hooks`: Custom hooks
- `src/lib`: API client and shared utilities
- `src/router`: Route config and private route components
- `src/types`: TypeScript types

## Environment Setup

Env variables can be defined in `.env` as specified in `.env.example`

```env
VITE_API_URL=
VITE_API_PREFIX=
VITE_API_VERSION=
```
