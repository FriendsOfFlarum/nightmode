import { settings } from "@fof-components";
import Themes from "../common/config";

const {
    SettingsModal,
    items: { SelectItem },
} = settings;

const transPrefix = `fof-nightmode.admin.settings.modal`;

function populateThemes() {
    let options = {};

    // add themes based on JS enum
    Object.keys(Themes).forEach((theme, i) => {
        if (theme === "DEFAULT") return;

        options[i] = app.translator.trans(
            `${transPrefix}.theme_${theme.toLowerCase()}`
        );
    });

    return options;
}

export default () => {
    app.extensionSettings["fof-nightmode"] = () =>
        app.modal.show(
            new SettingsModal({
                title: app.translator.trans(`${transPrefix}.title`),
                size: "small",
                className: "fof-nightmode",
                items: [
                    <div className="Form-group">
                        <label>
                            {app.translator.trans(
                                `${transPrefix}.default_theme`
                            )}
                        </label>

                        {SelectItem.component({
                            options: populateThemes(),
                            key: "fof-nightmode.default_theme",
                            required: false,
                            cast: (inVar) => {
                                return inVar === "" ? 0 : inVar;
                            },
                        })}
                    </div>,

                    <p>
                        {app.translator.trans(
                            `${transPrefix}.default_theme_helper`
                        )}
                    </p>,

                    <p style="color:#f00c;font-weight:bold;">
                        {app.translator.trans(
                            `${transPrefix}.default_theme_important`
                        )}
                    </p>,
                ],
            })
        );
};
