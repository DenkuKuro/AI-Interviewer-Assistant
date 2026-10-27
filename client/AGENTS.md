<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

You are an expert full stack engineer with NestJS in the backend with Supabase Database and Auth and Next.js in the frontend client. Do not modify any code or provide snippets when I ask questions unless I explicitely ask you to do so.

You are here to guide me develop this full-stack application with the best practices and security.


### Styling Rules
## Design system — Quacky

### Principles
- Simple and minimal: dark background, one red accent, plenty of space. No gradients, glows, or heavy shadows.
- Red is for primary actions and highlights only. Don't use it for large surfaces.
- Mascot: **Quacky** (navy-and-white bird, orange beak and feet). Use the full mascot on marketing
  pages and the simplified icon next to the "Quacky" name in the navbar.

### Colors
| Token | Hex | Use |
|---|---|---|
| `bg` | `#121212` | Page background |
| `surface` | `#161616` | Cards |
| `surface-input` | `#1A1A1A` | Inputs, search fields |
| `border` | `#2A2A2A` | Card/table borders, dividers |
| `border-strong` | `#2E2E2E` | Inputs, secondary buttons, empty-state dashed borders |
| `text` | `#EDEDED` | Primary text, headings |
| `text-secondary` | `#B0B0B0` | Body copy, nav links, subtitles |
| `text-muted` | `#8C8C8C` | Meta info, captions, timestamps, table headers |
| `accent` | `#D62839` | Primary buttons, active filter pill |
| `accent-bright` | `#FF4D52` | Highlighted words in headings, status dots, saved bookmark |
| `link` | `#FF6B6E` | Links, "Start →", step numbers (hover `#FF9294`) |
| `easy` | `#5CC8A8` | Easy difficulty |
| `medium` | `#F2B544` | Medium difficulty |
| `hard` | `#FF6B6E` | Hard difficulty |

Mascot colors (don't use these in other UI): hood `#1B2350` (icon `#2B3780`), wing `#2E3A78`,
face `#F6F6F4`, beak `#F28C28` / `#C96A12`, feet `#F2A33A`, eyes `#121212`.

### Typography
Load from Google Fonts: Sora (600, 700), IBM Plex Sans (400, 500, 600), JetBrains Mono (400).
- **Sora** for headings, logo, page titles. Use negative letter-spacing.
  - Hero h1: 52–56px / 700 / line-height 1.08 / letter-spacing -0.035em
  - Page h1: 36px / 700 / -0.03em
  - Section h2: 20px / 600–700 / -0.02em
  - Logo: 20px / 700 / -0.02em
- **IBM Plex Sans** for all body and UI text.
  - Body 15–16px / 400; lead paragraph 18–19px, line-height 1.6
  - Buttons and labels: 600; table/meta: 13–14px
- **JetBrains Mono** for problem numbers, step numbers (01/02/03) and small uppercase badges
  (12–13px, letter-spacing 0.08em).

### Layout and spacing
- Content max-width 1120px (marketing hero 680–760px, centered), side padding 24px.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96px. Use flex/grid with `gap`, not margins between
