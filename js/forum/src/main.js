import app from 'flarum/app';
import { extend, override } from 'flarum/extend';

import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';

app.initializers.add('reflar-nightmode', app => {
    extend(SessionDropdown.prototype, 'items', function(items) {
        items.add('nightmode',
        LinkButton.component({
          icon: 'moon-o',
          children: 'Night mode',
          onclick: function() {

          }
        }),
        -1
      );
    });
});
