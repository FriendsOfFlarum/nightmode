'use strict';

System.register('reflar/nightmode/main', ['flarum/extend', 'flarum/components/SessionDropdown', 'flarum/components/LinkButton', 'flarum/components/Page'], function (_export, _context) {
  "use strict";

  var extend, override, SessionDropdown, LinkButton, Page;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
      override = _flarumExtend.override;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }, function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }],
    execute: function () {

      app.initializers.add('reflar-nightmode', function (app) {
        extend(Page.prototype, 'config', function (vdom) {
          if (app.session.user && app.session.user.preferences().reflarNightMode) {
            $('body').addClass('dark');
          } else {
            $('body').removeClass('dark');
          }
        });

        extend(SessionDropdown.prototype, 'items', function (items) {
          var lightState = app.session.user.preferences().reflarNightMode == true ? false : true;

          // Add night mode link to session dropdown
          items.add(app.session.user && app.session.user.preferences().reflarNightMode ? 'nightmode' : 'daymode', LinkButton.component({
            icon: lightState == true ? 'moon-o' : 'sun-o',
            href: 'javascript:;',
            children: lightState == true ? app.translator.trans('reflar-nightmode.forum.night') : app.translator.trans('reflar-nightmode.forum.day'),
            onclick: function onclick() {
              // Toggle night mode on or off by changing the user preference
              app.session.user.savePreferences({ 'reflarNightMode': lightState });

              if (app.session.user && app.session.user.preferences().reflarNightMode) {
                $('body').addClass('dark');
              } else {
                $('body').removeClass('dark');
              }
            }
          }), -1);
        });
      });
    }
  };
});