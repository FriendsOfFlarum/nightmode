<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\NightMode\Content;

use Flarum\Frontend\Document;
use Illuminate\Support\Arr;

class HideBody
{
    /**
     * @param Document $document
     */
    public function __invoke(Document $document)
    {
        $isDay = in_array(Arr::get($document->payload, 'fof-nightmode.assets.day'), $document->css);
        $isNight = in_array(Arr::get($document->payload, 'fof-nightmode.assets.night'), $document->css);
        $hasStyle = $isDay || $isNight;

        if (!$hasStyle) {
            $document->meta['color-scheme'] = 'dark light';
        } elseif ($isDay) {
            $document->meta['color-scheme'] = 'light';
        } elseif ($isNight) {
            $document->meta['color-scheme'] = 'dark';
        }
    }
}
