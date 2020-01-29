import {extend} from 'flarum/extend';
import app from 'flarum/app';
import SessionDropdown from 'flarum/components/SessionDropdown';
import Button from 'flarum/components/Button';
import Page from 'flarum/components/Page';
import TagsPage from 'flarum/tags/components/TagsPage';

app.initializers.add('fof-nightmode', app => {
    extend(Page.prototype, 'init', function () {
        if (app.session.user && app.session.user.preferences().fofNightMode) {
            $('body').addClass('dark');
        } else if (!app.session.user && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            $('body').addClass('dark');
        } else {
            $('body').removeClass('dark');
        }
    });

    if (TagsPage) {
        extend(TagsPage.prototype, 'config', function () {
            if (app.session.user && app.session.user.preferences().fofNightMode) {
                $('body').addClass('dark');
            } else if (!app.session.user && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                $('body').addClass('dark');
            } else {
                $('body').removeClass('dark');
            }
        });
    }

    extend(SessionDropdown.prototype, 'items', function (items) {
        let lightState = app.session.user.preferences().fofNightMode == true ? false : true;

        // Add night mode link to session dropdown
        items.add(app.session.user && app.session.user.preferences().fofNightMode ? 'nightmode' : 'daymode',
            Button.component({
                icon: lightState == true ? 'far fa-moon' : 'far fa-sun',
                href: 'javascript:;',
                children: lightState == true ? app.translator.trans('fof-nightmode.forum.night') : app.translator.trans('fof-nightmode.forum.day'),
                onclick: function () {
                    // Toggle night mode on or off by changing the user preference
                    app.session.user.savePreferences({'fofNightMode': lightState});

                    $('body').toggleClass('dark');
                }
            }),
            -1
        );
    });
});
