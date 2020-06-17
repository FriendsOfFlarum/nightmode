import { extend } from 'flarum/extend';
import TagsPage from 'flarum/tags/components/TagsPage';

import Page from 'flarum/components/Page';
import fixInvalidThemeSetting from './fixInvalidThemeSetting';

import Themes from '../common/config';
import getTheme from './getTheme';

export default function () {
    extend(Page.prototype, 'init', setTheme);

    if (TagsPage) {
        extend(TagsPage.prototype, 'config', setTheme);
    }
}

export function setTheme() {
    const { user } = app.session;

    if (!user) {
        // Default to automatic theme when visiting as guest
        setThemeFromID(Themes.DEFAULT(app));
        return;
    }

    const PerDevice = user.preferences().fofNightMode_perDevice;

    if (PerDevice) {
        fixInvalidThemeSetting();
    }

    const CurrentTheme = getTheme(app);

    setThemeFromID(CurrentTheme);
}

export function setThemeFromID(theme) {
    switch (theme) {
        case Themes.LIGHT: // light
            setLight();
            break;
        case Themes.DARK: // dark
            setDark();
            break;

        // Handles auto and other unexpected cases
        default:
            setAuto();
            break;
    }
}

/*
    We need to forcefully remove unused dark classes when switching theme as
    this function *could* be called from the Settings page where a dark theme
    is already chosen, and we're meant to be switching to a light theme.
*/

function setAuto() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDark();
    } else {
        setLight();
    }
}

function setLight() {
    $('body').removeClass('dark');
}

function setDark() {
    $('body').addClass('dark');
}
