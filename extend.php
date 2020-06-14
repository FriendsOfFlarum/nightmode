<?php

namespace FoF\NightMode;

use FoF\Extend\Extend as FoFExtend;
use FoF\Components\Extend\AddFofComponents;

use Flarum\Extend;
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
