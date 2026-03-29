# CLAUDE.md — Tender.AI MVP

This file tells Claude how to work effectively in this repository. Read it before making any changes.

---

## Project Context

This is a **pre-sales demo prototype** for an AI Tender Analyst platform targeting Australian construction professionals. It is not a production application. The goal of every change is to make the demo more convincing to a paying enterprise client.

**This is a single-file repo.** The entire application is `tender_analyst_demo.html`. There is no Node.js, no build system, no package manager, and no framework. Every request almost certainly involves editing that one file.

---

## Essential Commands

```bash
# Run the demo — that's it
open tender_analyst_demo.html          # macOS
start tender_analyst_demo.html         # Windows
xdg-open tender_analyst_demo.html      # Linux
```

There are no install steps, no build steps, and no dev server. The file opens directly in any modern browser.

---

## Repo Structure

```
Construction-TenderAnalysisMVP/
├── tender_analyst_demo.html        # THE application — all HTML, CSS, JS inline
├── TenderAI_Demo_Talking_Script.md # Screen-record script for client sales demos
├── CLAUDE.md                       # This file
├── README.md                       # Project overview for humans
├── .gitignore                      # Ignores .DS_Store, *.zip, editor files
└── .gitattributes                  # Line-ending normalisation (LF)
```

---

## Architecture — `tender_analyst_demo.html`

Single file. Everything inline — HTML, CSS, JavaScript. No external dependencies except two CDN loads at the top of `<head>`:

- **Google Fonts:** `DM Sans` (UI text) + `Fraunces` (brand logo only)
- **Lucide Icons:** `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`

Do not add any other external dependencies. The file must work offline after first load (fonts and icons cache in the browser).

### State model

All application state lives in plain JavaScript variables in the `<script>` block. There is no framework, no virtual DOM, and no state management library.

| Variable | Type | Purpose |
|----------|------|---------|
| `PROJECTS[]` | Array | All project objects; mutated when a file is uploaded |
| `chatHistory{}` | Object | Keyed by project ID; persists all chat messages across navigation |
| `portfolio{}` | Object | Global toolbar metrics; updated after a new project is added |
| `activeId` | Number\|null | Currently selected project ID; `null` = homepage |
| `CANNED[]` | Array | Canned AI responses; cycles via `cannedIdx` on each send |
| `nextProjectId` | Number | Auto-increment counter for uploaded projects |

UI is re-rendered by calling render functions that replace `innerHTML` of a container:

| Function | Replaces |
|----------|----------|
| `renderToolbarMetrics()` | `#toolbarMetrics` — the 5 metric pills |
| `renderSidebar(filter, highlightId)` | `#projectList` — sidebar project list |
| `renderHomepage()` | `#mainContent` — full main area |
| `renderProjectView(project)` | `#mainContent` — full main area |

### Theme system

CSS custom properties on `[data-theme="dark"]` and `[data-theme="light"]` on the `<html>` element. Toggle by calling `toggleTheme()`.

**Never use hardcoded hex or RGB colour values in new CSS — always use a `var(--...)` token.** If a token doesn't exist yet, add it to both theme blocks.

Key tokens:

| Token | Purpose |
|-------|---------|
| `--accent` | Amber/gold — all primary highlights, metric values, active states |
| `--bg-base` | Deepest background layer (page background) |
| `--bg-surface` | Cards, sidebar panel, toolbar |
| `--bg-elevated` | Inner cards, metric cards, chat bubbles |
| `--bg-subtle` | Inputs, badges, hover backgrounds |
| `--border` | All borders |
| `--border-subtle` | Lighter dividers and card edges |
| `--text-primary` | Body text |
| `--text-secondary` | Secondary/label text |
| `--text-muted` | Placeholder text, disabled states |

### Upload flow

When a file is dragged onto the page or selected via the file picker, `startUploadFlow(filename)` runs. It orchestrates two `animateBar()` calls sequentially:

