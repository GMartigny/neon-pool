import { Navigation } from "pencil.js";

import Home from "./screens/home";
import LevelSelection from "./screens/level-selection";
import Game from "./screens/game";

import screensIds from "./screens-ids";

Navigation.prepareScenes({
    [screensIds.home]: Home,
    [screensIds.levelSelection]: LevelSelection,
    [screensIds.game]: Game,
}, document.getElementById("canvas"));
