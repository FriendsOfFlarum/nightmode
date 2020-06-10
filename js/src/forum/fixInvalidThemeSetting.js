/*
    This function is designed to catch invalid theme values
    and handle them before they can break Flarum for users.

    E.g. if a user manually edited their local storage to
    set their theme to an invalid value, this theme would
    detect that, and reset it to 0 (auto).

    I'm sure there are still cases where users can break this
    (maybe faking XHRs to Flarum and setting their user prefs
    to use an invalid value) bt those are extremes which
    wouldn't happen unless someone's being an idiot. If someone
    if being an idiot, they deserve to lose Flarum .

    :)

    ---

    David Wheatley
    GitHub: davwheat || giffgaff: mrjeeves
    (not a giffgaff employee, though)
*/

import Themes from "./Themes";

// get array of valid values without duplicate entries
let validValues = [...new Set(Object.values(Themes))];

export default function fixInvalidThemeSetting() {
    let wasInvalid = false;
    let t;

    try {
        t = parseInt(localStorage.getItem("fofNightMode_deviceTheme"));
    } catch (error) {
        console.warn("Theme is not a valid integer! Resetting... (1)");
        localStorage.setItem("fofNightMode_deviceTheme", Themes.DEFAULT);
        wasInvalid = true;
    }

    if (isNaN(t)) {
        console.warn("Theme is not a valid integer! Resetting... (2)");
        localStorage.setItem("fofNightMode_deviceTheme", Themes.DEFAULT);
        wasInvalid = true;
    }

    if (!wasInvalid && !validValues.includes(t)) {
        // theme out of bounds
        console.warn(
            `Theme is out of bounds! Resetting...`
        );
        localStorage.setItem("fofNightMode_deviceTheme", Themes.DEFAULT);
        wasInvalid = true;
    }
}
