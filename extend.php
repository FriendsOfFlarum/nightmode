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
use FoF\Components\Extend\AddFofComponents;
use FoF\Extend\Extend as FoFExtend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    new AddFofComponents(),
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/resources/less/forum/extension.less')
        ->js(__DIR__.'/js/dist/forum.js'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),
    new Extend\Locales(__DIR__.'/resources/locale'),
    (new FoFExtend\ExtensionSettings())
        ->addKey('fof-nightmode.default_theme'),
    function (Dispatcher $events) {
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
