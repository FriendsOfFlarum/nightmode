import app from 'flarum/app';
import { extend, override } from 'flarum/extend';

import SessionDropdown from 'flarum/components/SessionDropdown';
import LinkButton from 'flarum/components/LinkButton';
// import Cookies from 'js-cookie';


app.initializers.add('reflar-nightmode', app => {
    extend(SessionDropdown.prototype, 'items', function(items) {
        items.add('nightmode',
        LinkButton.component({
          icon: 'moon-o',
          href: 'javascript:;',
          children: 'Night mode',
          onclick: function() {
            let lightMode  = getCookie('reflar-nightmode');

            console.log(lightMode);
            document.cookie = 'reflar-nightmode=';

            // Cookies2.set('reflar-nightmode', 1);
          }
        }),
        -1
      );
    });
});