1. **Phase 1 — Upload:** Progress bar 0→100%, status "Document Uploaded Successfully"
2. **Phase 2 — Analysis:** Progress bar resets 0→100%, status "Analysing Document"
3. **Completion:** Animated green checkmark, status "Document Analysis Complete"
4. **Post-close:** `addNewProject(filename)` runs — pushes to `PROJECTS[]`, updates `portfolio{}`, calls `renderToolbarMetrics()`, `renderSidebar('', newId)`, and `renderProjectView(newProject)`

Timing is controlled by `setTimeout` delays and the `duration` argument to `animateBar()`.

---

## Code Style

- CSS goes in the single `<style>` block; group rules by component with a comment header
- JavaScript goes in the single `<script>` block at the bottom of `<body>`
- Indent with **2 spaces** throughout — no tabs
- Prefer `const` over `let`; never use `var`
- Inline event handlers (`onclick=`, `oninput=`, `ondragover=`) for elements rendered via `innerHTML`; use `document.addEventListener` only for document-level events
- SVG icons are inline — do not add external icon font calls
- No `console.log` in committed code
- No trailing whitespace

---

## Dummy Data Reference

All dummy data is defined in the `<script>` block. **Do not change these values without being asked — clients may have seen previous demos.**

**Portfolio (initial):** 12 projects · $47.3M · Avg $3.94M · 8.2% prelims · 14.3 mo

**Portfolio (after upload):** 13 projects · $54.5M · Avg $4.19M · 8.3% prelims · 14.5 mo

**6 sidebar projects:**
1. Westfield Moorabbin Extension — $8.2M — Active *(has pre-loaded chat history)*
2. Dandenong Council Civic Centre — $5.7M — Under Review
3. Clayton Road Mixed-Use — $3.1M — Complete
4. Frankston Hospital Wing B — $12.4M — Active
5. Cranbourne Logistics Hub — $2.9M — Draft
6. Springvale Town Centre Upgrade — $4.6M — Under Review

**New project added on any upload:** Brighton Waterfront Precinct — $7.2M — Active

**Pre-loaded Westfield chat:** 2 exchanges — earthworks quote comparison + risk exposure table with dollar amounts

---

## What NOT to Do

- **Do not** split `tender_analyst_demo.html` into multiple files — it must remain a single openable file
- **Do not** add a build system, package manager, or framework — this repo has no `package.json`
- **Do not** add a real backend, API routes, or database
- **Do not** use `localStorage` or `sessionStorage` — all state is in-memory only
- **Do not** hardcode colour hex values in new CSS — always use theme tokens
- **Do not** commit `.DS_Store`, `Thumbs.db`, or `*.zip` files (covered by `.gitignore`)
- **Do not** use `npm install` or `pnpm install` — there is nothing to install

---

## Useful Patterns

### Adding a new project to the sidebar

Add an entry to the `PROJECTS` array. Required shape:

```js
{
  id: <unique number>,
  name: "Project Name",
  value: "$X.XM",
  status: "Active",            // Active | Under Review | Complete | Draft
  badgeClass: "badge-active",  // badge-active | badge-review | badge-complete | badge-draft
  detail: {
    value: "$X.XM",
    duration: "XX months",
    prelims: "X.X%",
    packages: "XX",
    insights: {
      key:  "...",
      risk: "...",
      opportunity: "...",
      rec:  "..."
    }
  },
  hasChat: false               // true = seed chatHistory[id] with pre-loaded messages
}
```

### Adding pre-loaded chat to a project

Set `hasChat: true` on the project, then seed `chatHistory[projectId]` before `renderSidebar()` is called:

```js
chatHistory[projectId] = [
  { role: 'user', content: 'Your question here.' },
  { role: 'ai',   html: '<p>Your <strong>formatted</strong> response here.</p>' }
];
```

### Adding a new canned AI response

Append an HTML string to the `CANNED` array. Supports `<h4>`, `<ul>/<li>`, `<p>`, `<strong>`, and the `.ai-table` class for formatted tables. Responses cycle round-robin via `cannedIdx`.

### Changing the upload animation timing

Edit `startUploadFlow()`. Each `animateBar(fillId, pctId, from, to, duration, callback)` call controls one phase. The `duration` argument is in milliseconds. `setTimeout` delays between phases control the pause after each status message appears.
