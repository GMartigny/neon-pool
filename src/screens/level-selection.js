import { Container, Slider, Rectangle, Text, BaseEvent, MouseEvent, Scene } from "pencil.js";

import screensIds from "../screens-ids";
import levels from "../levels-data";
import * as saveManager from "../save-manager";

const scoresArray = [];
/**
 * Update all score node to show the best
 */
const updateScores = () => {
    const scores = saveManager.get("scores") || {};

    scoresArray.forEach((score, index) => {
        if (scores[index]) {
            score.text = `Best: ${scores[index].toString()}`;
            score.show();
        }
    });
};

export default (scene) => {
    scene.setOptions({
        fill: "#205cb3",
    });

    // Wrapper around the level selection rectangles
    const scroller = new Container([0, scene.height / 2]);

    // Common rectangles options
    const rectOptions = {
        fill: "rgba(0, 0, 0, 0.1)",
        stroke: "#123061",
        strokeWidth: 5,
        cursor: Rectangle.cursors.pointer,
        origin: Rectangle.origins.center,
    };
    const rectSize = [300, 200];
    const margin = 50;
    // Build levels rectangles
    levels.forEach((level, index) => {
        const position = [
            (index + 0.5) * (rectSize[0] + margin),
            0,
        ];
        const rect = new Rectangle(position, ...rectSize, rectOptions);
        scroller.add(rect);

        // Level title node
        const title = new Text([0, -15], level.name, {
            fontSize: 30,
            align: Text.alignments.center,
        });
        rect.add(title);

        // Level score node
        const score = new Text([0, 20], "", {
            align: Text.alignments.center,
            shown: false,
        });
        rect.add(score);
        scoresArray[index] = score;

        // Events
        rect
            .on(MouseEvent.events.hover, () => {
                rect.options.scale.set(1.1);
            })
            .on(MouseEvent.events.leave, () => {
                rect.options.scale.set(1);
            })
            .on(MouseEvent.events.click, () => {
                saveManager.persist("level", index);
                scene.fire(new BaseEvent(Scene.events.change, screensIds.game));
            });
    });

    // Scrolling bar
    const slider = new Slider([20, (scene.height / 2) + rectSize[1]], {
        width: scene.width - 40,
        max: 1,
    });

    const totalWidth = (levels.length * (rectSize[0] + margin)) - scene.width;
    slider.on(Slider.events.change, () => {
        scroller.position.x = -slider.value * totalWidth;
    });

    scene
        .add(scroller, slider)
        .on(Scene.events.show, () => {
            updateScores();
        }, true);
};
