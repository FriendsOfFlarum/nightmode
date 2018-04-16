import app from 'flarum/app';
import { extend, override } from 'flarum/extend';

import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';

app.initializers.add('reflar-nightmode', app => {
  extend(SessionDropdown.prototype, 'items', function(items) {
    console.log(app.session.user.preferences().reflarNightMode);
      let lightState = app.session.user.preferences().reflarNightMode == true ? false : true;
      items.add('nightmode',
        LinkButton.component({
          icon: 'moon-o',
          href: 'javascript:;',
          children: 'Night mode',
          onclick: function() {
            app.session.user.savePreferences({'reflarNightMode': lightState});
          }
        }),
        -1
      );
    });
});
