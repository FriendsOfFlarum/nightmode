'use strict';

System.register('reflar/nightmode/main', ['flarum/extend', 'flarum/components/SessionDropdown', 'flarum/components/Button', 'flarum/components/Page', 'flarum/tags/components/TagsPage', 'flarum/app'], function (_export, _context) {
  "use strict";

  var extend, override, SessionDropdown, Button, Page, TagsPage, app;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
      override = _flarumExtend.override;
    }, function (_flarumComponentsSessionDropdown) {
      SessionDropdown = _flarumComponentsSessionDropdown.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsPage) {
      Page = _flarumComponentsPage.default;
    }, function (_flarumTagsComponentsTagsPage) {
      TagsPage = _flarumTagsComponentsTagsPage.default;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }],
    execute: function () {

      app.initializers.add('reflar-nightmode', function (app) {
        extend(Page.prototype, 'init', function (vdom) {
          if (app.session.user && app.session.user.preferences().reflarNightMode) {
            $('body').addClass('dark');
          } else {
            $('body').removeClass('dark');
          }
        });

        extend(TagsPage.prototype, 'config', function (vdom) {
          if (app.session.user && app.session.user.preferences().reflarNightMode) {
            $('body').addClass('dark');
          } else {
            $('body').removeClass('dark');
          }
        });

        extend(SessionDropdown.prototype, 'items', function (items) {
          var lightState = app.session.user.preferences().reflarNightMode == true ? false : true;

          // Add night mode link to session dropdown
          items.add(app.session.user && app.session.user.preferences().reflarNightMode ? 'nightmode' : 'daymode', Button.component({
            icon: lightState == true ? 'moon-o' : 'sun-o',
            href: 'javascript:;',
            children: lightState == true ? app.translator.trans('reflar-nightmode.forum.night') : app.translator.trans('reflar-nightmode.forum.day'),
            onclick: function onclick() {
              // Toggle night mode on or off by changing the user preference
              app.session.user.savePreferences({ 'reflarNightMode': lightState });

              $('body').toggleClass('dark');
            }
          }), -1);
        });
      });
    }
  };
});