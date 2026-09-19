# Tira & Lydu — Wedding Website

A cinematic, editorial, Ethiopian-inspired one-page wedding invitation.
Built with Next.js (App Router) + Tailwind CSS + Supabase.

Flow: Hero → Our Wedding Day → Timeline → Church/Map → Gallery →
Share Your Photos (Telegram) → RSVP + Wish (combined form) →
Messages From Guests → Footer.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

The site runs and looks correct even without Supabase configured — the
RSVP form will show an error on submit, and the Messages wall will show
"No messages yet" until you set up the backend below.

## Set up Supabase (the backend)

This powers the RSVP form, the guestbook wishes, and the admin dashboard.

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste the contents
   of `supabase/schema.sql` from this repo, and click **Run**. This creates
   two tables (`rsvps`, `guestbook_messages`) with the right security rules.
3. Go to **Settings → API** and copy three values:
   - **Project URL**
   - **anon public** key
   - **service_role** key (click "Reveal" — keep this one secret)
4. Copy `.env.local.example` to `.env.local` and fill in those three values,
   plus choose a password for `ADMIN_PASSWORD`.
5. Restart `npm run dev` if it was already running.

Test it: submit the RSVP form on the site, then check **Table Editor** in
Supabase — you should see a new row in `rsvps` (and in `guestbook_messages`
if you left a wish).

## The admin dashboard

Visit `/admin` (e.g. `http://localhost:3000/admin`, or your live URL +
`/admin`) and log in with the `ADMIN_PASSWORD` you set. From there you can:

- Approve or reject guest wishes before they appear on the public
  "Messages From Guests" wall
- See the full RSVP list (who's coming, who declined)

This page isn't linked from the public site — it's only reachable if you
know the URL, protected behind the password.

## Deploy to Vercel

1. Push this folder to a new GitHub repo named `tira-lydu-wedding`:
   ```bash
   cd tira-lydu-wedding
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/tira-lydu-wedding.git
   git push -u origin main
   ```
2. Go to https://vercel.com/new, import the `tira-lydu-wedding` repo.
3. Before deploying, add the same four environment variables from your
   `.env.local` in Vercel's **Environment Variables** section (Project
   Settings → Environment Variables) — `.env.local` itself is never pushed
   to GitHub, so this step is required for the live site to work.
4. Click **Deploy**. Every future push to `main` redeploys automatically.

If you add or change environment variables later, you'll need to redeploy
(Vercel → Deployments → ⋯ → Redeploy) for them to take effect.

## Project structure

```
tira-lydu-wedding/
├── app/
│   ├── layout.js          # Fonts (Fraunces + Inter + Pinyon Script), metadata
│   ├── page.js            # Assembles all sections in order
│   ├── globals.css        # All design tokens + every section's styles
│   ├── icon.svg            # Favicon (T & L monogram)
│   ├── admin/
│   │   └── page.js        # Password-protected dashboard
│   └── api/
│       ├── rsvp/route.js              # POST — public, submits RSVP + wish
│       └── admin/
│           ├── login/route.js         # POST — checks password, sets cookie
│           ├── messages/route.js      # GET/PATCH/DELETE — admin only
│           └── rsvps/route.js         # GET — admin only
├── components/
│   ├── Nav.js               # Hides on scroll down, hamburger on mobile
│   ├── ScrollToTop.js       # Forces the page to open at the Hero on refresh
│   ├── Hero.js              # Names, countdown, background photo
│   ├── OurWeddingDay.js     # "Dear Family & Friends" invitation text
│   ├── Timeline.js          # Scroll-drawn line, 4 wedding-day events
│   ├── ChurchLocation.js    # Church name, background photo, map, directions
│   ├── Gallery.js           # Masonry gallery + lightbox (placeholder photos)
│   ├── SharePhotos.js       # Compact CTA linking to the Telegram bot
│   ├── RsvpAndWish.js       # Combined RSVP + optional wish, posts to /api/rsvp
│   ├── MessagesFromGuests.js# Marquee + "Show All" modal, reads from Supabase
│   └── Footer.js            # Names in script font, date, thank-you
├── lib/
│   ├── supabaseClient.js    # Public anon client (safe for the browser)
│   ├── supabaseAdmin.js     # SERVER-ONLY service-role client
│   └── checkAdminAuth.js    # Checks the admin session cookie
├── supabase/
│   └── schema.sql            # Run once in Supabase's SQL Editor
├── public/images/            # Hero and Church background photos
├── .env.local.example
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Design tokens

| Name        | Hex       | Use                                  |
|-------------|-----------|---------------------------------------|
| Ivory       | `#F5F1E8` | Light section background              |
| Charcoal    | `#15130F` | Text on light sections                |
| Terracotta  | `#A65F48` | Single accent (countdown, buttons)    |
| Gold        | `#B99A63` | Geometric motif, dividers, script logo|
| Olive       | `#3F4436` | Hero/Timeline dark background wash    |

Fonts: **Fraunces** (serif, editorial display), **Inter** (sans, functional
text), **Pinyon Script** (the "T & L" logo and Footer names) — all loaded
via `next/font/google`.

## What's still placeholder

- **`components/Gallery.js`** — uses `picsum.photos` placeholder images.
  Replace the `PHOTOS` array with real engagement/wedding photography.
- **`components/SharePhotos.js`** — `TELEGRAM_BOT_URL` is a placeholder.
  Create the real bot via [@BotFather](https://t.me/BotFather) and swap in
  its actual `t.me/...` link.
- **Social preview (Open Graph)** — not yet set up. Controls how the link
  looks when shared on WhatsApp/Telegram/SMS.
- **`public/images/`** — Hero and Church currently use free Unsplash stock
  photos as stand-ins. Swap in real photography when ready (same filenames,
  or update the `src` in `Hero.js` / `ChurchLocation.js`).

## Other notes

- Countdown target is set in `components/Hero.js` (`TARGET` constant).
- The map in `components/ChurchLocation.js` uses a keyless Google Maps embed
  based on the address string — works out of the box, no API key needed.
- The admin dashboard's security is a single shared password — appropriate
  for a personal wedding site, not meant for anything higher-stakes.
