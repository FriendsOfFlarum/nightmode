import { settings } from '@fof-components';
import Themes from '../common/Themes';

const {
    SettingsModal,
    items: { SelectItem },
} = settings;

const transPrefix = `fof-nightmode.admin.settings.modal`;

function populateThemes() {
    let options = {};

    // add themes based on JS enum
    Object.keys(Themes).forEach((theme, i) => {
        if (theme === 'DEFAULT') return;

        options[i] = app.translator.trans(`${transPrefix}.theme_${theme.toLowerCase()}`);
    });

    return options;
}

export default () => {
    app.extensionSettings['fof-nightmode'] = () =>
        app.modal.show(SettingsModal, {
            title: app.translator.trans(`${transPrefix}.title`),
            size: 'small',
            className: 'fof-nightmode',
            items: (s) => [
                <div className="Form-group">
                    <label>{app.translator.trans(`${transPrefix}.default_theme`)}</label>

                    {SelectItem.component({
                        options: populateThemes(),
                        name: 'fof-nightmode.default_theme',
                        setting: s,
                        required: false,
                        cast: (inVar) => {
                            return inVar === '' ? 0 : inVar;
                        },
                    })}
                </div>,

                <p>{app.translator.trans(`${transPrefix}.default_theme_helper`)}</p>,

                <p style="color:#f00c;font-weight:bold;">{app.translator.trans(`${transPrefix}.default_theme_important`)}</p>,
            ],
        });
};
