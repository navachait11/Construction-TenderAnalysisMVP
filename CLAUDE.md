# CLAUDE.md — Tender.AI MVP

This file tells Claude how to work effectively in this repository. Read it before making any changes.

---

## Project Context

This is a **pre-sales demo prototype** for an AI Tender Analyst platform targeting Australian construction professionals. It is not a production application. The goal of every change is to make the demo more convincing to a paying enterprise client.

There are **two parallel codebases** in this repo — treat them independently:

| Codebase | Primary file(s) | When to touch |
|----------|----------------|---------------|
| Standalone HTML demo | `tender_analyst_demo.html` | For demo UI, new features, visual polish, dummy data changes |
| Next.js marketing app | `app/`, `components/` | For the product website and `/demo` route |

When in doubt, the user is almost certainly asking about `tender_analyst_demo.html`.

---

## Essential Commands

```bash
# Install dependencies (uses pnpm — do NOT use npm install)
pnpm install

# Start dev server with Turbopack (Next.js app only)
pnpm dev

# Production build
pnpm build

# Lint (Next.js app only — does not apply to the HTML demo)
pnpm lint
```

The HTML demo requires no build step. Open `tender_analyst_demo.html` directly in a browser.

---

## Architecture — Standalone Demo (`tender_analyst_demo.html`)

Single file. Everything inline — HTML, CSS, JavaScript. No external dependencies except two CDN loads at the top of `<head>`:

- Google Fonts: `DM Sans` (UI text) + `Fraunces` (brand logo only)
- Lucide Icons: `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`

**Do not add any other external dependencies.** The file must work offline after first load (fonts and icons will cache).

### State model

All application state lives in plain JavaScript variables at the top of the `<script>` block:

```
PROJECTS[]        — array of project objects (mutated when user uploads a document)
chatHistory{}     — object keyed by project ID; stores all chat messages per project
portfolio{}       — global metrics object (updated after a new project is added)
activeId          — currently selected project ID (null = homepage)
cannedIdx         — index into CANNED[] responses (cycles on each AI reply)
nextProjectId     — auto-increment counter for newly uploaded projects
```

There is no framework, no virtual DOM, no state management library. UI is re-rendered by calling `renderSidebar()`, `renderHomepage()`, or `renderProjectView(project)` — which replace `innerHTML` of the relevant container.

### Theme system

CSS custom properties on `[data-theme="dark"]` and `[data-theme="light"]` on the `<html>` element. Toggle by calling `toggleTheme()`. Never use hardcoded colour values in new CSS — always use a `var(--...)` token.

