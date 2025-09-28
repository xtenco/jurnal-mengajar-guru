# Jurnal Agenda Mengajar Guru – Web

A Next.js 15 application that digitizes the daily teaching journal workflow for Indonesian teachers. Sprint 01 focuses on authentication, profile onboarding, and core data masters.

## Tech stack

- Next.js 15 (App Router, React 19, Turbopack)
- TypeScript
- Tailwind CSS 4
- Clerk (authentication)
- Supabase (PostgreSQL, migrations, RLS)
- shadcn/ui component system
- Lucide icons

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in Clerk and Supabase credentials before running the app.
3. Run the development server:
   ```bash
   npm run dev
   ```

## Quality gates

- `npm run lint` – Next.js ESLint config
- `npm run typecheck` – TypeScript no-emit mode
- `npm run format:check` / `npm run format` – Prettier with Tailwind ordering

## Project layout

```
apps/web
├── app          # App Router routes, layouts, styles
├── public       # Static assets
├── .github      # CI workflows (repo root)
└── tasks/prds   # Product docs kept at repo root
```

## Sprint 01 scope

- SP-01: project scaffolding & infrastructure
- SP-02: Supabase migrations & RLS policies
- SP-03: Guru profile onboarding flow
- SP-04: Kelas management CRUD
- SP-05: Mata pelajaran management CRUD
