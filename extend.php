<?php

namespace FoF\NightMode;

use Flarum\Extend;
use Flarum\Foundation\Application;
use Flarum\Event\ConfigureUserPreferences;
use FoF\Extend\Extend as FoFExtend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->content(Content\HideBody::class),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less')
        ->content(Content\HideBody::class),

    new Extend\Locales(__DIR__ . '/resources/locale'),

    (new FlarumExtend\ExtensionSettings())
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
