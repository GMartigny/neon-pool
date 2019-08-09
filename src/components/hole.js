import { Circle } from "pencil.js";

const radius = 30;

export default class Hole extends Circle {
    constructor (position) {
        super(position, radius);
    }

    static get defaultOptions () {
        return {
            ...super.defaultOptions,
            fill: "#111",
            zIndex: 0,
        };
    }
}
