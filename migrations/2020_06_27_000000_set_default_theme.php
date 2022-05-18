<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Illuminate\Database\Schema\Builder;

// Migration no longer required, default setting is now set via extend.php
// However, this migration is still required in case of migration run down.
return [
    'up' => function (Builder $schema) {
        //
    },
    'down' => function (Builder $schema) {
        //
    },
];
