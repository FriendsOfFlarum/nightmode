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
        ->setPrefix('fof-nightmode.')
        ->addKeys(['default_theme']),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\Preferences::class);
    },
];
