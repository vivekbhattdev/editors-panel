# Editors Panel

A small **SvelteKit** app for browsing and editing articles: a list with search and status filters, create and update flows through a modal, article detail with rendered markdown, and JSON API routes backed by an **in-memory** store with mock seed data. Article data does not persist across server restarts unless you replace the store with a real backend.

## Stack

- [SvelteKit](https://kit.svelte.dev/) 2 · [Svelte](https://svelte.dev/) 5 (runes) · TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`, typography and forms plugins)
- [Vitest](https://vitest.dev/) for unit tests (Node) and optional Svelte component tests (browser)
- [Playwright](https://playwright.dev/) for end-to-end tests
- [Zod](https://zod.dev/) · [marked](https://marked.js.org/) · [isomorphic-dompurify](https://github.com/kkomelin/isomorphic-dompurify) · [@lucide/svelte](https://lucide.dev/)

## Prerequisites

- [Node.js](https://nodejs.org/) 18.13 or newer (SvelteKit engine requirement)

## Setup

```sh
npm install
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server (default [http://localhost:5173](http://localhost:5173)) |
| `npm run dev -- --open` | Dev server and open the app in a browser |
| `npm run build` | Create a production build |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Run `svelte-kit sync` and `svelte-check` |
| `npm run lint` | Prettier (check) and ESLint |
| `npm run format` | Format the repo with Prettier |
| `npm run test:unit` | Vitest in watch mode |
| `npm run test:unit -- --run` | Vitest single run |
| `npm run test:e2e` | Install Playwright browsers if needed, then run `e2e/**/*.e2e.{ts,js}` against `build` and `preview` on port **4173** |
| `npm test` | Run unit tests once, then e2e tests |

## Testing

### Vitest

Configuration is in `vite.config.ts` with two projects:

- **server** — Node environment. Matches `src/**/*.{test,spec}.{js,ts}` but excludes `*.svelte.spec.*` (utilities, stores, plain TS tests).
- **client** — Browser (Chromium via Playwright). Matches `src/**/*.svelte.{test,spec}.{js,ts}`.

To run only Node tests (skips the browser project):

```sh
npx vitest --project server --run
```

If Vitest’s browser project fails because browsers are missing:

```sh
npx playwright install chromium
```

### Playwright (e2e)

- Test files: `e2e/**/*.e2e.{ts,js}` (`testMatch` in `playwright.config.ts`).
- Before tests, `webServer` runs `npm run build && npm run preview` on **http://127.0.0.1:4173** (or localhost on that port).

If you run tests manually against **`npm run dev`** on **5173**, point `page.goto` at that origin. The default `npm run test:e2e` flow uses the preview server on **4173**.

## Project layout

- `src/routes/` — App pages and layouts (`/articles`, `/articles/[id]`, demo routes)
- `src/routes/api/articles/` — List `GET` / `POST` and per-id `GET` / `PUT` / `DELETE`
- `src/lib/components/` — UI (article panel, modal, layout, shared inputs)
- `src/lib/store/article.ts` — In-memory articles and CRUD helpers
- `src/lib/mocks/article.ts` — Seed articles
- `e2e/` — Playwright end-to-end tests

## Deploying

The project uses `@sveltejs/adapter-auto`. For production, choose an [adapter](https://svelte.dev/docs/kit/adapters) that matches your host and follow the SvelteKit deployment guide for that platform.
