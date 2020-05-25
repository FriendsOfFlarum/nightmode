import { extend } from "flarum/extend";

import SettingsPage from "flarum/components/SettingsPage";

import LoadingIndicator from "flarum/components/LoadingIndicator";
import Select from "flarum/components/Select";
import FieldSet from "flarum/components/FieldSet";
import Switch from "flarum/components/Switch";

import { SetTheme } from "./setSelectedTheme";
import fixInvalidThemeSetting from "./fixInvalidThemeSetting";
import GetTheme from "./getTheme";
import Themes from "./Themes";

export default function () {
    extend(SettingsPage.prototype, "settingsItems", function (items) {
        const { user } = app.session;

        // const CanChangeTheme = user.canUseDarkMode();

        // if (!CanChangeTheme) return;

        const PerDevice = user.preferences().fofNightMode_perDevice
            ? user.preferences().fofNightMode_perDevice
            : false;

        if (PerDevice) {
            fixInvalidThemeSetting();
        }

        const CurrentTheme = GetTheme(user);

        items.add(
            "fof-nightmode",
            FieldSet.component({
                label: app.translator.trans(
                    "fof-nightmode.forum.user.settings.heading"
                ),
                className: "Settings-theme",
                children: [
                    <p className="description">
                        {app.translator.trans(
                            "fof-nightmode.forum.user.settings.description"
                        )}
                    </p>,
                    <p className="description">
                        {app.translator.trans(
                            "fof-nightmode.forum.user.settings.description2"
                        )}
                    </p>,
                    Switch.component({
                        children: app.translator.trans(
                            "fof-nightmode.forum.user.settings.device_specific_setting_checkbox"
                        ),
                        className: "Settings-theme--per_device_cb",
                        state: PerDevice,
                        onchange: (checked) => {
                            user.savePreferences({
                                fofNightMode_perDevice: checked,
                            }).then(() => {
                                if (checked) {
                                    // save current theme as this device's default
                                    localStorage.setItem(
                                        "fofNightMode_deviceTheme",
                                        CurrentTheme
                                    );

                                    m.redraw();

                                    // need to force-update selected theme (as it's only set
                                    // on a page load and redraw doesn't count as a apge load)
                                    SetTheme();
                                } else {
                                    // set user theme to that of current device
                                    user.savePreferences({
                                        fofNightMode: CurrentTheme,
                                    }).then(() => {
                                        m.redraw();

                                        // need to force-update selected theme (as it's only set
                                        // on a page load and redraw doesn't count as a apge load)
                                        SetTheme();
                                    });
                                }
                            });
                        },
                    }),
                    Select.component({
                        value: CurrentTheme ? CurrentTheme : Themes.DEFAULT,
                        label: "test",
                        key: "selected_theme",
                        className: "Settings-theme--input",
                        onchange: (e) => {
                            if (PerDevice) {
                                localStorage.setItem(
                                    "fofNightMode_deviceTheme",
                                    e
                                );
                                m.redraw();
                                SetTheme();
                                return;
                            }

                            user.savePreferences({
                                fofNightMode_themeType: e,
                            }).then(() => {
                                m.redraw();

                                // need to force-update selected theme (as it's only set
                                // on a page load and redraw doesn't count as a apge load)
                                SetTheme();
                            });
                        },
                        options: [
                            app.translator.trans(
                                "fof-nightmode.forum.user.settings.options.auto"
                            ),
                            app.translator.trans(
                                "fof-nightmode.forum.user.settings.options.day"
                            ),
                            app.translator.trans(
                                "fof-nightmode.forum.user.settings.options.night"
                            ),
                        ],
                    }),
                    <p className="Settings-theme--selection_description">
                        {CurrentTheme === Themes.AUTO
                            ? app.translator.trans(
                                  "fof-nightmode.forum.user.settings.option_descriptions.auto"
                              )
                            : CurrentTheme === Themes.LIGHT
                            ? app.translator.trans(
                                  "fof-nightmode.forum.user.settings.option_descriptions.day"
                              )
                            : CurrentTheme === Themes.DARK
                            ? app.translator.trans(
                                  "fof-nightmode.forum.user.settings.option_descriptions.night"
                              )
                            : // prevents nasty paragraph switching
                              LoadingIndicator.component()}
                    </p>,
                ],
            })
        );
    });
}
