import app from 'flarum/app';
import { extend, override } from 'flarum/extend';

import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';

app.initializers.add('reflar-nightmode', app => {
  extend(SessionDropdown.prototype, 'items', function(items) {
    let lightState = app.session.user.preferences().reflarNightMode == true ? false : true;

    // Add night mode link to session dropdown
    items.add('nightmode',
      LinkButton.component({
        icon: lightState == true ? 'moon-o' : 'sun-o',
        href: 'javascript:;',
        children: lightState == true ? 'Night mode' : 'Day mode',
        onclick: function() {
          // Toggle night mode on or off by changing the user preference
          app.session.user.savePreferences({'reflarNightMode': lightState});

          location.reload();
        }
      }),
      -1
    );
  });
});
