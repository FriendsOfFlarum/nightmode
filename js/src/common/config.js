/*

    JS enum equivalent. Makes sure no value mix-ups are made!

    DEFAULT is used when an invalid value has been set, as well as for guest and new users.

*/

const Themes = {
    AUTO: 0,
    LIGHT: 1,
    DARK: 2,

    DEFAULT: (app) => app.forum.data.attributes['fof-nightmode_default_theme'],
};

const Constants = {
    localStorageKey: `fofNightMode_deviceTheme`,
};

export default Themes;

export { Themes, Constants };
