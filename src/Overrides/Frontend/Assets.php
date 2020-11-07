<?php

/*
 * This file is part of fof/nightmode.
 *
 * Copyright (c) 2020 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Flarum\Frontend;

use Flarum\Frontend\Compiler\CompilerInterface;
use Flarum\Frontend\Compiler\JsCompiler;
use Flarum\Frontend\Compiler\LessCompiler;
use Flarum\Frontend\Compiler\Source\SourceCollector;
use Illuminate\Contracts\Filesystem\Filesystem;

class Assets
{
    /**
     * @var array
     */
    public $sources = [
        'js'        => [],
        'css'       => [],
        'localeJs'  => [],
        'localeCss' => [],
    ];

    /**
     * @var string
     */
    protected $name;

    /**
     * @var Filesystem
     */
    protected $assetsDir;

    /**
     * @var string
     */
    protected $cacheDir;

    /**
     * @var array
     */
    protected $lessImportDirs;

    /**
     * Assets constructor.
     *
     * @param string      $name
     * @param Filesystem  $assetsDir
     * @param string|null $cacheDir
     * @param array|null  $lessImportDirs
     */
    public function __construct(string $name, Filesystem $assetsDir, string $cacheDir = null, array $lessImportDirs = null)
    {
        $this->name = $name;
        $this->assetsDir = $assetsDir;
        $this->cacheDir = $cacheDir;
        $this->lessImportDirs = $lessImportDirs;
    }

    /**
     * @param $sources
     *
     * @return $this
     */
    public function js($sources)
    {
        $this->addSources('js', $sources);

        return $this;
    }

    /**
     * @param $callback
     *
     * @return $this
     */
    public function css($callback)
    {
        $this->addSources('css', $callback);

        return $this;
    }

    /**
     * @param $callback
     *
     * @return $this
     */
    public function localeJs($callback)
    {
        $this->addSources('localeJs', $callback);

        return $this;
    }

    /**
     * @param $callback
     *
     * @return $this
     */
    public function localeCss($callback)
    {
        $this->addSources('localeCss', $callback);

        return $this;
    }

    /**
     * @param $type
     * @param $callback
     */
    private function addSources($type, $callback)
    {
        $this->sources[$type][] = $callback;
    }

    /**
     * @param CompilerInterface $compiler
     * @param string            $type
     * @param string|null       $locale
     * @param mixed             ...$additionalSource
     */
    private function populate(CompilerInterface $compiler, string $type, string $locale = null, ...$additionalSources)
    {
        $compiler->addSources(function (SourceCollector $sources) use ($type, $locale, $additionalSources) {
            foreach (array_merge($this->sources[$type], $additionalSources) as $callback) {
                $callback($sources, $locale);
            }
        });
    }

    /**
     * @return JsCompiler
     */
    public function makeJs(): JsCompiler
    {
        $compiler = new JsCompiler($this->assetsDir, $this->name.'.js');

        $this->populate($compiler, 'js');

        return $compiler;
    }

    /**
     * @return LessCompiler
     */
    public function makeCss(): LessCompiler
    {
        $compiler = $this->makeLessCompiler($this->name.'.css');

        $this->populate($compiler, 'css');

        return $compiler;
    }

    // ++++++

    /**
     * @return LessCompiler
     */
    public function makeDarkCss(): LessCompiler
    {
        $compiler = $this->makeLessCompiler($this->name.'-dark.css');

        $this->populate($compiler, 'css', null, function (SourceCollector $sources) {
            $sources->addString(function () {
                return '@config-dark-mode: true;';
            });
        });

        return $compiler;
    }

    /**
     * @param string $locale
     *
     * @return JsCompiler
     */
    public function makeLocaleJs(string $locale): JsCompiler
    {
        $compiler = new JsCompiler($this->assetsDir, $this->name.'-'.$locale.'.js');

        $this->populate($compiler, 'localeJs', $locale);

        return $compiler;
    }

    /**
     * @param string $locale
     *
     * @return LessCompiler
     */
    public function makeLocaleCss(string $locale): LessCompiler
    {
        $compiler = $this->makeLessCompiler($this->name.'-'.$locale.'.css');

        $this->populate($compiler, 'localeCss', $locale);

        return $compiler;
    }

    /**
     * @param string $filename
     *
     * @return LessCompiler
     */
    protected function makeLessCompiler(string $filename): LessCompiler
    {
        $compiler = new LessCompiler($this->assetsDir, $filename);

        if ($this->cacheDir) {
            $compiler->setCacheDir($this->cacheDir.'/less');
        }

        if ($this->lessImportDirs) {
            $compiler->setImportDirs($this->lessImportDirs);
        }

        return $compiler;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return Filesystem
     */
    public function getAssetsDir(): Filesystem
    {
        return $this->assetsDir;
    }

    /**
     * @param Filesystem $assetsDir
     */
    public function setAssetsDir(Filesystem $assetsDir)
    {
        $this->assetsDir = $assetsDir;
    }

    /**
     * @return string|null
     */
    public function getCacheDir(): ?string
    {
        return $this->cacheDir;
    }

    /**
     * @param string|null $cacheDir
     */
    public function setCacheDir(?string $cacheDir)
    {
        $this->cacheDir = $cacheDir;
    }

    /**
     * @return array
     */
    public function getLessImportDirs(): array
    {
        return $this->lessImportDirs;
    }

    /**
     * @param array $lessImportDirs
     */
    public function setLessImportDirs(array $lessImportDirs)
    {
        $this->lessImportDirs = $lessImportDirs;
    }
}
