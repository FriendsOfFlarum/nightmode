<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Nightmode\Listeners;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiAttributes
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var ExtensionManager
     */
    protected $extensions;

    public function __construct(SettingsRepositoryInterface $settings, ExtensionManager $extensions)
    {
        $this->settings = $settings;
        $this->extensions = $extensions;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'prepareApiAttributes']);
    }

    public function prepareApiAttributes(Serializing $event)
    {
        if ($event->isSerializer(ForumSerializer::class)) {
            $event->attributes['fof-nightmode_default_theme'] = $this->getDefaultNightmodeTheme();
        }
    }

    private function getDefaultNightmodeTheme(): int
    {
        return (int) app('flarum.settings')->get('fof-nightmode.default_theme', 0);
    }
}
