import { Circle } from "pencil.js";

export default class Hole extends Circle {
    constructor (position) {
        super(position, Hole.CONSTANTS.radius);
    }

    static get defaultOptions () {
        return {
            ...super.defaultOptions,
            fill: "#111",
            zIndex: 0,
            cursor: "none",
        };
    }

    static get CONSTANTS () {
        return {
            radius: 30,
        };
    }
}
