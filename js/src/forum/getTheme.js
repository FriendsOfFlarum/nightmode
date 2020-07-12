import { Themes, Constants } from '../common/config';

export default function getTheme(app) {
    const { user } = app.session;

    const IsUsingPerDeviceSettings = !!user.preferences().fofNightMode_perDevice;
    const SelectedTheme = user.preferences().fofNightMode;

    if (IsUsingPerDeviceSettings) {
        // fetch through LS is per device enabled
        return parseInt(localStorage.getItem(Constants.localStorageKey));
    } else {
        if (typeof SelectedTheme === 'number' && SelectedTheme !== -1) {
            // use user prefs
            return SelectedTheme;
        } else {
            // pref is not valid
            return Themes.DEFAULT();
        }
    }
}
