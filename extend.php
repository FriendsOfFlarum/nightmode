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

use Flarum\Event\ConfigureUserPreferences;
use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Frontend\Document;
use FoF\Components\Extend\AddFofComponents;
use FoF\Extend\Extend as FoFExtend;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Support\Arr;

return [
    new AddFofComponents(),
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Content\HideBody::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->content(Content\HideBody::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new FoFExtend\ExtensionSettings())
        ->addKey('fof-nightmode.default_theme'),

    function (Application $app, Dispatcher $events) {
        $app->register(AssetsServiceProvider::class);

        $events->listen(ConfigureUserPreferences::class, function (ConfigureUserPreferences $event) {
            $event->add(
                'fofNightMode',
                'intval',
                (int) app('flarum.settings')->get('fof-nightmode.default_theme', 0)
            );

            $event->add('fofNightMode_perDevice', 'boolval', false);
        });
    },
];
