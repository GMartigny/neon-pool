import { Text, Scene, BaseEvent, MouseEvent } from "pencil.js";

import screensIds from "../screens-ids";

export default (scene) => {
    scene.setOptions({
        fill: "#205cb3",
    });

    const title = new Text(scene.center.subtract(0, 40), "Neon Pool", {
        fill: "#fff",
        fontSize: 80,
        align: Text.alignments.center,
        shadow: {
            color: "#fff",
            blur: 10,
        },
        cursor: Text.cursors.pointer,
    });

    const betaWarning = new Text([title.width / 2, 40], "Alpha", {
        fill: "#ffd212",
        fontSize: title.options.fontSize / 2,
        rotation: -0.05,
        align: Text.alignments.center,
        underscore: true,
    });

    title.add(betaWarning);

    scene.add(title);

    title
        .on(Text.events.draw, () => {
            betaWarning.options.scale.set((Math.sin(betaWarning.frameCount / 40) / 5) + 1);
        }, true)
        .on(MouseEvent.events.hover, () => {
            title.options.shadow.blur = 20;
        })
        .on(MouseEvent.events.leave, () => {
            title.options.shadow.blur = 10;
        })
        .on(MouseEvent.events.click, () => {
            scene.fire(new BaseEvent(Scene.events.change, screensIds.levelSelection));
        });
};