Key tokens:
- `--accent` — amber/gold (#F59E0B dark, #B45309 light) — use for all primary highlights and metric values
- `--bg-base` — deepest background layer
- `--bg-surface` — cards, sidebar, toolbar
- `--bg-elevated` — inner cards, metric cards
- `--border` / `--border-subtle` — use for all borders; never hardcode a colour

### Adding a new project (upload flow)

When a file is dropped, `startUploadFlow(filename)` runs a multi-phase animation sequence, then calls `addNewProject(filename)`. That function:
1. Pushes a new object into `PROJECTS[]`
2. Updates the `portfolio{}` object
3. Calls `renderToolbarMetrics()` to refresh the top bar
4. Calls `renderSidebar('', newId)` with the new project's ID to trigger the gold pulse highlight
5. Calls `renderProjectView(newProject)` to navigate to the new project

---

## Architecture — Next.js App (`app/`, `components/`)

**App Router** with the following routes:
- `/` — Marketing homepage (assembled from individual section components in `components/`)
- `/demo` — Embedded demo app (uses `components/demo/` components)

**Component conventions:**
- All components are `"use client"` — there are no server components in the current codebase
- Use the `cn()` utility from `lib/utils.ts` for all conditional Tailwind class merging
- Tailwind colours use CSS variable tokens (`bg-background`, `text-foreground`, `text-primary`, etc.) defined in `app/globals.css` — never use raw Tailwind palette colours like `bg-gray-900`

**No backend.** There are no API routes, no database, no authentication. All data is hardcoded in component files.

---

## Code Style

### TypeScript (Next.js app)
- Explicit types on all props interfaces — no `any`
- Prefer `interface` over `type` for component props
- Named exports for all components (`export function Foo()`) — no default exports except in `app/` page files where Next.js requires them
- ESLint and TypeScript build errors are currently suppressed in `next.config.mjs` — do not rely on this; fix errors properly

### HTML demo
- CSS goes in the single `<style>` block, alphabetically grouped by component
- JavaScript goes in the single `<script>` block at the bottom of `<body>`
- Indent with 2 spaces throughout
- All event handlers inline via `onclick=`, `oninput=`, `ondragover=` — no `addEventListener` in the HTML markup (keep handlers in the script block where possible)
- Keep SVG icons inline (no external icon font calls) — they're already inlined throughout the file

### General
- Prefer `const` over `let`; avoid `var`
- No trailing whitespace
- No console.log left in committed code

---

## Dummy Data Reference

All dummy data for the HTML demo is defined in the `<script>` block. The canonical values are:

**Portfolio (before upload):** 12 projects · $47.3M · Avg $3.94M · 8.2% prelims · 14.3 mo

**Portfolio (after upload):** 13 projects · $54.5M · Avg $4.19M · 8.3% prelims · 14.5 mo

**6 sidebar projects:**
1. Westfield Moorabbin Extension — $8.2M — Active *(has pre-loaded chat history)*
2. Dandenong Council Civic Centre — $5.7M — Under Review
3. Clayton Road Mixed-Use — $3.1M — Complete
4. Frankston Hospital Wing B — $12.4M — Active
5. Cranbourne Logistics Hub — $2.9M — Draft
6. Springvale Town Centre Upgrade — $4.6M — Under Review

**New project added on upload:** Brighton Waterfront Precinct — $7.2M — Active

**Pre-loaded Westfield chat:** 2 exchanges (earthworks quote comparison + risk exposure table)

Do not change these values without being asked — clients may have seen previous demos.

---

## What NOT to Do

- **Do not** install new npm packages for the HTML demo — it must remain dependency-free
- **Do not** split `tender_analyst_demo.html` into multiple files — it must remain a single openable file
- **Do not** add a real backend, API routes, or database — this is a demo prototype only
- **Do not** use `localStorage` or `sessionStorage` — all state is in-memory
- **Do not** use hardcoded hex colours in new CSS — use the theme token system
- **Do not** run `npm install` — this project uses pnpm exclusively
- **Do not** modify `next.config.mjs` build suppression flags without checking that the codebase is type-error-free first
- **Do not** commit `node_modules/` or `.next/`

---

## Files to Never Edit

- `pnpm-lock.yaml` — auto-generated; only update via `pnpm install`
- `next-env.d.ts` — auto-generated by Next.js
- `node_modules/` — never touch directly

---

## Useful Patterns

### Adding a new section to the marketing site
Create a new component in `components/`, import it in `app/page.tsx`, add it to the JSX render order. Follow the pattern of existing sections (named export, `"use client"`, Tailwind-only styling).

### Adding a new project to the demo sidebar
Add an entry to the `PROJECTS` array in `tender_analyst_demo.html`. Follow the existing object shape — `id`, `name`, `value`, `status`, `badgeClass`, `detail` (with `value`, `duration`, `prelims`, `packages`, `insights`), `hasChat`.

### Adding pre-loaded chat to a project
Set `hasChat: true` on the project, then add entries to `chatHistory[projectId]` in the init section at the bottom of the script. Each entry is `{ role: 'user', content: '...' }` or `{ role: 'ai', html: '...' }`.

### Changing the upload animation sequence
Edit `startUploadFlow()` in the script block. The sequence is: upload bar (phase 1) → status message swap → analysis bar (phase 2) → checkmark → `addNewProject()`. Timing is controlled by `setTimeout` delays and the `duration` argument to `animateBar()`.
