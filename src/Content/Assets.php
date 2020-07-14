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

use Flarum\Frontend\Compiler\CompilerInterface;
use Flarum\Frontend\Document;
use Flarum\User\User;
use Psr\Http\Message\ServerRequestInterface as Request;

class Assets extends \Flarum\Frontend\Content\Assets
{
    public function __invoke(Document $document, Request $request)
    {
        $locale = $request->getAttribute('locale');
        $nightCss = $this->assets->makeDarkCss();
        $dayCss = $this->assets->makeCss();

        $preference = $this->getPreference($request);
        $mainCss = $preference === 2
            ? $nightCss
            : (
                $preference === 1
                    ? $dayCss
                    : null
            );

        $compilers = [
            'js'  => [$this->assets->makeJs(), $this->assets->makeLocaleJs($locale)],
            'css' => [$this->assets->makeLocaleCss($locale)],
        ];

        if ($mainCss) {
            $compilers['css'][] = $mainCss;
        }

        if ($this->app->inDebugMode()) {
            $this->commit(array_flatten($compilers));
        }

        $document->js = array_merge($document->js, $this->getUrls($compilers['js']));
        $document->css = array_merge($document->css, $this->getUrls($compilers['css']));

        $document->payload['fof-nightmode.assets.day'] = $dayCss->getUrl();
        $document->payload['fof-nightmode.assets.night'] = $nightCss->getUrl();
    }

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

    protected function getPreference(Request $request)
    {
        /**
         * @var User $actor
         */
        $actor = $request->getAttribute('actor');
        $default = (int) $this->app['flarum.settings']->get('fof-nightmode.default_theme');
        $preference = $actor->getPreference('fofNightMode', $default);

        if ($actor->getPreference('fofNightMode_perDevice')) {
            return null;
        }

        return $preference;
    }
}
