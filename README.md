# Tender.AI — Construction Tender Analysis MVP

AI-powered tender analyst platform for construction professionals in Australia. Helps estimators and project managers compare subcontractor quotes, identify risks, surface opportunities, and make faster award decisions — all from a single workspace.

> **This repo is a single-file frontend demo.** No Node.js, no build tools, no dependencies to install. Open `tender_analyst_demo.html` in any browser and it works.

---

## Getting Started

**No setup required.**

1. Clone or download this repo
2. Open `tender_analyst_demo.html` in Chrome, Edge, or Firefox
3. That's it

The file is fully self-contained — all HTML, CSS, and JavaScript are inline. An internet connection is only needed on first open to cache Google Fonts and Lucide Icons from CDN. After that, it works offline.

---

## What's in This Repo

```
Construction-TenderAnalysisMVP/
├── tender_analyst_demo.html        # The entire application — open this in a browser
├── TenderAI_Demo_Talking_Script.md # Screen-record script for client sales demos
├── CLAUDE.md                       # AI assistant instructions for working in this repo
├── README.md                       # This file
├── .gitignore
└── .gitattributes
```

---

## Tech Stack

Plain web standards. Zero build tooling.

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 |
| Styling | CSS3 with custom properties (no preprocessor) |
| Logic | Vanilla JavaScript (ES2020, no framework) |
| Typography | Google Fonts — DM Sans (UI) + Fraunces (brand) |
| Icons | Lucide Icons via unpkg CDN |
| Hosting | Any static file server, or shared directly as a file |

---

## Demo Features

The `tender_analyst_demo.html` is a fully interactive single-page application:

**Global Toolbar** — Always-visible portfolio metrics (total projects, portfolio value, avg cost, avg prelims %, avg program duration) with a live light/dark theme toggle. Clicking the Tender.AI logo returns to the homepage from anywhere.

**Sidebar** — ChatGPT-style project list showing all 6 Australian construction projects with value and status badges. Includes live search filtering and a "+ New Project" button that triggers the file upload flow.

**Homepage** — Search-engine landing with a large input field, a drag-and-drop upload zone, and four suggested prompt chips that navigate into the active demo project.

**Project View** — Clicking any project loads a dashboard strip with 4 metric cards (value, duration, prelims %, trade packages) and 4 AI insight cards (Key Insight, Risk, Opportunity, Recommendation), followed by a full AI chat workspace.

**Chat Persistence** — Every conversation is stored per project in memory. Navigating between projects and returning preserves the full thread — nothing is lost.

**File Upload Flow** — Drag any file anywhere on screen to trigger the upload animation:
- Body-level drag hint (golden border) on drag-enter
- Animated modal: file icon bounce with particle burst
- Phase 1: Upload progress bar 0→100% with live % counter and "Document Uploaded Successfully" status
- Phase 2: Analysis bar 0→100% with "Analysing Document" and sub-text
- Completion: Animated green checkmark + "Document Analysis Complete"
- Auto-creates "Brighton Waterfront Precinct" ($7.2M) in the sidebar with full dummy data
- Global toolbar metrics update instantly (12→13 projects, $47.3M→$54.5M portfolio value)

---

## Dummy Data

All data is hardcoded in the `<script>` block of `tender_analyst_demo.html`. No real documents are processed.

**Portfolio (initial):** 12 projects · $47.3M · Avg $3.94M · 8.2% prelims · 14.3 mo avg duration

**6 sidebar projects:**

| Project | Value | Status |
|---------|-------|--------|
| Westfield Moorabbin Extension | $8.2M | Active |
| Dandenong Council Civic Centre | $5.7M | Under Review |
| Clayton Road Mixed-Use | $3.1M | Complete |
| Frankston Hospital Wing B | $12.4M | Active |
| Cranbourne Logistics Hub | $2.9M | Draft |
| Springvale Town Centre Upgrade | $4.6M | Under Review |

**New project added on any file upload:** Brighton Waterfront Precinct — $7.2M — Active

**Westfield Moorabbin** has a pre-loaded AI chat showing 2 full exchanges (earthworks quote comparison + risk exposure table).

---

## Deployment

The demo can be hosted as a static file on any platform:

```bash
# GitHub Pages — just enable Pages on the repo root
# Netlify / Vercel — drag the folder into the dashboard
# Any web server
cp tender_analyst_demo.html /var/www/html/index.html
```

Or share the `.html` file directly as an email attachment for client demos — it opens self-contained in any browser.

---

## Extending the Demo

All changes are made directly in `tender_analyst_demo.html`. Key areas:

- **Dummy data** — `PROJECTS` array and `PRELOADED_CHAT` array in the `<script>` block
- **Portfolio metrics** — `portfolio` object and `renderToolbarMetrics()`
- **Upload animation timing** — `startUploadFlow()` function, `setTimeout` delays and `animateBar()` duration arguments
- **AI chat responses** — `CANNED` array (cycles through on each new message)
- **Theme colours** — CSS custom properties in `[data-theme="dark"]` and `[data-theme="light"]` blocks at the top of `<style>`
- **New project on upload** — `addNewProject()` function (hardcoded to "Brighton Waterfront Precinct" for demo consistency)

See `CLAUDE.md` for full architecture details if using an AI assistant to make changes.
