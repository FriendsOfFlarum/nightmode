import { get, set, remove } from './helpers/perDeviceSetting';
import { getIsLight, switchTheme } from './helpers/switchTheme';
import { setTheme, getUrls, setThemeFromID, setStyle } from '../common/setSelectedTheme';
import getTheme from './getTheme';
import Themes from '../common/Themes';

export const forum = {
  'fof/nightmode/helpers/perDeviceSetting': { get, set, remove },
  'fof/nightmode/helpers/switchTheme': { getIsLight, switchTheme },
  'fof/nightmode/common/setSelectedTheme': { setTheme, getUrls, setThemeFromID, setStyle },
  'fof/nightmode/common/Themes': Themes,
  'fof/nightmode/getTheme': getTheme,
};
