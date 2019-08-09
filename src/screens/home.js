import { Text, Scene, BaseEvent, MouseEvent } from "pencil.js";

import { screensIds } from "../screen-manager";

export default (scene) => {
    scene.setOptions({
        fill: "#205cb3"
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
    scene.add(title);

    title
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
