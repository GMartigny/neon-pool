import test from "ava";
import Hole from "../src/components/hole";

test("hole", (t) => {
    t.notThrows(() => new Hole([1, 2]));

    const { radius } = Hole.CONSTANTS;
    t.is(typeof radius, "number");
});
