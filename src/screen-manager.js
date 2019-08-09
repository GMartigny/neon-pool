import Home from "./screens/home";
import LevelSelection from "./screens/level-selection";
import Game from "./screens/game";

const screensIds = {
    home: "Home",
    levelSelection: "LevelSelection",
    game: "Game",
};

const screensBuilders = {
    Home,
    LevelSelection,
    Game,
};

export {
    screensBuilders,
    screensIds,
}
