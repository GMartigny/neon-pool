import { Circle, Color, RadialGradient } from "pencil.js";

export default class Ball extends Circle {
    constructor (position, colorDefinition) {
        const { radius } = Ball.CONSTANTS;
        super(position, radius);

        const color = new Color(colorDefinition);
        this.setOptions({
            fill: new RadialGradient([-radius / 2, -radius / 2], radius * 2, {
                0: color.clone().lightness(0.7),
                0.6: color,
                1: color.clone().lightness(0.4),
            }),
        });
    }

    static get defaultOptions () {
        return {
            ...super.defaultOptions,
            cursor: "none",
        }
    }

    static get CONSTANTS () {
        return {
            radius: 20,
            colors: [
                "#ff3442",
                "#9b3eff",
                "#3ac427",
                "#0a0c91",
            ],
        };
    }
}
