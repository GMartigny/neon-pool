import { RegularPolygon } from "pencil.js";

import Ball from "./components/ball";

const sceneSize = [900, 600];
const center = sceneSize.map(x => x / 2);

const wrapAround = points => [
    [points[points.length - 1], points[0]],
    ...points.slice(1).map((point, index) => [point, points[index]]),
];

export default [
    {
        name: "EZ PZ",
        data: {
            white: [sceneSize[0] / 3, center[1]],
            balls: [center],
            walls: (() => {
                const topLeft = sceneSize.map(x => x / 4);
                const bottomRight = sceneSize.map(x => x * (3 / 4));
                const points = [
                    topLeft,
                    [topLeft[0], bottomRight[1]],
                    bottomRight,
                    [bottomRight[0], topLeft[1]],
                ];
                return wrapAround(points);
            })(),
            holes: [
                [sceneSize[0] * (2 / 3), center[1]],
            ],
        },
    },
    {
        name: "Double trouble",
        data: {
            white: [sceneSize[0] / 3, center[1]],
            balls: [
                [center[0], center[1] - Ball.CONSTANTS.radius],
                [center[0], center[1] + Ball.CONSTANTS.radius],
            ],
            walls: (() => {
                const topLeft = sceneSize.map(x => x / 4);
                const bottomRight = sceneSize.map(x => x * (3 / 4));
                const points = [
                    topLeft,
                    [topLeft[0], bottomRight[1]],
                    bottomRight,
                    [bottomRight[0], topLeft[1]],
                ];
                return wrapAround(points);
            })(),
            holes: [
                [sceneSize[0] * (2 / 3), center[1] - 100],
                [sceneSize[0] * (2 / 3), center[1] + 100],
            ],
        },
    },
    {
        name: "Surrounded",
        data: {
            white: center,
            balls: (() => RegularPolygon.getRotatingPoints(5, 100).map(point => point.add(center)))(),
            walls: (() => wrapAround(RegularPolygon.getRotatingPoints(5, 300).map(point => point.add(center))))(),
            holes: (() => RegularPolygon.getRotatingPoints(5, 240).map(point => point.add(center)))(),
        },
    },
];
