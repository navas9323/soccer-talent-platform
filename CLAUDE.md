@AGENTS.md

# Soccer Talent Platform

A web platform connecting soccer players with agents and teams across Latin
America. Players build a digital CV (stats, videos, achievements, team
history); agents and teams search, shortlist, take private notes, save
searches, and message players. See `docs/brief.md` for the full product
brief and `docs/TODO.md` for the phased build plan.

## Tech stack

- **Next.js 16** (App Router, TypeScript, `src/` dir) — see `README.md` for
  version-specific API notes pulled from `node_modules/next/dist/docs/`.
- **Tailwind CSS v4** — theme tokens declared inline in
  `src/app/globals.css` via `@theme`, no `tailwind.config.js`.
- **Prisma + PostgreSQL** — schema in `prisma/schema.prisma`, seed script in
  `prisma/seed.ts`.
- **Auth.js (NextAuth v5)** — credentials (email/password) provider, Prisma
  adapter, JWT sessions. Config in `src/auth.ts`.
- **Zod** for input validation (`src/lib/validations/`).

## Conventions

- **Language**: all user-facing UI copy is in neutral Latin American
  Spanish (§8 of the brief). Route segments and page copy use Spanish
  (`/iniciar-sesion`, `/registrarse`, `/panel`). Code (variables, types,
  comments) stays in English.
- **Roles**: `PLAYER`, `AGENT`, `ADMIN` (see `Role` enum in the Prisma
  schema). Role is chosen at signup and stored on `User.role`; session
  callbacks in `src/auth.ts` expose it as `session.user.role`.
- Prefer editing the Prisma schema + `prisma generate` over ad-hoc types.
- Keep private data private in queries: agent `Note`s are only ever
  fetched filtered by `authorId === session.user.id`.

## Design direction (§9 of the brief)

Modern, bold, professional — closer to a sports-media product (Tonsser,
Behance-style portfolios, LinkedIn's information density) than a generic
SaaS admin panel.

- **Palette** — dark-first UI: near-black backgrounds (`--color-night-*`)
  make video thumbnails, photos, and stats pop. A vivid **pitch green**
  (`--color-pitch-*`) is the primary action/brand color (buttons, active
  nav, highlights). A **sky blue** (`--color-sky-*`) is the secondary
  accent (links, info badges, secondary CTAs). Tokens live in
  `src/app/globals.css` under `@theme`.
- **Typography** — bold, large headings; generous whitespace; UI chrome
  stays minimal so media (video embeds, profile photos, stat blocks) is
  the visual focus.
- **Motion** — subtle transitions/hover states on interactive elements
  (cards lift slightly, buttons shift shade, nav underlines animate).
  Nothing that delays task completion — motion is polish, not a gate.
  Real-time notification badges should animate in (pulse/scale), not pop
  abruptly.
- **Components** — build small, reusable pieces in `src/components/`
  (`Button`, `Card`, `Badge`, `Navbar`, etc.) rather than repeating
  Tailwind class soups across pages.

## Running the app

See the "Cómo ejecutar el proyecto" section of `README.md` for exact
commands (install, database, migrate, seed, dev server).
