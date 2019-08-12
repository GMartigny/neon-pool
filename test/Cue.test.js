import test from "ava";
import Position from "@pencil.js/position";
import Cue from "../src/components/cue";

test("cue", (t) => {
    const cue = new Cue();
    cue.rotate(new Position(10, 20));

    const { length } = Cue.CONSTANTS;
    t.is(typeof length, "number");
});
