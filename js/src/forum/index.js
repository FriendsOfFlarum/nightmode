import app from "flarum/app";

import addSettingsItems from "./addSettingsItems";
import setSelectedTheme from "./setSelectedTheme";

app.initializers.add("fof-nightmode", (app) => {
    // User.prototype.canUseDarkMode = Model.attribute("canUseDarkMode");

    addSettingsItems();
    setSelectedTheme();
});
