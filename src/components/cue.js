import { Line, Position } from "pencil.js";

export default class Cue extends Line {
    constructor () {
        const end = [200, 0];
        super(undefined, [end]);
    }

    rotate (position) {
        const end = new Position(0, 200);
        end.rotate(position.clone().subtract(this.position).angle);
        this.points[0].set(end);
    }

    static get defaultOptions () {
        return {
            ...super.defaultOptions,
            strokeWidth: 10,
            stroke: "#d18c1f",
            cursor: "none",
        }
    }
}
