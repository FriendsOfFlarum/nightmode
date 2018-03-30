var gulp = require('flarum-gulp');

gulp({
    modules: {
        'reflar/nightmode': [
            '../lib/**/*.js',
            'src/**/*.js'
        ]
    }
});
