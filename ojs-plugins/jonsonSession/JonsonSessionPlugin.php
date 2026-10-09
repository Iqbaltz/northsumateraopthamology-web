<?php

/**
 * @file plugins/generic/jonsonSession/JonsonSessionPlugin.php
 *
 * @class JonsonSessionPlugin
 *
 * @brief Tells the branded JONSON site who is signed in to OJS.
 *
 * Adds a `whoami` page to the journal. The branded site (a sibling subdomain of
 * this OJS host, so the session cookie is sent along) fetches it from the
 * browser to show the signed-in user's menu in its header.
 *
 * Signing out of OJS itself also lands on the branded site's login page rather
 * than OJS's own.
 */

namespace APP\plugins\generic\jonsonSession;

use APP\core\Application;
use PKP\plugins\GenericPlugin;
use PKP\plugins\Hook;

class JonsonSessionPlugin extends GenericPlugin
{
    /** Page the endpoint is served under: {journal}/whoami */
    public const PAGE = 'whoami';

    /**
     * Registrable domain of the branded site. Pages served over HTTPS from this
     * domain or any of its subdomains may read the session status and send users
     * back after signing out.
     */
    public const ALLOWED_DOMAIN = 'northsumateraophthalmology.com';

    /** Where signing out lands when no acceptable `returnTo` is given. */
    public const DEFAULT_RETURN_URL = 'https://www.northsumateraophthalmology.com/';

    /** Where OJS's own sign-out (login/signOut) sends people. */
    public const SIGNED_OUT_URL = 'https://www.northsumateraophthalmology.com/login';

    /**
     * @copydoc Plugin::register()
     *
     * @param null|mixed $mainContextId
     */
    public function register($category, $path, $mainContextId = null)
    {
        $success = parent::register($category, $path, $mainContextId);
        if (Application::isUnderMaintenance()) {
            return $success;
        }

        if ($success && $this->getEnabled($mainContextId)) {
            Hook::add('LoadHandler', $this->setPageHandler(...));
            Hook::add('Request::redirect', $this->redirectSignOut(...));
        }
        return $success;
    }

    /**
     * Send OJS's own sign-out (dashboard user menu → login/signOut) to the
     * branded login page instead of OJS's.
     */
    public function redirectSignOut(string $hookName, array $args): bool
    {
        $url = &$args[0];
        $request = Application::get()->getRequest();

        if ($request->getRequestedPage() === 'login' && $request->getRequestedOp() === 'signOut') {
            $url = self::SIGNED_OUT_URL;
        }
        return Hook::CONTINUE;
    }

    /**
     * Route {journal}/whoami to this plugin's handler.
     */
    public function setPageHandler(string $hookName, array $args): bool
    {
        $page = &$args[0];
        $handler = &$args[3];

        if ($page !== self::PAGE) {
            return Hook::CONTINUE;
        }

        $handler = new JonsonSessionHandler();
        return Hook::ABORT;
    }

    /**
     * The request's `Origin`, normalised, when it is the branded site; null otherwise.
     */
    public static function allowedOrigin(string $origin): ?string
    {
        $parts = self::brandedUrlParts($origin);
        return $parts ? self::authority($parts) : null;
    }

    /**
     * A URL on the branded site, rebuilt from its validated parts so the redirect
     * target is exactly the host that was checked; null for anything else.
     */
    public static function allowedReturnUrl(string $url): ?string
    {
        $parts = self::brandedUrlParts($url);
        if (!$parts) {
            return null;
        }

        return self::authority($parts)
            . ($parts['path'] ?? '/')
            . (isset($parts['query']) ? "?{$parts['query']}" : '')
            . (isset($parts['fragment']) ? "#{$parts['fragment']}" : '');
    }

    /**
     * Parts of an HTTPS URL on the allowed domain or one of its subdomains (any
     * port, so a local dev host on a subdomain works too).
     */
    private static function brandedUrlParts(string $url): ?array
    {
        // Browsers read backslashes and control characters differently from
        // parse_url(), which would let a crafted URL pass here yet go elsewhere.
        if (preg_match('/[\\\\\s[:cntrl:]]/', $url)) {
            return null;
        }

        $parts = parse_url($url);
        if (!$parts
            || ($parts['scheme'] ?? '') !== 'https'
            || !isset($parts['host'])
            || isset($parts['user'])
            || isset($parts['pass'])
        ) {
            return null;
        }

        $parts['host'] = strtolower($parts['host']);
        $allowed = $parts['host'] === self::ALLOWED_DOMAIN
            || str_ends_with($parts['host'], '.' . self::ALLOWED_DOMAIN);

        return $allowed ? $parts : null;
    }

    private static function authority(array $parts): string
    {
        return "https://{$parts['host']}" . (isset($parts['port']) ? ":{$parts['port']}" : '');
    }

    /**
     * @copydoc Plugin::getDisplayName()
     */
    public function getDisplayName()
    {
        return __('plugins.generic.jonsonSession.displayName');
    }

    /**
     * @copydoc Plugin::getDescription()
     */
    public function getDescription()
    {
        return __('plugins.generic.jonsonSession.description');
    }
}
