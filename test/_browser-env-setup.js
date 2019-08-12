import browserEnv from "browser-env";

browserEnv(["window", "document"], {
    pretendToBeVisual: true,
    url: "http://whatever.com",
    runScripts: "outside-only",
});

window.CanvasRenderingContext2D = class CanvasRenderingContext2D {
    constructor (canvas) {
        this.canvas = canvas;
    }

    clearRect () {}

    fillRect () {}

    getImageData () {}

    putImageData () {}

    save () {}

    restore () {}

    translate () {}

    rotate () {}

    scale () {}

    setTransform () {}

    measureText () {
        return {
            width: 5,
        };
    }
};

window.HTMLCanvasElement.prototype.getContext = function getContext () {
    return new window.CanvasRenderingContext2D(this);
};
