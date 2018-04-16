'use strict';

System.register('reflar/nightmode/main', ['flarum/app', 'flarum/extend', 'flarum/components/SessionDropdown', 'flarum/components/LinkButton'], function (_export, _context) {
  "use strict";

  var app, extend, override, SessionDropdown, LinkButton;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
      override = _flarumExtend.override;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsLinkButton) {
      LinkButton = _flarumComponentsLinkButton.default;
    }],
    execute: function () {

      app.initializers.add('reflar-nightmode', function (app) {
        extend(SessionDropdown.prototype, 'items', function (items) {
          console.log(app.session.user.preferences().reflarNightMode);
          var lightState = app.session.user.preferences().reflarNightMode == true ? false : true;
          items.add('nightmode', LinkButton.component({
            icon: 'moon-o',
            href: 'javascript:;',
            children: 'Night mode',
            onclick: function onclick() {
              app.session.user.savePreferences({ 'reflarNightMode': lightState });
            }
          }), -1);
        });
      });
    }
  };
});