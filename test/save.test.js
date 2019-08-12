import test from "ava";
import * as saveManager from "../src/save-manager";

test("save", (t) => {
    const key = "key";
    t.is(saveManager.get(key), null);

    const obj = {
        key: "value",
    };
    saveManager.persist(key, obj);
    t.false(saveManager.get(key) === obj);
    t.deepEqual(saveManager.get(key), obj);

    saveManager.clear(key);
    t.is(saveManager.get(key), null);
});
