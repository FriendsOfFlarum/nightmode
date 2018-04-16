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

    public function addAssets(ConfigureWebApp $app)
    {
        $request = $app->request;
        $actor = $request->getAttribute('actor');

        if ($app->isForum()) {
            $app->addAssets([
                __DIR__ . '/../../js/forum/dist/extension.js'
            ]);

            if (FALSE !== $actor->getPreference('reflarNightMode')) {
                $app->addAssets([
                    __DIR__.'/../../resources/forum/extension.less'
                ]);
            }

            $app->addBootstrapper('reflar/nightmode/main');
        }
    }
}
