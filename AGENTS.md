# Repository Guidelines

## Project Structure & Module Organization
- App code lives in `src/app` (Next.js App Router). UI components are in `src/components` (PascalCase). Shared logic in `src/lib`, `src/utils`, hooks in `src/hooks`, types in `src/types`, and static data in `src/data`.
- Public assets are in `public/`. E2E tests are in `tests/`. Deployment/config sits at the root (`next.config.js`, `vercel.json`, `.env*`).
- Use path alias `@/` for imports from `src` (e.g., `import { env } from '@/lib/env'`).

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server.
- `npm run lint` — ESLint with Next + TypeScript rules; fix warnings before PR.
- `npm run build` — Production build; triggers sitemap via `postbuild`.
- `npm start` — Serve the built app.
- `npm run analyze` — Build with bundle analyzer enabled.
- E2E: `npx playwright test` or `npx playwright test tests/line-notification.spec.ts` (add `--headed` for visible browser).

## Coding Style & Naming Conventions
- Language: TypeScript. Prefer server components by default; use `"use client"` only when required.
- Indentation: 2 spaces. Keep functions small and composable. Avoid `any` (lint warns). Prefix intentionally unused variables with `_`.
- Files: Components `PascalCase.tsx`; hooks `useX.ts`; utilities/data `kebab-case.ts`; types/interfaces named `PascalCase` in `src/types`.
- Images: prefer Next Image; `img` usage is lint-warned unless justified.
- Use `@/` imports rather than long relative paths.

## Testing Guidelines
- Framework: Playwright (`@playwright/test`). Place specs under `tests/*.spec.ts` and name by feature (e.g., `chat.spec.ts`).
- Run all tests with `npx playwright test`; run a single spec by file path. Use `--headed` and screenshots for debugging.
- Note: Existing specs may hit production endpoints; run intentionally and document any external dependencies.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `perf:`, `ci:`.
- PRs must include: clear intent, linked issues, screenshots for UI changes, test steps, and any env/config changes. Ensure `npm run lint` and relevant tests pass.

## Security & Configuration Tips
- Never commit secrets. Add env vars in `.env.local` (see `.env.example`). Review `VERCEL_ENV_VARIABLES.md`, `UPDATE_API_KEYS.md`, and `sendgrid-setup.md` before changing keys.
- Headers/SEO are managed in `next.config.js`; sitemaps via `next-sitemap.config.js` after build.
