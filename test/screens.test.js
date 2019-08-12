import test from "ava";

import game from "../src/screens/game";
import home from "../src/screens/home";
import levelSelection from "../src/screens/level-selection";
import screensIds from "../src/screens-ids";

test("screens", (t) => {
    const screens = [
        home,
        game,
        levelSelection,
    ];

    screens.forEach(builder => t.is(typeof builder, "function"));

    t.true(Object.keys(screensIds).every(key => typeof key === "string"));
});
