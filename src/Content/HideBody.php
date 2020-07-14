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
    public function __invoke(Document $document)
    {
        $hasStyle = Arr::first($document->css, function ($url) use ($document) {
            return $url === $document->payload['fof-nightmode.assets.day'] || $url === $document->payload['fof-nightmode.assets.night'];
        });

        if (!$hasStyle) {
            $document->head[] = '<style>body { display: none; }</style>';
        }
    }
}
