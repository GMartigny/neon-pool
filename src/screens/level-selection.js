import { Container, Slider, Rectangle, Text, BaseEvent, MouseEvent, Scene } from "pencil.js";

import { screensIds } from "../screen-manager";
import levels from "../levels-data";

export default (scene) => {
    scene.setOptions({
        fill: "#205cb3",
    });

    const scroller = new Container([0, scene.height / 2]);
    scene.add(scroller);

    const rectOptions = {
        fill: "rgba(0, 0, 0, 0.1)",
        stroke: "#123061",
        strokeWidth: 5,
        cursor: Rectangle.cursors.pointer,
        origin: Rectangle.origins.center,
    };
    const rectSize = [300, 200];
    levels.forEach((level, index) => {
        const margin = 50;
        const position = [
            margin + ((index + 0.5) * (rectSize[0] + margin)),
            0,
        ];
        const rect = new Rectangle(position, ...rectSize, rectOptions);
        scroller.add(rect);

        const title = new Text([0, -15], level.name, {
            fontSize: 30,
            align: Text.alignments.center,
        });
        rect.add(title);

        rect
            .on(MouseEvent.events.hover, () => {
                rect.options.scale.set(1.1);
            })
            .on(MouseEvent.events.leave, () => {
                rect.options.scale.set(1);
            })
            .on(MouseEvent.events.click, () => {
                scene.fire(new BaseEvent(Scene.events.change, screensIds.game));
            });
    });

    const slider = new Slider([20, (scene.height / 2) + rectSize[1]], {
        width: scene.width - 40,
    });
    scene.add(slider);
};
