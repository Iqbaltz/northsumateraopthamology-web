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

### 2. Apache — scope the session cookie to the parent domain

OJS 3.5 always issues its session cookie for the request host:

```
Set-Cookie: OJSSID=…; path=/; domain=journal.northsumateraophthalmology.com; secure; httponly; samesite=lax
```

It has no setting for this — the domain is hardcoded from the request
(`lib/pkp/classes/core/PKPContainer.php`), and its Laravel session ignores PHP's
`session.cookie_domain`, so `php_value session.cookie_domain …` has **no effect**.

Without a fix the browser holds two cookies named `OJSSID` — OJS's on `journal.*`
and the landing app's on the parent domain — and PHP reads whichever comes first
(the older one). After a sign-out, signing in on OJS directly can then appear to
fail until the stale cookie expires.

The fix rewrites the cookie's domain on its way out, in the OJS docroot
`.htaccess` (`/var/www/html/ojs/.htaccess`). It needs `mod_headers`
(`a2enmod headers && systemctl reload apache2`):

```apache
<IfModule mod_headers.c>
    # Share OJS's session cookie with the branded site: one OJSSID on the parent
    # domain instead of one per host.
    Header edit Set-Cookie "^(OJSSID=[^;]*;.*)domain=journal\.northsumateraophthalmology\.com" "$1domain=.northsumateraophthalmology.com"

    # Whenever OJS issues it, also expire the old journal-only cookie, so browsers
    # that still hold one stop sending a stale id first. OJS re-sends the session
    # cookie on every response, so existing sessions move over on the next page.
    Header always add Set-Cookie "OJSSID=deleted; Domain=journal.northsumateraophthalmology.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; Secure; HttpOnly; SameSite=Lax" "expr=resp('Set-Cookie') =~ /OJSSID=/"
</IfModule>
```

Check it with `curl -sI https://journal.northsumateraophthalmology.com/index.php/JONSON/login`:
one `OJSSID=…; domain=.northsumateraophthalmology.com` and one expired
`OJSSID=deleted; Domain=journal…`.

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

## Session status in the header

The header shows who is signed in to OJS: an avatar menu with Dashboard, Edit
Profile and Logout instead of the Login button. Signing in on either site counts.

```
browser (northsumateraophthalmology.com)
   │  fetch {OJS}/whoami, credentials: include   ← OJSSID rides along (same site)
   ▼
OJS plugin jonsonSession  →  { loggedIn, user, roles, links, csrfToken }
```

The check runs in the browser, so pages stay static and the session is used from
the visitor's own IP. It works because both hosts share a registrable domain:
browsers treat the request as same-site and send the `SameSite=Lax` cookie. It
would **not** work from an unrelated domain (third-party cookies are blocked).

Relevant code:

- `ojs-plugins/jonsonSession/` — the OJS generic plugin
- `src/components/auth/useOjsSession.ts` — fetches and caches the status
- `src/components/auth/UserMenu.tsx` — desktop dropdown and mobile drawer block

### Installing the plugin

1. Copy `ojs-plugins/jonsonSession` to `{ojs}/plugins/generic/jonsonSession`.
2. In OJS: **Website Settings → Plugins → Generic Plugins**, enable
   *JONSON Session Status*.
3. Check it:

   ```bash
   curl -i -H "Origin: https://northsumateraophthalmology.com" \
     https://journal.northsumateraophthalmology.com/index.php/JONSON/whoami
   ```

   Expect `{"loggedIn":false}` with `Access-Control-Allow-Origin` and
   `Access-Control-Allow-Credentials: true`. With `-H "Origin: https://example.com"`
   the CORS headers must be absent.

### Endpoints

| Endpoint | Purpose |
|---|---|
| `GET {journal}/whoami` | Status JSON. CORS only for `https://` origins on `northsumateraophthalmology.com` or its subdomains. `Cache-Control: no-store`. |
| `POST {journal}/whoami/signOut` | Fields `csrfToken`, `returnTo`. Signs out when the token matches, then redirects to `returnTo` if it is on the same allowed domain, else to the home page. |

OJS's own `login/signOut` can only redirect within the OJS host, hence the second
endpoint. The allowed domain is `JonsonSessionPlugin::ALLOWED_DOMAIN` — update it
if the branded site ever moves.

The single-cookie requirement above applies here too: with two `OJSSID` cookies
in the browser, `whoami` may read the wrong session.

### Testing locally

From `localhost` the request is cross-site and the cookie is not sent, so the
header always shows Login. To test against the live OJS with a real session,
serve the app from a subdomain of the shared domain:

1. Add `127.0.0.1 local.northsumateraophthalmology.com` to the hosts file.
2. `npx next dev --experimental-https --hostname local.northsumateraophthalmology.com`
3. Sign in on the journal, then open `https://local.northsumateraophthalmology.com:3000`
   (the generated certificate is issued for `localhost`, so accept the warning).

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
