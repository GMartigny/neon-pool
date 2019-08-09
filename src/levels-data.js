
const sceneSize = [900, 600];
const center = sceneSize.map(x => x / 2);

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
                return [
                    points.slice(0, 2),
                    points.slice(1, 3),
                    points.slice(2, 4),
                    [points[3], points[0]],
                ];
            })(),
            holes: [
                [sceneSize[0] * (2 / 3), center[1]],
            ],
        }
    }
];
