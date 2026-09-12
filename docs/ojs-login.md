# Custom login & registration on the landing domain

The branded `/login` and `/register` pages live on this site, but OJS stays the
single source of identity. Nothing is stored here — the pages drive the OJS forms
server-side and hand the resulting session to the browser.

## Flow

```
browser  ──POST──▶  Next.js server action
                        │  1. GET  {OJS}/login            → csrfToken + OJSSID
                        │  2. POST {OJS}/login/signIn      → 302 + regenerated OJSSID
                        ▼
browser  ◀─Set-Cookie─  OJSSID scoped to the shared parent domain
   │
   └──────▶  journal.<domain>/…/dashboard/editorial   (already signed in)
```

Registration is the same shape against `{OJS}/user/register`. The country list is
scraped from that form (cached 24h) so the options never drift from OJS.

Relevant code:

- `src/lib/ojs/auth.ts` — talks to the OJS forms
- `src/lib/auth/actions.ts` — server actions, sets the cookie, redirects
- `src/components/auth/` — the branded forms
- `src/lib/config.ts` — `OJS_SESSION_COOKIE_*` settings

## Required OJS server changes

This **only works in production**, and only after two changes on the OJS host.
Both are needed because OJS was never designed to have its session created by
another machine.

### 1. `config.inc.php` — stop binding sessions to the client IP

```ini
[security]
session_check_ip = Off
```

The session is created by the Next.js server (its IP) and then used by the
visitor's browser (a different IP). With the default `On`, OJS invalidates the
session on that change and the user lands on the dashboard logged out.

Trade-off: this removes a layer of session-hijacking protection for *all* OJS
users, not just ones coming through this flow.

### 2. PHP — scope the session cookie to the parent domain

OJS 3.5 has no `session_cookie_domain` setting (only `session_cookie_name`,
`session_cookie_path`, `session_samesite`), so set it at the PHP level for the
OJS vhost — in `php.ini`, the vhost config, or `.htaccess`:

```ini
php_value session.cookie_domain .northsumateraophthalmology.com
```

By default OJS issues:

```
Set-Cookie: OJSSID=…; domain=journal.northsumateraophthalmology.com; secure; httponly; samesite=lax
```

which is host-only. Without this change the browser ends up holding two cookies
named `OJSSID` — one from OJS, one from the landing app — and which one OJS reads
is undefined.

Then set `OJS_SESSION_COOKIE_DOMAIN=.northsumateraophthalmology.com` in the
landing app's environment (see `.env.example`). Leave it **empty locally**: a host
can only set cookies for a domain it belongs to, so the hand-off cannot work from
`localhost`.

## Security notes

- The landing app sees users' plaintext passwords in transit. That is inherent to
  proxying a login form and acceptable only because both systems belong to the
  same organisation. An OpenID Connect plugin on OJS would remove this entirely.
- **There is no rate limiting yet.** `/login` proxies straight to OJS, so it is as
  brute-forceable as OJS itself. Add throttling (per-IP, per-username) before
  this is publicly announced.
- Both hops must stay HTTPS. The cookie is set `secure`, `httpOnly`, `sameSite=lax`.
- `redirectTo` comes from OJS's own `Location` header, so each role lands on the
  dashboard OJS chooses for it rather than a hardcoded path.

## Verified

Against `journal.northsumateraophthalmology.com` (OJS 3.5.0.4):

| Check | Result |
|---|---|
| Wrong password | `ok:false`, OJS message surfaced verbatim |
| Correct password | `ok:true`, 302 → `/dashboard/editorial` |
| Session regeneration on login | yes (fixation-safe) |
| Country options scraped | 249 |

Not yet verified: the cross-IP hand-off, which needs the two OJS changes above
plus a real browser.
