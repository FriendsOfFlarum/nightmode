import app from 'flarum/forum/app';
import addSettingsItems from './addSettingsItems';
import setSelectedTheme from '../common/setSelectedTheme';

export * as perDeviceSetting from './helpers/perDeviceSetting';
export * as switchTheme from './helpers/switchTheme';
export { default as getTheme } from './getTheme';

app.initializers.add('fof-nightmode', () => {
  addSettingsItems();
  setSelectedTheme();
});
