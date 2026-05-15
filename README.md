# WorkIndia — Skill Certification Prototype

Mobile-first, interactive Next.js prototype for WorkIndia's skill certification feature. Target audience: gray-collar candidates (Accounts, Back Office, Sales, Admin, Telecalling, Data Entry).

## What's inside

Single-page interactive demo with these screens:

1. **Landing** — Trust strip (auto-scroll), Premium-first pricing, pending-pass cards at top, "Why get verified?" recruiter-view, How it works, skill catalog, auto-scrolling reviews
2. **Test Detail** — Free-to-take banner, benefits, sample question preview, test rules, Premium info
3. **Quiz** — 3 sample MCQs with countdown timer, progress bar, quit confirmation
4. **Result — Pass** — Celebration, blurred certificate, single Unlock CTA opens a bottom-sheet popup with Premium + Rs 99 options
5. **Result — Fail** — Score breakdown, retake CTA
6. **Success** — Full certificate, download / WhatsApp / profile actions

### Demo controls

A demo bar at the top of the landing screen lets reviewers toggle:
- User type: **Free / Premium (2 credits) / Premium (0 credits)** — changes pricing logic throughout
- Quiz result: **Pass / Fail**
- Pending-pass simulator (cycle 0 → 1 → 2 cards)

Floating 🧭 button (bottom-right) jumps to any screen.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Tech

- Next.js 14 (App Router) + React 18
- TypeScript
- Tailwind CSS + custom CSS in `globals.css`
- Inter font via `next/font/google`
- No external state libs — all state via `useState`

## Files

- `app/page.tsx` — entire interactive prototype (single client component)
- `app/globals.css` — phone frame, animations, custom utilities
- `app/layout.tsx` — root layout, Inter font
- `lib/data.ts` — skills, questions, reviews, types

## Deploy

Vercel-ready. Push to GitHub and connect at vercel.com — zero config needed.
