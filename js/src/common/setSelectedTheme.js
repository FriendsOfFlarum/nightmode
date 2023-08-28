import app from 'flarum/common/app';

import { extend } from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';

import Themes from './Themes';
import fixInvalidThemeSetting from '../forum/fixInvalidThemeSetting';
import getTheme from '../forum/getTheme';

export default () => {
  extend(Page.prototype, 'oninit', setTheme);

  // Register setTheme() as the handler for 'prefers-color-scheme' media property
  // change. This allows to make sure the 'fofnightmodechange' event is dispatched
  // when this property changes, and that the correct stylesheets are loaded.
  const prefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
  prefersColorSchemeDark.addEventListener('change', setTheme);
};

export function setTheme() {
  const { user } = app.session;

  const PerDevice = app.session.user?.preferences().fofNightMode_perDevice;

  if (!user || PerDevice) {
    fixInvalidThemeSetting();
  }

  if (PerDevice) {
    fixInvalidThemeSetting();
  }

  const CurrentTheme = getTheme();

  setThemeFromID(CurrentTheme);
}

export function getUrls() {
  return {
    day: app.data['fof-nightmode.assets.day'],
    night: app.data['fof-nightmode.assets.night'],
  };
}

export function setThemeFromID(theme) {
  if (theme === Themes.DARK) {
    setStyle('night');
  } else if (theme === Themes.LIGHT) {
    setStyle('day');
  } else {
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setStyle(preferDark ? 'night' : 'day');
  }
}

export function setStyle(type) {
  const light = document.querySelector('link.nightmode-light[rel=stylesheet]');
  const dark = document.querySelector('link.nightmode-dark[rel=stylesheet]');

  bothStyleSheets: if (light && dark) {
    if (getTheme() === Themes.AUTO) break bothStyleSheets;

    let newLink = document.createElement('link');

    // onload on link tags not supported in all browsers
    // so we should check it is present in the user's
    // current browser
    if ('onload' in newLink) {
      // if it is, only remove the old link tags after the new
      // one has finished loading (prevents flash of unstyled
      // content)
      newLink.onload = function () {
        light.remove();
        dark.remove();
      };
    } else {
      // if it isn't, just remove the old link tags immediately
      light.remove();
      dark.remove();
    }

    newLink.rel = 'stylesheet';
    newLink.className = 'nightmode';
    newLink.href = getUrls()[type];

    document.head.append(newLink);
  } else {
    const el = light || dark || document.querySelector('link.nightmode[rel=stylesheet]');

    const url = getUrls()[type];

    if (url !== el.href) {
      el.href = url;
      el.className = 'nightmode';
    }
  }

  const colorScheme = document.querySelector('meta[name="color-scheme"]');

  if (colorScheme) {
    colorScheme.content = type === 'night' ? 'dark' : 'light';
  }

  // Dispatch a 'fofnightmodechange' event with 'day' or 'night' as detail.
  // This allows other extensions to integrate with this one.
  const event = new CustomEvent('fofnightmodechange', { detail: type });
  document.dispatchEvent(event);
}
