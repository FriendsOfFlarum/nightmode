import addSettingsModal from './addSettingsModal';
import setSelectedTheme from '../common/setSelectedTheme';

app.initializers.add('fof-nightmode', () => {
    addSettingsModal();
    setSelectedTheme();
});
