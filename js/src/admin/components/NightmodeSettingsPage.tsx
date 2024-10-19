import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import ItemList from 'flarum/common/utils/ItemList';
import Themes from '../../common/Themes';
import extractText from 'flarum/common/utils/extractText';
import type Mithril from 'mithril';

export default class NightmodeSettingsPage extends ExtensionPage {
  content() {
    return (
      <div className="NightmodeSettingsPage">
        <div className="container">
          <div className="NightmodeSettingsTabPage NightmodeSettingsPage--settings">
            <div className="Form">
              {this.settingsItems().toArray()}
              <div className="Form-group">{this.submitButton()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  settingsItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'general',
      <div className="Section">
        <h3>{app.translator.trans('fof-nightmode.admin.settings.general.heading')}</h3>
        <p className="helpText">{app.translator.trans('fof-nightmode.admin.settings.general.help')}</p>
        {this.generalItems().toArray()}
      </div>
    );

    return items;
  }

  generalItems(): ItemList<Mithril.Children> {
    const items = new ItemList<Mithril.Children>();

    items.add(
      'header-toggle',
      this.buildSettingComponent({
        label: app.translator.trans('fof-nightmode.admin.settings.modal.always_show_theme_toggle_on_header'),
        setting: 'fofNightMode.show_theme_toggle_on_header_always',
        type: 'switch',
      })
    );

    items.add(
      'icon-style',
      this.buildSettingComponent({
        label: app.translator.trans('fof-nightmode.admin.settings.modal.show_theme_toggle_in_solid'),
        setting: 'fofNightMode.show_theme_toggle_in_solid',
        type: 'switch',
      })
    );

    items.add(
      'default-theme',
      this.buildSettingComponent({
        label: app.translator.trans('fof-nightmode.admin.settings.modal.default_theme'),
        help: app.translator.trans('fof-nightmode.admin.settings.modal.default_theme_helper'),
        setting: 'fof-nightmode.default_theme',
        type: 'select',
        options: this.populateThemes(),
      })
    );

    return items;
  }

  populateThemes(): Record<number, string> {
    let options: Record<number, string> = {};

    // add themes based on JS enum
    Object.keys(Themes).forEach((theme, i) => {
      if (theme === 'DEFAULT') return;

      options[i] = extractText(app.translator.trans(`fof-nightmode.admin.settings.modal.theme_${theme.toLowerCase()}`));
    });

    return options;
  }
}
