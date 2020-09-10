import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';

import Themes from './Themes';
import fixInvalidThemeSetting from '../forum/fixInvalidThemeSetting';
import getTheme from '../forum/getTheme';

export default () => {
    extend(Page.prototype, 'oninit', setTheme);
};

export function setTheme() {
    const { user } = app.session;

    if (!user) {
        // Default to automatic theme when visiting as guest
        setThemeFromID(Themes.DEFAULT());
        return;
    }

    const PerDevice = user.preferences().fofNightMode_perDevice;

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

    if (light && dark) {
        if (getTheme() === 0) return;

        const el = type === 'day' ? dark : light;
        const current = type === 'day' ? light : dark;

        el.remove();

        current.setAttribute('media', '');
        current.className = 'nightmode';
    } else {
        const el = light || dark || document.querySelector('link.nightmode[rel=stylesheet]');

        const url = getUrls()[type];

        if (url !== el.href) {
            el.href = url;
            el.className = 'nightmode';
        }
    }
}
