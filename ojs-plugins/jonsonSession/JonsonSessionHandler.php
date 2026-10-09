<?php

/**
 * @file plugins/generic/jonsonSession/JonsonSessionHandler.php
 *
 * @class JonsonSessionHandler
 *
 * @brief Serves {journal}/whoami and {journal}/whoami/signOut.
 */

namespace APP\plugins\generic\jonsonSession;

use APP\facades\Repo;
use APP\file\PublicFileManager;
use APP\handler\Handler;
use PKP\core\PKPRequest;
use PKP\security\Validation;
use PKP\user\User;
use PKP\userGroup\UserGroup;

class JonsonSessionHandler extends Handler
{
    public function __construct()
    {
        parent::__construct();
        // The status must stay readable when the journal requires login to browse.
        $this->setEnforceRestrictedSite(false);
    }

    /**
     * GET {journal}/whoami — who is signed in, as JSON.
     *
     * Only the branded site gets CORS headers, so no other origin can read the
     * user's name or the CSRF token even though the browser sends the cookie.
     *
     * @param array $args
     * @param PKPRequest $request
     */
    public function index($args, $request)
    {
        $origin = JonsonSessionPlugin::allowedOrigin($_SERVER['HTTP_ORIGIN'] ?? '');
        if ($origin) {
            header("Access-Control-Allow-Origin: {$origin}");
            header('Access-Control-Allow-Credentials: true');
        }
        header('Vary: Origin, Cookie');
        header('Cache-Control: no-store, private');
        header('Content-Type: application/json');

        $user = $request->getUser();
        if (!$user) {
            return json_encode(['loggedIn' => false]);
        }

        return json_encode([
            'loggedIn' => true,
            'user' => [
                'fullName' => $user->getFullName(),
                'initials' => $this->initials($user),
                'avatarUrl' => $this->avatarUrl($user, $request),
            ],
            'roles' => $this->roleNames($user, $request),
            'links' => [
                'dashboard' => $this->dashboardUrl($request),
                'profile' => $request->url(null, 'user', 'profile'),
            ],
            // Lets the branded site post to signOut below.
            'csrfToken' => $request->getSession()->token(),
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    /**
     * POST {journal}/whoami/signOut — sign out, then return to the branded site.
     *
     * OJS's own login/signOut can only redirect within this host. A request
     * without a valid CSRF token is sent back without signing anyone out.
     *
     * @param array $args
     * @param PKPRequest $request
     */
    public function signOut($args, $request)
    {
        $returnTo = JonsonSessionPlugin::allowedReturnUrl((string) $request->getUserVar('returnTo'))
            ?? JonsonSessionPlugin::DEFAULT_RETURN_URL;

        if ($request->isPost() && $request->checkCSRF() && Validation::isLoggedIn()) {
            Validation::logout();
        }

        $request->redirectUrl($returnTo);
    }

    /**
     * Where OJS itself sends this user after signing in (editorial, review or
     * author dashboard); null for readers, who have no dashboard.
     */
    private function dashboardUrl(PKPRequest $request): ?string
    {
        $pageRouter = $request->getRouter(); /** @var \PKP\core\PKPPageRouter $pageRouter */
        $homeUrl = $pageRouter->getHomeUrl($request);
        return $homeUrl === $request->url(null, 'index') ? null : $homeUrl;
    }

    /**
     * Names of the user's active groups in this journal, e.g. "Journal editor".
     *
     * @return string[]
     */
    private function roleNames(User $user, PKPRequest $request): array
    {
        $context = $request->getContext();
        if (!$context) {
            return [];
        }

        return Repo::userGroup()
            ->userUserGroups($user->getId(), $context->getId())
            ->sortBy(fn (UserGroup $userGroup) => $userGroup->role_id)
            ->map(fn (UserGroup $userGroup) => $userGroup->getLocalizedData('name'))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    private function initials(User $user): string
    {
        $initials = '';
        foreach ([$user->getLocalizedGivenName(), $user->getLocalizedFamilyName()] as $name) {
            $name = trim((string) $name);
            if ($name !== '') {
                $initials .= mb_strtoupper(mb_substr($name, 0, 1));
            }
        }
        return $initials;
    }

    private function avatarUrl(User $user, PKPRequest $request): ?string
    {
        $profileImage = $user->getData('profileImage');
        if (empty($profileImage['uploadName'])) {
            return null;
        }

        $publicFileManager = new PublicFileManager();
        return $request->getBaseUrl() . '/'
            . $publicFileManager->getSiteFilesPath() . '/'
            . rawurlencode($profileImage['uploadName']);
    }
}
