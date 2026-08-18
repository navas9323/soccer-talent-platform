# CanteraPro — Soccer Talent Platform

Connects soccer players with agents and teams across Latin America. Players
build a digital CV; agents and teams search, shortlist, take private notes,
save searches, and message players. See [`docs/brief.md`](docs/brief.md) for
the full product brief and [`docs/TODO.md`](docs/TODO.md) for the phased
build plan. Design and coding conventions live in [`CLAUDE.md`](CLAUDE.md).

**Stack:** Next.js 16 (App Router, TypeScript) · Tailwind CSS v4 · Prisma +
PostgreSQL · Auth.js (NextAuth v5, credentials) · Zod

## Cómo ejecutar el proyecto (Phase 0)

### 1. Requisitos

- Node.js 20+
- PostgreSQL 14+ (local install, Docker, or a hosted instance)

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

Copy the example env file and point `DATABASE_URL` at your Postgres instance:

```bash
cp .env.example .env
```

If you don't already have a local Postgres running, the quickest option is
Docker:

```bash
docker run --name canterapro-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=soccer_talent -p 5432:5432 -d postgres:16
```

That matches the default `.env.example` connection string
(`postgresql://postgres:postgres@localhost:5432/soccer_talent?schema=public`).
Also set `AUTH_SECRET` in `.env` (generate one with `openssl rand -base64 32`).

### 4. Crear las tablas (migración)

```bash
npm run db:migrate
```

This applies `prisma/migrations` and generates the Prisma Client.

### 5. Cargar datos de demostración

```bash
npm run db:seed
```

Creates an admin, two agents, and four players with full CVs (stats,
achievements, videos, team history), a shortlist, private notes, a saved
search, a messaging conversation with an attachment, and notifications.

Demo accounts (password for all: `Demo1234!`):

| Rol      | Correo                                |
| -------- | -------------------------------------- |
| Admin    | `admin@canterapro.demo`                |
| Agente   | `agente@canterapro.demo`               |
| Agente   | `scout@canterapro.demo`                |
| Jugador  | `santiago.medina@canterapro.demo`      |
| Jugador  | `valentina.rojas@canterapro.demo`      |
| Jugador  | `mateo.pereira@canterapro.demo`        |
| Jugador  | `isabella.torres@canterapro.demo`      |

### 6. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Try:

- `/` — landing page
- `/jugadores` — approved player profiles (seeded data)
- `/iniciar-sesion` — log in with any demo account above
- `/registrarse` — create a new account and pick "Jugador" or "Agente / Equipo"
- `/panel` — protected dashboard (role-aware: player / agent / admin views)

### Other useful commands

```bash
npm run lint        # ESLint
npx tsc --noEmit    # Type-check
npm run build        # Production build
npm run db:studio    # Prisma Studio (visual DB browser)
```

## Learn More

This is a [Next.js](https://nextjs.org) project. See the
[Next.js documentation](https://nextjs.org/docs) for framework details.
