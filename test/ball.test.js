import test from "ava";
import Ball from "../src/components/ball";

test("ball", (t) => {
    t.notThrows(() => new Ball([0, 0], "red"));

    const { radius, colors } = Ball.CONSTANTS;
    t.is(typeof radius, "number");
    t.true(Array.isArray(colors));
});
