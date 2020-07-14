<?php


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
