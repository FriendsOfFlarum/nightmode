<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode\Content;

use Flarum\Frontend\Document;
use Flarum\Http\RequestUtil;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface as Request;

class Assets extends \Flarum\Frontend\Content\Assets
{
    /**
     * @param Document $document
     * @param Request  $request
     */
    public function __invoke(Document $document, Request $request)
    {
        $frontend = $this->assets->getName();

        // Ensure that assets are populated and automatically recompiled if in debug mode.
        parent::__invoke($document, $request);

        // Only apply nightmode to forum & admin frontends
        if ($frontend !== 'forum' && $frontend !== 'admin') {
            // Add CSS of other frontends directly to $document->head instead of the document
            // itself adding the links so it loads after the main forum CSS.
            //
            // E.g. fixes flarum/embed styles looking funny with nightmode installed.
            foreach ($document->css as $css) {
                $document->head[] = sprintf('<link rel="stylesheet" href="%s" />', $css);
            }

            // Wipe CSS list
            $document->css = [];

            return;
        }

        $nightCss = $this->assets->makeDarkCss();
        $dayCss = $this->assets->makeCss();

        if ($this->config->inDebugMode()) {
            $this->forceCommit([$dayCss, $nightCss]);
        }

        $preference = $this->getThemePreference($request);

        $isAuto = $preference === 0;

        if ($preference === 1 || $isAuto) {
            $document->head[] = $this->generateTag($dayCss->getUrl(), 'light', $isAuto);
        }
        if ($preference === 2 || $isAuto) {
            $document->head[] = $this->generateTag($nightCss->getUrl(), 'dark', $isAuto);
        }

        $document->payload['fof-nightmode.assets.day'] = $dayCss->getUrl();
        $document->payload['fof-nightmode.assets.night'] = $nightCss->getUrl();
    }

    protected function assembleCompilers(?string $locale): array
    {
        return [
            'js'  => [$this->assets->makeJs(), $this->assets->makeLocaleJs($locale)],
            'css' => [$this->assets->makeLocaleCss($locale)],
        ];
    }

    /**
     * @param string|null $url
     * @param string      $type
     * @param string      $auto
     *
     * @return string
     */
    protected function generateTag(?string $url, string $type, string $auto): string
    {
        return sprintf(
            '<link rel="stylesheet" media="%s" class="nightmode-%s" href="%s" />',
            $auto ? ($type === 'dark' ? '(prefers-color-scheme: dark)' : 'not all and (prefers-color-scheme: dark)') : '',
            $type,
            $url
        );
    }

    /**
     * @param Request $request
     *
     * @return int
     */
    protected function getThemePreference(Request $request): int
    {
        $actor = RequestUtil::getActor($request);
        $default = (int) resolve('flarum.settings')->get('fof-nightmode.default_theme');

        if ($actor->getPreference('fofNightMode_perDevice')) {
            return (int) Arr::get($request->getCookieParams(), 'flarum_nightmode', $default);
        }

        return (int) ($actor->getPreference('fofNightMode') ?? $default);
    }
}
