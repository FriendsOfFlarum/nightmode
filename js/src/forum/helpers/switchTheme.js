import app from 'flarum/forum/app';
import Themes from '../../common/Themes';
import { setTheme } from '../../common/setSelectedTheme';
import getTheme from '../getTheme';
import * as perDevice from '../helpers/perDeviceSetting';

export function getIsLight(theme) {
  return theme === Themes.LIGHT || (theme === Themes.AUTO && !window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function toggleThrough(current) {
  if (current === Themes.AUTO) {
    return Themes.LIGHT;
  }

  if (current === Themes.LIGHT) {
    return Themes.DARK;
  }

  return Themes.AUTO;
}

export function switchTheme() {
  const theme = getTheme();
  const isLight = getIsLight(theme);
  const user = app.session.user;

  if (user) {
    const val = isLight ? Themes.DARK : Themes.LIGHT;

    if (!!user.preferences().fofNightMode_perDevice) {
      perDevice.set(val);
      setTheme();
      return;
    }

    user
      .savePreferences({
        fofNightMode: val,
      })
      .then(() => {
        // need to force-update selected theme (as it's only set
        // on a page load and redraw doesn't count as a page load)
        setTheme();
      });
  } else {
    const newTheme = toggleThrough(theme);

    perDevice.set(newTheme);
    setTheme();
  }
}
