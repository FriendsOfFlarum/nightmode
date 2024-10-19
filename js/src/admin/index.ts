import app from 'flarum/admin/app';
import setSelectedTheme from '../common/setSelectedTheme';
import NightmodeSettingsPage from './components/NightmodeSettingsPage';

export * from './components';

app.initializers.add('fof-nightmode', () => {
  app.extensionData.for('fof-nightmode').registerPage(NightmodeSettingsPage);

  setSelectedTheme();
});
