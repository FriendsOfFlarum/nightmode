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

        //! WARN:   If you change this value, also remember
        //!         to change the value which is set by
        //!         default if an invalid theme is detected
        //!         in Themes.js
        $event->add('fofNightMode_themeType', 'intval', 0);
    }
}
