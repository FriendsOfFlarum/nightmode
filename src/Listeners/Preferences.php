<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode\Listeners;

use Flarum\Event\ConfigureUserPreferences;
use Illuminate\Contracts\Events\Dispatcher;

class Preferences
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureUserPreferences::class, [$this, 'addUserPreference']);
    }

    public function addUserPreference(ConfigureUserPreferences $event)
    {
        $event->add('fofNightMode_perDevice', 'boolval', false);

        $event->add(
            'fofNightMode_themeType',
            'intval',
            (int) app('flarum.settings')->get('fof-nightmode.default_theme', 0)
        );
    }
}
