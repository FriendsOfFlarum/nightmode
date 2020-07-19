import { extend } from 'flarum/extend';

import SettingsPage from 'flarum/components/SettingsPage';

import LoadingIndicator from 'flarum/components/LoadingIndicator';
import Select from 'flarum/components/Select';
import FieldSet from 'flarum/components/FieldSet';
import Switch from 'flarum/components/Switch';

import { setTheme } from '../common/setSelectedTheme';
import fixInvalidThemeSetting from './fixInvalidThemeSetting';
import * as perDevice from './helpers/perDeviceSetting';
import getTheme from './getTheme';
import Themes from '../common/Themes';

// custom function for translations makes it a lot cleaner
const trans = (key) => app.translator.trans(`fof-nightmode.forum.user.settings.${key}`);

export default function () {
    extend(SettingsPage.prototype, 'settingsItems', function (items) {
        const { user } = app.session;

        const PerDevice = !!user.preferences().fofNightMode_perDevice;

        if (PerDevice) {
            fixInvalidThemeSetting();
        }

        let currentTheme = getTheme();

        if (typeof currentTheme !== 'number' && !currentTheme) {
            currentTheme = Themes.DEFAULT();
        }

        items.add(
            'fof-nightmode',
            FieldSet.component({
                label: trans('heading'),
                className: 'Settings-theme',
                children: [
                    <p className="description">{trans('description')}</p>,
                    <p className="description">{trans('description2')}</p>,
                    Switch.component({
                        children: trans('device_specific_setting_checkbox'),
                        className: 'Settings-theme--per_device_cb',
                        state: PerDevice,
                        onchange: (checked) => {
                            if (checked) {
                                // save current theme as this device's default
                                perDevice.set(currentTheme);
                            } else {
                                perDevice.remove();
                            }

                            user.savePreferences({
                                fofNightMode_perDevice: checked,
                            }).then(() => {
                                // need to force-update selected theme (as it's only set
                                // on a page load and redraw doesn't count as a page load)
                                setTheme();
                            });
                        },
                    }),
                    Select.component({
                        value: currentTheme,
                        key: 'selected_theme',
                        className: 'Settings-theme--input',
                        onchange: (e) => {
                            if (PerDevice) {
                                perDevice.set(e);

                                setTheme();
                                return;
                            }

                            user.savePreferences({
                                fofNightMode: Number.parseInt(e),
                            }).then(() => {
                                m.redraw();

                                // need to force-update selected theme (as it's only set
                                // on a page load and redraw doesn't count as a apge load)
                                setTheme();
                            });
                        },
                        options: [trans('options.auto'), trans('options.day'), trans('options.night')],
                    }),
                    <p className="Settings-theme--selection_description">
                        {currentTheme === Themes.AUTO
                            ? trans('option_descriptions.auto')
                            : currentTheme === Themes.LIGHT
                            ? trans('option_descriptions.day')
                            : currentTheme === Themes.DARK
                            ? trans('option_descriptions.night')
                            : // prevents nasty paragraph switching
                              LoadingIndicator.component()}
                    </p>,
                ],
            })
        );
    });
}
