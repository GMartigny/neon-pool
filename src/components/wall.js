import { Line, Position } from "pencil.js";

export default class Wall extends Line {
    constructor (from, to) {
        const target = Position.from(to).clone().subtract(from);
        super(from, [target]);
        this.from = from;
        this.to = to;
    }

    static get defaultOptions () {
        return {
            ...super.defaultOptions,
            strokeWidth: this.CONSTANTS.width,
            stroke: "#222",
            cursor: "none",
        };
    }

    static get CONSTANTS () {
        return {
            width: 30,
            elasticity: 0.5,
        };
    }
}
