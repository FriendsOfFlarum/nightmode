<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode\Content;

use Flarum\Foundation\Application;
use Flarum\Frontend\Compiler\CompilerInterface;
use Flarum\Frontend\Document;
use Flarum\User\User;
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
        $locale = $request->getAttribute('locale');
        $nightCss = $this->assets->makeDarkCss();
        $dayCss = $this->assets->makeCss();

        $preference = $this->getPreference($request);

        $compilers = [
            'js'  => [$this->assets->makeJs(), $this->assets->makeLocaleJs($locale)],
            'css' => [$this->assets->makeLocaleCss($locale)],
        ];

        if (app(Application::class)->inDebugMode()) {
            $this->commit(Arr::flatten($compilers));
            $this->commit([$dayCss, $nightCss]);
        }

        $isAuto = $preference === 0;

        if ($preference === 1 || $isAuto) {
            $document->head[] = $this->generateTag($dayCss->getUrl(), 'light', $isAuto);
        }

        if ($preference === 2 || $isAuto) {
            $document->head[] = $this->generateTag($nightCss->getUrl(), 'dark', $isAuto);
        }

        $document->js = array_merge($document->js, $this->getUrls($compilers['js']));
        $document->css = array_merge($document->css, $this->getUrls($compilers['css']));

        $document->payload['fof-nightmode.assets.day'] = $dayCss->getUrl();
        $document->payload['fof-nightmode.assets.night'] = $nightCss->getUrl();
    }

    /**
     * @param string|null $url
     * @param string      $type
     * @param string      $auto
     *
     * @return string
     */
    protected function generateTag(?string $url, string $type, string $auto)
    {
        return sprintf(
            '<link rel="stylesheet" media="%s" class="nightmode-%s" href="%s" />',
            $auto && $type === 'dark' ? '(prefers-color-scheme: dark)' : '',
            $type,
            $url
        );
    }

    /**
     * @param Request $request
     *
     * @return int
     */
    protected function getPreference(Request $request)
    {
        /**
         * @var User $actor
         */
        $actor = $request->getAttribute('actor');
        $default = (int) app('flarum.settings')->get('fof-nightmode.default_theme');

        if ($actor->getPreference('fofNightMode_perDevice')) {
            return (int) Arr::get($request->getCookieParams(), 'flarum_nightmode', $default);
        }

        return (int) $actor->getPreference('fofNightMode', $default);
    }

    // --- original ---

    /**
     * @param array $compilers
     */
    private function commit(array $compilers)
    {
        foreach ($compilers as $compiler) {
            $compiler->commit();
        }
    }

    /**
     * @param CompilerInterface[] $compilers
     *
     * @return string[]
     */
    private function getUrls(array $compilers)
    {
        return array_filter(array_map(function (CompilerInterface $compiler) {
            return $compiler->getUrl();
        }, $compilers));
    }
}
