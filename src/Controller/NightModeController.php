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

namespace Reflar\NightMode\Controller;

use Flarum\Http\Controller\AbstractHtmlController;
use Flarum\Install\Prerequisite\PrerequisiteInterface;
use Illuminate\Contracts\View\Factory;
use Psr\Http\Message\ServerRequestInterface as Request;

class NightModeController extends AbstractHtmlController
{
    /**
     * @var Factory
     */
    protected $view;
    /**
     * @param Factory $view
     */
    public function __construct(Factory $view,  Cookie $cookie )
    {
        $this->view = $view;
        $this->cookie = $cookie;
    }
    /**
     * @param Request $request
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function render(Request $request)
    {
    //    var_dump($request->getCookieParams());
    }
}
