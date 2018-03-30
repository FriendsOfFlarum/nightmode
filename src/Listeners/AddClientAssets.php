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
namespace Reflar\NightMode\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureLocales;
use Flarum\Event\ConfigureWebApp;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
    }

    /**
     * @param ConfigureWebApp $app
     */
    public function addAssets(ConfigureWebApp $app)
    {
        // if ($app->isForum()) {
        //     $app->addAssets([
        //         __DIR__ . '/../../js/forum/dist/extension.js',
        //         __DIR__ . '/../../resources/less/forum.less'
        //     ]);

        //     $app->addBootstrapper('reflar/polls/main');
        // }

        // if ($app->isAdmin()) {
        //     $app->addAssets([
        //         __DIR__.'/../../js/admin/dist/extension.js'
        //     ]);
            
        //     $app->addBootstrapper('reflar/polls/main');
        // }
    }

}
