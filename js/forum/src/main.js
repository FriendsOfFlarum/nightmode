import { extend, override } from 'flarum/extend';

import SessionDropdown from 'flarum/components/SessionDropdown';
import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';

app.initializers.add('reflar-nightmode', app => {
  extend(Page.prototype, 'config', function (vdom) {
    if (app.session.user && app.session.user.preferences().reflarNightMode) {
      $('body').addClass('dark');
    } else {
      $('body').removeClass('dark');
    }
  });

  extend(SessionDropdown.prototype, 'items', function(items) {
    let lightState = app.session.user.preferences().reflarNightMode == true ? false : true;

    // Add night mode link to session dropdown
    items.add(app.session.user && app.session.user.preferences().reflarNightMode ? 'nightmode' : 'daymode',
      Button.component({
        icon: lightState == true ? 'moon-o' : 'sun-o',
        href: 'javascript:;',
        children: lightState == true ? app.translator.trans('reflar-nightmode.forum.night') : app.translator.trans('reflar-nightmode.forum.day'),
        onclick: function() {
          // Toggle night mode on or off by changing the user preference
          app.session.user.savePreferences({'reflarNightMode': lightState});

          if (app.session.user && app.session.user.preferences().reflarNightMode) {
            $('body').addClass('dark');
          } else {
            $('body').removeClass('dark');
          }
        }
      }),
      -1
    );
  });
});
