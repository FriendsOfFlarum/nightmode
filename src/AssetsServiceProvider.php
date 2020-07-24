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

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Frontend\Content\Assets as AssetsContent;
use Flarum\Frontend\RecompileFrontendAssets as Recompile;

class AssetsServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app->extend(AssetsContent::class, function (AssetsContent $original) {
            return app(Content\Assets::class);
        });

        $this->app->extend(Recompile::class, function (Recompile $original) {
            return app(Frontend\RecompileFrontendAssets::class);
        });
    }
}
