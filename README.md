# Tira & Lydu — Wedding Website

A cinematic, editorial, Ethiopian-inspired one-page wedding invitation.
Built with Next.js (App Router) + Tailwind CSS.

Currently included: **Hero** (countdown to Nov 21, 2026, 6:00 AM Ethiopian
Time) and **Our Wedding Day**. More sections (Timeline, Church/Map, Gallery,
Share Your Photos, Leave a Note, Messages, RSVP) will be added incrementally.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a new GitHub repo named `tira-lydu-wedding`:
   ```bash
   cd tira-lydu-wedding
   git init
   git add .
   git commit -m "Initial commit: Hero + Our Wedding Day"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tira-lydu-wedding.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the `tira-lydu-wedding` repo.
3. Vercel auto-detects Next.js — no config needed. Click **Deploy**.
4. Every future push to `main` redeploys automatically.

## Project structure

```
tira-lydu-wedding/
├── app/
│   ├── layout.js       # Fonts (Fraunces + Inter), page metadata
│   ├── page.js         # Assembles sections
│   └── globals.css     # All design tokens + section styles
├── components/
│   ├── Nav.js           # Minimal nav, hides on scroll down
│   ├── Hero.js          # Names, countdown, entrance animation
│   └── OurWeddingDay.js # Statement + scroll reveal
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Design tokens

| Name        | Hex       | Use                                  |
|-------------|-----------|---------------------------------------|
| Ivory       | `#F5F1E8` | Light section background              |
| Charcoal    | `#15130F` | Text on light sections                |
| Terracotta  | `#A65F48` | Single accent (countdown numerals)    |
| Gold        | `#B99A63` | Geometric line motif, dividers only   |
| Olive       | `#3F4436` | Hero background wash (placeholder)    |

Fonts: **Fraunces** (serif, editorial display) + **Inter** (sans, functional
text), loaded via `next/font/google`.

## Notes for next steps

- The Hero's olive gradient is a placeholder — swap in engagement photography
  or video once available.
- Countdown target is set in `components/Hero.js` (`TARGET` constant).
- Once Timeline/Gallery/Guestbook/RSVP are added, guest data (RSVPs, notes)
  will need a database — Supabase (Postgres) is the planned choice, with a
  password-protected `/admin` route for moderation.
- Guest photo submission is handled externally via a Telegram bot link, not
  a custom upload backend.
