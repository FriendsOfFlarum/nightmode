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
    // Todo: Add cookies (not the real cookies)
    $events->listen(ConfigureClientView::class, function(ConfigureClientView $event) {
        $css = $event->view->getCss();
        $localeCss = $event->view->getLocaleCss();
        
        $lessVariables = function () {
            return '@config-dark-mode: true;';
        };

        $css->addString($lessVariables);
        $localeCss->addString($lessVariables);
    });

    $events->subscribe(Listeners\AddClientAssets::class);
};
