# Tira & Lydu — Wedding Website

A cinematic, editorial, Ethiopian-inspired one-page wedding invitation.
Built with Next.js (App Router) + Tailwind CSS.

All sections from the design brief are now in place:
Hero → Our Wedding Day → Timeline → Church/Map → Gallery → Share Your Photos
(Telegram) → Leave a Note → Messages From Guests → Final/RSVP.

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
│   ├── Nav.js               # Minimal nav, hides on scroll down
│   ├── Hero.js              # Names, countdown, entrance animation
│   ├── OurWeddingDay.js     # Statement + scroll reveal
│   ├── Timeline.js          # Scroll-drawn line, 4 wedding-day events
│   ├── ChurchLocation.js    # Church name, address, embedded map, directions
│   ├── Gallery.js           # Masonry gallery + lightbox (placeholder photos)
│   ├── SharePhotos.js       # CTA linking to the Telegram bot
│   ├── LeaveANote.js        # Guestbook form (local state — see TODOs)
│   ├── MessagesFromGuests.js# Approved-message wall (sample placeholder data)
│   └── FinalRSVP.js         # Closing statement + RSVP form (local state)
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

## What still needs real data (currently placeholder)

These are fully designed and functional in the browser, but not yet wired
to a backend — that's the next milestone:

- **`components/Gallery.js`** — uses `picsum.photos` placeholder images.
  Replace the `PHOTOS` array with real engagement/wedding photography.
- **`components/SharePhotos.js`** — `TELEGRAM_BOT_URL` is a placeholder.
  Create the real bot via [@BotFather](https://t.me/BotFather) and swap in
  its actual `t.me/...` link.
- **`components/LeaveANote.js`** — submissions currently only log to the
  console and confirm in the UI; they are not saved anywhere or visible to
  other guests. Needs a POST to Supabase (`status: 'pending'`).
- **`components/MessagesFromGuests.js`** — shows hardcoded sample messages.
  Needs a fetch from Supabase (`status = 'approved'`).
- **`components/FinalRSVP.js`** — same as Leave a Note: submissions aren't
  persisted yet. Needs a POST to a Supabase `rsvps` table.

Planned backend: **Supabase** (Postgres) with two tables (`guestbook_messages`,
`rsvps`) and a password-protected `/admin` route for approving/rejecting
messages and viewing RSVPs. Guest photo submission stays on Telegram — no
upload backend needed for that.

## Other notes

- The Hero's olive gradient and the Church section's background are
  placeholders — swap in real photography/video once available.
- Countdown target is set in `components/Hero.js` (`TARGET` constant).
- The map in `components/ChurchLocation.js` uses a keyless Google Maps embed
  based on the address string — works out of the box, no API key needed.
