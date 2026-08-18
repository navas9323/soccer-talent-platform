# Build plan

Phased implementation plan for the Soccer Talent Platform. See
[`docs/brief.md`](brief.md) for the product requirements and
[`CLAUDE.md`](../CLAUDE.md) for stack/conventions.

## Phase 0 — Scaffold ✅

- [x] Scaffold Next.js + TypeScript + Tailwind CSS project (App Router, `src/` dir)
- [x] Prisma + PostgreSQL configured, full schema covering:
      users with player/agent/admin roles, player CV fields (§1: personal
      info, positions/play style, career stats, achievements, videos,
      team history, availability), shortlists, private notes, saved
      searches, messaging (conversations/messages/attachments/notifications),
      subscriptions
- [x] Auth.js (NextAuth v5) with email/password (credentials) registration
      and role selection at signup, JWT sessions, protected `/panel` route
      via `src/proxy.ts`
- [x] Base layout in Spanish with the design direction from `CLAUDE.md`
      (dark pitch-green/sky-blue palette, Navbar/Footer, landing page,
      login/register pages)
- [x] Seed script with demo data (admin, agents, players with full CVs,
      shortlist, notes, saved search, messages, notifications)
- [x] README with exact run/preview instructions

## Phase 1 — Player CV & profile management

- [ ] Player profile creation/edit form covering all §1 fields
- [ ] Video link management (YouTube/Vimeo embeds), enforce Basic (1-2) vs
      Premium (5) video limits
- [ ] Career stats, achievements, and team history CRUD
- [ ] Public player profile page

## Phase 2 — Search & discovery

- [ ] Search filters (§3): position, age range, country/location, skill
      level, height/weight, career stats, availability
- [ ] Free-text keyword search (§4) across profiles
- [ ] Shortlists UI (§2)
- [ ] Private notes UI (§2)
- [ ] Saved searches UI (§2)

## Phase 3 — Messaging

- [ ] Conversation list + thread UI
- [ ] Text messages, PDF/image attachments (§5)
- [ ] In-app + push notifications for unread messages

## Phase 4 — Membership & billing

- [ ] Stripe subscriptions (Basic free / Premium paid), LatAm currencies + USD (§6)
- [ ] Plan-gated features (video limits, priority visibility, full agent toolset)

## Phase 5 — Admin dashboard

- [ ] Moderate profiles and uploaded content (approve/flag) (§7)
- [ ] Monitor user activity and performance metrics

## Phase 6 — Polish & i18n readiness

- [ ] Animations/hover states pass, accessibility audit
- [ ] Architecture check for additional languages beyond Spanish (§8)
