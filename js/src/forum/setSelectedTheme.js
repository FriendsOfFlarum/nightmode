import { extend } from 'flarum/extend';
import TagsPage from 'flarum/tags/components/TagsPage';

import Page from 'flarum/components/Page';
import fixInvalidThemeSetting from './fixInvalidThemeSetting';

import Themes from '../common/config';
import GetTheme from './getTheme';

export default function () {
    extend(Page.prototype, 'init', SetTheme);

    if (TagsPage) {
        extend(TagsPage.prototype, 'config', SetTheme);
    }
}

export function SetTheme() {
    const { user } = app.session;

    if (!user) {
        // Default to automatic theme when visiting as guest
        SetThemeFromID(Themes.DEFAULT(app));
        return;
    }

    const PerDevice = user.preferences().fofNightMode_perDevice;

    if (PerDevice) {
        fixInvalidThemeSetting();
    }

    const CurrentTheme = GetTheme(user);

    SetThemeFromID(CurrentTheme);
}

export function SetThemeFromID(theme) {
    switch (theme) {
        case Themes.AUTO: // auto
            setAuto();
            break;
        case Themes.LIGHT: // light
            setLight();
            break;
        case Themes.DARK: // dark
            setDark();
            break;

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
