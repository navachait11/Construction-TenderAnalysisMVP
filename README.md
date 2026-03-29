# Tender.AI — Construction Tender Analysis MVP

AI-powered tender analyst platform for construction professionals in Australia. The product helps estimators and project managers compare subcontractor quotes, identify risks, surface opportunities, and make faster award decisions — all from a single workspace.

---

## What's in This Repo

| Path | Purpose |
|------|---------|
| `tender_analyst_demo.html` | **Primary demo deliverable** — standalone single-file frontend prototype for client presentations. No build required; open directly in any browser. |
| `app/` | Next.js 15 app router — marketing site (`/`) and embedded demo route (`/demo`) |
| `components/` | React component library — marketing sections and demo UI components |
| `lib/` | Shared utilities (`cn` helper for Tailwind class merging) |

---

## Quick Start — Next.js App

Requires Node.js 18+ and pnpm.

```bash
# Install dependencies
pnpm install

# Start development server (Turbopack)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint
pnpm lint
```

Development server runs at `http://localhost:3000`.

---

## Quick Start — Standalone Demo

No build step needed.

```bash
# Open directly in your browser
open tender_analyst_demo.html
```

Or double-click `tender_analyst_demo.html` in Finder / File Explorer.

The demo file is fully self-contained — all HTML, CSS, and JavaScript are inline. It requires an internet connection only to load Google Fonts and Lucide Icons from CDN on first open.

---

## Tech Stack

### Next.js App
- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI Library:** React 19
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS 3.4 with CSS custom properties
- **Icons:** Lucide React
- **Charts:** Recharts
- **Class utilities:** clsx + tailwind-merge via `cn()` helper

### Standalone Demo (`tender_analyst_demo.html`)
- Plain HTML5 / CSS3 / vanilla JavaScript — no frameworks, no build tools
- Google Fonts: DM Sans (UI) + Fraunces (brand/logo)
- Lucide Icons via unpkg CDN
- Dark theme default with full light/dark toggle
- All dummy data is hardcoded in the `<script>` block

---

## Project Structure

```
Construction-TenderAnalysisMVP/
├── tender_analyst_demo.html        # Standalone client demo (primary deliverable)
├── TenderAI_Demo_Talking_Script.md # Screen-record script for sales demos
│
├── app/
│   ├── layout.tsx                  # Root layout, global fonts + metadata
│   ├── page.tsx                    # Marketing homepage (/, assembles section components)
│   ├── globals.css                 # CSS custom properties, dark/light theme variables
│   └── demo/
│       └── page.tsx                # Demo route (/demo)
│
├── components/
│   ├── header.tsx                  # Marketing site navigation
│   ├── hero.tsx                    # Landing hero section
│   ├── stats.tsx                   # Portfolio stats strip
│   ├── features.tsx                # Feature highlights grid
│   ├── how-it-works.tsx            # Process walkthrough section
│   ├── pricing.tsx                 # Pricing tiers
│   ├── cta.tsx                     # Call-to-action section
│   ├── footer.tsx                  # Site footer
│   └── demo/
│       ├── demo-header.tsx         # Demo app top bar
│       ├── sidebar.tsx             # Demo app left navigation
│       ├── dashboard.tsx           # Demo app main dashboard
│       ├── tender-analysis.tsx     # Tender detail / analysis view
│       └── tender-upload.tsx       # Upload UI component
│
├── lib/
│   └── utils.ts                    # cn() Tailwind class merge helper
│
├── next.config.mjs                 # Next.js config (ESLint + TS build errors suppressed)
├── tailwind.config.ts              # Tailwind theme (CSS var tokens, dark mode via class)
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies and scripts
```

---

## Demo File — Key Features

The `tender_analyst_demo.html` implements a full single-page application:

- **Global toolbar** — always-visible portfolio metrics (13 projects, $54.5M portfolio value, avg cost, prelims %, avg duration) + brand logo + light/dark theme toggle
- **Sidebar** — ChatGPT-style project list with 6 Australian construction projects, live search filtering, "+ New Project" upload trigger
- **Homepage** — Search-engine style landing with input, drag-and-drop upload zone, suggested prompt chips
- **Project view** — Per-project dashboard strip (4 metric cards + 4 AI insight cards) above a full AI chat workspace
- **Chat persistence** — Conversation history stored per project; survives navigation between projects
- **File upload flow** — Drag any file anywhere on screen → animated upload modal (progress bar, status messages, checkmark) → new project auto-created with dummy data → global portfolio metrics update

All data is dummy/hardcoded. No backend, no API calls.

---

## Environment

No environment variables are required for the demo. The Next.js app has no `.env` dependencies in the current MVP state.

---

## Deployment

The Next.js app can be deployed to Vercel with zero configuration:

```bash
# Deploy to Vercel (requires Vercel CLI)
vercel deploy
```

The standalone `tender_analyst_demo.html` can be hosted on any static file server or shared directly as a file attachment for client demos.

---

## Contributing

This is a pre-sales demo prototype. When extending the codebase:

1. Standalone demo changes go in `tender_analyst_demo.html` only — keep it single-file
2. Product/marketing site changes go in `app/` and `components/`
3. Run `pnpm lint` before committing Next.js changes
4. All dummy data for the demo is maintained in the `<script>` block of the HTML file