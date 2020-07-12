import addSettingsModal from './addSettingsModal';

app.initializers.add('fof-nightmode', (app) => {
    addSettingsModal();
});
