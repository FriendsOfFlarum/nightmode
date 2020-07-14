<?php


namespace FoF\NightMode;


use Flarum\Foundation\AbstractServiceProvider;
use Flarum\Frontend\Content\Assets as AssetsContent;

class AssetsServiceProvider extends AbstractServiceProvider
{
    public function register()
    {
        $this->app->extend(AssetsContent::class, function (AssetsContent $original) {
            return app(Content\Assets::class);
        });
    }
}
