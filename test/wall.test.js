import test from "ava";
import Wall from "../src/components/wall";

test("wall", (t) => {
    t.notThrows(() => new Wall([1, 2], [10, 20]));

    const { width, elasticity } = Wall.CONSTANTS;
    t.is(typeof width, "number");
    t.is(typeof elasticity, "number");
});
