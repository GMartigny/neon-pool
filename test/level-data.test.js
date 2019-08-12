import test from "ava";
import levels from "../src/levels-data";

test("data", (t) => {
    levels.forEach((level) => {
        const { name, data } = level;
        t.is(typeof name, "string");

        t.true(Array.isArray(data.white));
        t.is(data.white.length, 2);

        t.true(Array.isArray(data.balls));
        t.true(data.balls.length > 0);

        t.true(Array.isArray(data.walls));
        t.true(data.walls.length > 0);

        t.true(Array.isArray(data.holes));
        t.true(data.holes.length > 0);
    });
});
