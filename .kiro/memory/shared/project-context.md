# Project Context: thiep-cuoi

- **Type**: knowledge
- **Created**: 2026-07-29
- **Updated**: 2026-07-29
- **Last Accessed**: 2026-07-29
- **Relevance**: high
- **Tags**: #project-context #codebase-analysis

## Overview

Ứng dụng **thiệp cưới online mobile-first** viết bằng Next.js 14 (App Router).

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript 5 (strict), React 18 |
| Framework | Next.js 14.2.35 — App Router |
| UI/Styling | Tailwind CSS 3.4, Framer Motion 11 |
| Database | SQLite via Prisma ORM 6.14 |
| Validation | Zod 3.23 |
| Auth | HTTP Basic Auth (custom middleware) |
| Linter | ESLint 8 + next/core-web-vitals |
| Formatter | Prettier 3 + prettier-plugin-tailwindcss |

## Project Structure

```
app/                    # Next.js App Router
├── layout.tsx          # Root layout (lang="vi")
├── page.tsx            # Default invitation page
├── [guestSlug]/        # Personalized guest pages
├── admin/              # Admin dashboard (Basic Auth protected)
└── api/                # Route Handlers (calendar, guests, rsvp, wishes)

components/
├── InvitationPageClient.tsx  # Main client component
├── sections/           # 11 content sections
├── common/             # FallingPetals, MusicPlayer, RevealOnScroll
└── ui/                 # Button, Input, Modal, Skeleton, Toast

config/
├── site.config.ts      # All invitation content (names, dates, events, bank)
└── theme.config.ts     # Shared gradient/card classes

hooks/                  # useAudio, useCountdown
lib/                    # db, admin-auth, validations, rate-limit, slug, calendar, utils
prisma/                 # schema.prisma + seed.ts (SQLite)
```

## Data Models (Prisma)

- **Guest**: id, name, slug (unique), side, phone, maxSeats, viewCount → 1:1 Rsvp
- **Rsvp**: guestId (unique nullable), name, attending, seats, message
- **Wish**: name, content, approved (default false)

## Code Conventions

- Identifiers: English
- Comments & user messages: Vietnamese
- Files: PascalCase.tsx (components), camelCase.ts / kebab-case.ts (lib/hooks)
- Exports: named export (components/utils), default export (pages/layouts)
- Client Components: only when needed (state/effect/audio)
- Import alias: `@/*` → project root
- Validation: all user input via Zod schemas

## Build Commands

```bash
npm run dev           # Development server
npm run build         # Production build
npm run lint          # ESLint
npm run format        # Prettier
npm run prisma:push   # Push schema to DB
npm run prisma:seed   # Seed sample guests
```

## Known Issues (from .specs/codebase-analysis.md)

1. `/api/rsvp` leaks data publicly (no auth check)
2. Password comparison not constant-time
3. Race condition in slug generation
4. SQLite incompatible with Vercel (need Postgres)
5. No tests, no CI
6. Metadata hardcoded in layout.tsx (should use siteConfig)
7. Placeholder images (SVG)

## Reference

Full analysis: `.specs/codebase-analysis.md`
