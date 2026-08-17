# Eli's Autos

Operations dashboard + public marketing site for Eli's Autos: sales with in-house
financing, rentals, and repairs.

## Status

This is scaffolding built with fake data (`src/data/fakeData.js`). Dependencies
are listed in `package.json` but **not installed yet** — run `npm install`
when you're ready to actually run it.

## Structure

```
src/
  main.jsx                 entry point
  App.jsx                  all routes (public site + admin dashboard)
  index.css                Tailwind + font imports
  lib/
    supabaseClient.js       Supabase client (inactive until .env.local is filled in)
  context/
    AuthContext.jsx         fake session for now, real auth later
  components/
    layout/                 Sidebar, AdminLayout, PublicHeader/Footer, PublicLayout
    ui/                      Card, Badge, MetricCard, OverdueLadder, Modal, PlaceholderPage
  pages/
    admin/                   Dashboard, Inventory, Customers, Financing (built)
                             Rentals, Repairs, Reviews, Analytics, Settings (stubs)
    public/                  Home, Cars, CarDetail, Contact (built)
                             Services, Reviews (stubs)
  data/
    fakeData.js              stand-in for future Supabase tables
  utils/
    constants.js             colors, status labels, overdue-ladder thresholds
    format.js                money(), initials()
```

## Build phases

**Phase 1 — done in this scaffold**
Vehicle inventory, customer records, financing ledger, overdue-ladder tracking
(current \u2192 late \u2192 30 \u2192 60 \u2192 repossessed), admin dashboard with revenue and
overdue-account overview.

**Phase 2 — stubbed, not built**
Rentals (calendar, active agreements), repair job tracking, public repair
request form.

**Phase 3 — stubbed, not built**
Reviews tied to real transactions, full analytics (weekly/monthly/yearly,
growth trends), loyalty/referrals, multi-language support, document storage.

## Moving to a real backend

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and fill in the URL and anon key.
3. Replace the arrays in `src/data/fakeData.js` with Supabase queries — the
   shapes were kept deliberately close to what the tables will look like.
4. Payment processing goes through Stripe (or similar) — never build custom
   card handling. That work happens once we're in Claude Code with a real
   backend to wire it into.
