# North Sumatra Ophthalmology — branded frontend

A custom-branded public frontend for the OJS journal **`jnso`** ("North Sumatra
Ophthalmology"), built with Next.js (App Router) + TypeScript + Tailwind v4.
Design tokens are ported from the Ideko template (primary `#FFCF01`, dark
`#151618`, Inter, pill buttons).

## Architecture (hybrid)

Next.js owns the **branded public pages** — home, issue archive, issue TOC, and
article landing — and reads journal data from the OJS REST API **server-side**.
Everything OJS renders itself (full-text galleys/PDF viewer, search, login,
registration, submissions) stays on OJS via **deep links** (see `src/lib/links.ts`).

```
src/
  app/                 routes: / · /issues · /issues/[id] · /articles/[id] · /about
  components/          SiteHeader, SiteFooter, Button, *Card, GalleyLinks, Container
  lib/
    config.ts          env-driven config (server-only secrets + public deep-link URL)
    links.ts           OJS deep links (search/login/submit/galley/...)
    ojs/               REST data layer: client (Bearer), endpoints, types, fixtures
```

## Getting started

```bash
cp .env.example .env.local   # already present for local dev
npm run dev                  # http://localhost:3000
```

With `OJS_API_TOKEN` blank, the app renders **bundled fixtures**
(`src/lib/ojs/fixtures.ts`) so the UI works immediately.

## Going live

The OJS REST API rejects anonymous calls, so live data needs a token:

1. In OJS `config.inc.php`, set a non-empty `api_key_secret` under `[security]`.
2. Sign in to OJS as an editor/manager → **Profile → API key** → generate a key.
3. Put it in `.env.local` as `OJS_API_TOKEN=...` (server-only — never `NEXT_PUBLIC_`).
4. Publish at least one issue in `jnso` (the journal currently has none).

The data layer then hits the live, token-authed API and falls back to fixtures
only if a request fails. Force fixtures anytime with `OJS_USE_FIXTURES=1`.

## Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `OJS_BASE_URL` | server | OJS index base, e.g. `http://38.147.122.247/index.php` |
| `OJS_JOURNAL_PATH` | server | Journal path segment (`jnso`) |
| `OJS_API_TOKEN` | server | Bearer token for the REST API (keep secret) |
| `NEXT_PUBLIC_OJS_PUBLIC_URL` | client | Base for deep links into OJS |
| `OJS_USE_FIXTURES` | server | `1` to force fixtures |
| `OJS_DEFAULT_LOCALE` | server | Locale for OJS localized fields (default `en`) |
