import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SessionDropdown from 'flarum/components/SessionDropdown';
import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';
import TagsPage from 'flarum/tags/components/TagsPage';

app.initializers.add('reflar-nightmode', app => {
    extend(Page.prototype, 'init', function () {
        if (app.session.user && app.session.user.preferences().reflarNightMode) {
            $('body').addClass('dark');
        } else {
            $('body').removeClass('dark');
        }
    });

    if (TagsPage) {
        extend(TagsPage.prototype, 'config', function () {
            if (app.session.user && app.session.user.preferences().reflarNightMode) {
                $('body').addClass('dark');
            } else {
                $('body').removeClass('dark');
            }
        });
    }

    extend(SessionDropdown.prototype, 'items', function (items) {
        let lightState = app.session.user.preferences().reflarNightMode == true ? false : true;

        // Add night mode link to session dropdown
        items.add(app.session.user && app.session.user.preferences().reflarNightMode ? 'nightmode' : 'daymode',
            Button.component({
                icon: lightState == true ? 'far fa-moon' : 'far fa-sun',
                href: 'javascript:;',
                children: lightState == true ? app.translator.trans('reflar-nightmode.forum.night') : app.translator.trans('reflar-nightmode.forum.day'),
                onclick: function () {
                    // Toggle night mode on or off by changing the user preference
                    app.session.user.savePreferences({'reflarNightMode': lightState});

                    $('body').toggleClass('dark');
                }
            }),
            -1
        );
    });
});
