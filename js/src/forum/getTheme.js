import { Themes, Constants } from '../common/config';

export default function GetTheme(user) {
    const PerDevice = user.preferences().fofNightMode_perDevice ? user.preferences().fofNightMode_perDevice : false;

    if (PerDevice) {
        // fetch through LS is per device enabled
        return parseInt(localStorage.getItem(Constants.localStorageKey));
    } else {
        if (typeof user.preferences().fofNightMode_themeType === 'number') {
            // use user prefs
            return user.preferences().fofNightMode_themeType;
        } else {
            if (user.preferences().fofNightMode) {
                // migrate previous preferences

                const preMigration = user.preferences().fofNightMode;
                let migrated = Themes.LIGHT;

                if (preMigration === true) {
                    // user selected dark before migration
                    migrated = Themes.DARK;
                }

                user.savePreferences({
                    fofNightMode: null,
                    fofNightMode_themeType: migrated,
                });

                // assume the prefs will be saved correctly and just return what the value should have been
                return migrated;
            } else {
                // user never set a pref

                user.savePreferences({
                    fofNightMode: null,
                    fofNightMode_themeType: Themes.AUTO,
                });

                // assume the prefs will be saved correctly and just return default
                return Themes.DEFAULT(app);
            }
        }
    }
}
