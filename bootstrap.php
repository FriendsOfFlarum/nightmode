<?php
/*
 * This file is part of reflar/nightmode.
 *
 * Copyright (c) ReFlar.
 *
 * http://reflar.io
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

namespace Reflar\NightMode;

use Illuminate\Contracts\Events\Dispatcher;
use Flarum\Event\ConfigureClientView;


return function (Dispatcher $events) {
    $events->listen(ConfigureClientView::class, function(ConfigureClientView $event) {

        $css = $event->view->getCss();
        $localeCss = $event->view->getLocaleCss();

        $css->flush();
        $lessVariables = function () {
            return $_COOKIE['reflar-nightmode'] == 1 ? '@config-dark-mode: true;' : '@config-dark-mode: false;';
        };

        $css->addString($lessVariables);
        $localeCss->addString($lessVariables);
    });


    $events->subscribe(Listeners\AddClientAssets::class);
    $events->subscribe(Listeners\AddRoutes::class);
};
