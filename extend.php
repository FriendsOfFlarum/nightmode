<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Extend\Extend as FoFExtend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Content\HideBody::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->content(Content\HideBody::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new FoFExtend\ExtensionSettings())
        ->addKey('fof-nightmode.default_theme'),

    function (Application $app) {
        $app->register(AssetsServiceProvider::class);
    },

    (new Extend\User())
        ->registerPreference('fofNightMode', function ($value) {
            if ($value === '' || $value === null) {
                $value = (int) app(SettingsRepositoryInterface::class)->get('fof-nightmode.default_theme', 0);
            }

            return (int) $value;
        })
        ->registerPreference('fofNightMode_perDevice', null, false),
];
