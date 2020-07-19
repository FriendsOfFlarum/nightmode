import Themes from '../common/Themes';
import { get } from './helpers/perDeviceSetting';

export default function getTheme() {
    const { user } = app.session;

    const IsUsingPerDeviceSettings = !!user.preferences().fofNightMode_perDevice;
    const SelectedTheme = user.preferences().fofNightMode;

    if (IsUsingPerDeviceSettings) {
        // fetch through LS is per device enabled
        return get();
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
