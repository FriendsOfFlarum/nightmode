import app from 'flarum/forum/app';
import addSettingsItems from './addSettingsItems';
import setSelectedTheme from '../common/setSelectedTheme';

export * from './extend';

app.initializers.add('fof-nightmode', () => {
  addSettingsItems();
  setSelectedTheme();
});
