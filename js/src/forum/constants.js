/*

    JS enum equivalent. Makes sure no value mix-ups are made!

    DEFAULT is used when an invalid value has been set, as well as for guest and new users.

*/

const Themes = {
    AUTO: 0,
    LIGHT: 1,
    DARK: 2,

    //! WARN:   If you change this value, also remember
    //!         to change the value which is set to all users
    //!         by default in Preferences.php
    DEFAULT: 0,
};

const Constants = {
    localStorageKey: `fofNightMode_deviceTheme`,
};

export default Themes;

export { Themes, Constants };
