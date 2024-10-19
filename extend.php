<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode;

use Flarum\Extend;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\DefaultUserPreferences\Extend\RegisterUserPreferenceDefault;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->content(Content\HideBody::class)
        ->content(Content\PatchUnsupportedAutoNightmode::class)
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less')
        ->content(Content\HideBody::class)
        ->content(Content\PatchUnsupportedAutoNightmode::class),

    new Extend\Locales(__DIR__.'/resources/locale'),

    (new Extend\ServiceProvider())
        ->register(Provider\AssetsServiceProvider::class),

    (new Extend\User())
        ->registerPreference('fofNightMode', function ($value) {
            if ($value === '' || $value === null) {
                $value = (int) resolve(SettingsRepositoryInterface::class)->get('fof-nightmode.default_theme', 0);
            }

            return (int) $value;
        })
        ->registerPreference('fofNightMode_perDevice', null, false),

    (new Extend\Settings())
        ->default('fof-nightmode.default_theme', 0)
        ->default('fofNightMode.show_theme_toggle_on_header_always', false)
        ->default('fofNightMode.show_theme_toggle_in_solid', true)
        ->serializeToForum('fofNightMode_autoUnsupportedFallback', 'theme_dark_mode', function ($val) {
            $val = (bool) $val;

            // 2 = night mode, 1 = light mode, 0 = auto
            if ($val) {
                return 2;
            }

            return 1;
        }, false)
        ->serializeToForum('fofNightMode.showThemeToggleOnHeaderAlways', 'fofNightMode.show_theme_toggle_on_header_always', 'boolval')
        ->serializeToForum('fof-nightmode.default_theme', 'fof-nightmode.default_theme', 'intval')
        ->serializeToForum('fofNightMode.showThemeToggleInSolid', 'fofNightMode.show_theme_toggle_in_solid', 'boolval'),

    (new Extend\Conditional())
        ->whenExtensionEnabled('fof-default-user-preferences', fn () => [
            (new RegisterUserPreferenceDefault())
                ->default('fofNightMode', 0, 'number')
                ->default('fofNightMode_perDevice', false, 'bool'),
        ]),
];
