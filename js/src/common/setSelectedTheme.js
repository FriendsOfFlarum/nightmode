import { extend } from 'flarum/extend';
import Page from 'flarum/components/Page';

import Themes from './config';
import fixInvalidThemeSetting from '../forum/fixInvalidThemeSetting';
import getTheme from '../forum/getTheme';

export default () => {
    extend(Page.prototype, 'init', setTheme);
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

    const CurrentTheme = getTheme(app);

    setThemeFromID(CurrentTheme);
}

export function getUrls() {
    return {
        day: app.data['fof-nightmode.assets.day'],
        night: app.data['fof-nightmode.assets.night'],
    };
}

export function getCurrentStyle() {
    const urls = getUrls();

    return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).find((el) => el.href === urls.day || el.href === urls.night);
}

export function setThemeFromID(theme) {
    const urls = getUrls();

    const forumStyle = getCurrentStyle();

    if (theme === Themes.DARK) {
        setStyle(forumStyle, urls.night);
    } else if (theme === Themes.LIGHT) {
        setStyle(forumStyle, urls.day);
    } else {
        const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        setStyle(forumStyle, urls[preferDark ? 'night' : 'day']);
    }
}

const showBody = () => (document.body.style.display = 'block');

export function setStyle(forumStyle, url) {
    if (forumStyle && url === forumStyle.href) return;

    let el;

    if (forumStyle) {
        el = forumStyle.cloneNode();
    } else {
        el = document.createElement('link');
        el.setAttribute('rel', 'stylesheet');
    }

    el.setAttribute('href', url);

    document.head.append(el);

    if (forumStyle) {
        el.onload = () => {
            forumStyle.remove();
            showBody();
        };
    } else {
        el.onload = showBody;
        el.onerror = showBody;
    }
}
