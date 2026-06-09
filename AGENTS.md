<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — start dev server on port 3000
- `npm run build` — production build
- `npm run lint` — ESLint (the only check; no typecheck/prettier/test scripts)
- `npx prisma generate` — regenerate Prisma client (required after schema changes)

## Architecture

- **Next.js 16.2.7** with React 19.2.7. Breaking changes vs older Next.js — always check `node_modules/next/dist/docs/` first.
- **Two independent root layouts** — no `src/app/layout.tsx` exists. Route groups `(front)/layout.tsx` (main app + navbar) and `(auth)/layout.tsx` (login/signup, no navbar) each render their own `<html>` + `<body>`. Never add a shared root layout without refactoring both.
- Both layouts import `../globals.css`. The `(front)` layout wraps `<Navbar />` in `<Suspense>`.
- **Shadcn UI** with `radix-luma` style + Remixicon. New components go in `src/components/ui/`. Page-specific components live in `src/app/(front)/components/`.

## Database (Prisma v7 + MariaDB)

- **MariaDB 11.8** via Docker (not MySQL despite schema `provider = "mysql"`). Docker setup: `docs/install_mariadb_with_docker.txt`.
- **Prisma v7 with driver adapter**: `@prisma/adapter-mariadb` in `src/lib/prisma.ts:3-6`. Prisma client uses adapter pattern, not direct datasource URL.
- **Generated client path**: `generated/prisma/client` (not `node_modules/@prisma/client`). Import from `../../generated/prisma/client` or relative path from within `src/`.
- `prisma.config.ts` loads `.env` via `dotenv/config` — required for Prisma to pick up `DATABASE_URL`.
- **Schema is introspected from an existing DB** — models follow the DB's snake_case naming (`categories`, `products`, `order_items`, etc.), not Prisma/PascalCase conventions. Do not rename to PascalCase — that would break the mapping.
- No migrations directory — the DB is managed externally (SQL DDL in `docs/create_table_ecom_sql.txt`). `npx prisma db push` only if you know what you're doing.

## Auth (better-auth)

- `better-auth` 1.6.11 with email/password. Server: `src/lib/auth.ts`. Client: `src/lib/auth-client.ts`.
- API catch-all: `src/app/api/auth/[...all]/route.ts` via `toNextJsHandler(auth)`.
- Login flow: `authClient.signIn.email()`, signup: `authClient.signUp.email()`. Both redirect manually on success.
- `.env` holds `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL=http://localhost:3000`.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (NOT v3 `tailwindcss/plugin`). globals.css imports `tw-animate-css` and `shadcn/tailwind.css`. Dark mode via `.dark` class.
- Utility: `cn()` from `@/lib/utils` for merging Tailwind classes.

## State

- **Zustand cart** in `src/lib/cart-store.ts` — persists to `localStorage` key `skill-cart`. Import via `useCartStore`.

## External API

- Course data fetched from `https://api.codingthailand.com/api/course` in `src/services/course.service.ts`. Requires internet access at runtime.
- Image host allowed in `next.config.ts`: `api.codingthailand.com`, `www.fffuel.co`.

## Conventions

- App UI language is Thai (`lang="th"`, Thai text, Thai comments). Keep user-facing text in Thai.
- Next.js 16 specifics used: `cacheComponents: true` in config, `await connection()` for dynamic opt-in in `src/app/(front)/product/page.tsx:17`.
- No test framework, no CI, no pre-commit hooks. Linting only via `npm run lint`.

## ข้อกำหนดหลักของการเขียนโค้ด
- แยก TypeScript Type ทุกอย่าง ออกไปไว้ที่โฟลเดอร์ src/types
- การตั้งชื่อไฟล์ TypeScript (.ts) ให้ตั้งตามตัวอย่างนี้ คือ course-service.ts
- ห้ามใช้คำสั่ง npx prisma db push