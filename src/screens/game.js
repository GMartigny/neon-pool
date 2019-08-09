import { Scene, BaseEvent, MouseEvent, Vector, Position, Container, Text, Button } from "pencil.js";
import levels from "../levels-data";
import Ball from "../components/ball";
import Wall from "../components/wall";
import Cue from "../components/cue";
import Hole from "../components/hole";
import verlet from "../verlet";
import { screensIds } from "../screen-manager";
import * as saveManager from "../save-manager";

export default (scene) => {
    scene.setOptions({
        fill: "#205cb3",
        cursor: "none",
    });

    // Wrapper being cleared out each level change
    const wrapper = new Container();

    // Score node
    const scores = saveManager.get("scores") || {};

    // Main ball
    const whiteBall = new Ball(scene.center, "#f0f0f0");

    const balls = [];
    const walls = [];
    const holes = [];
    /**
     * Compute the addition of forces to a ball
     * @param {Ball} ball - Current computed ball
     * @return {Position} Sum of forces
     */
    const getForces = (ball) => {
        const forces = new Position();

        walls.forEach((wall) => {
            const absolute = [
                wall.position.clone(),
                wall.to,
            ];
            const absoluteVector = new Vector(...absolute);
            const closest = absoluteVector.getClosestToPoint(ball.position);
            const distance = ball.position.distance(closest);
            const field = ball.radius + (Wall.CONSTANTS.width / 2);
            if (distance < field) {
                const pushBack = ball.position.clone()
                    .subtract(closest)
                    .divide(distance)
                    .multiply(distance - field)
                    .multiply(-Wall.CONSTANTS.elasticity);
                forces.add(pushBack);
            }
        });

        balls.forEach((other) => {
            if (ball !== other && !other.falling) {
                const distance = ball.position.distance(other.position);
                const field = ball.radius + other.radius;
                if (distance < field) {
                    const pushBack = ball.position.clone()
                        .subtract(other.position)
                        .divide(distance)
                        .multiply(distance - field)
                        .multiply(-0.4);
                    forces.add(pushBack);
                }
            }
        });

        return forces;
    };

    // Cue stick
    const cueStick = new Cue();

    // Hits count
    const margin = 10;
    const hitsCounter = new Text([scene.width - margin, margin], "", {
        align: Text.alignments.right,
    });
    let hits = 0;
    /**
     * Update the hits count and hits node
     * @param {Number} n -
     */
    const setHitCounter = (n) => {
        hits = n;
        hitsCounter.text = hits.toString();
    };

    // Back button
    const backButton = new Button([margin, margin], {
        value: "🔙",
    });
    backButton.on(MouseEvent.events.click, () => {
        scene.fire(new BaseEvent(Scene.events.change, screensIds.levelSelection));
    });

    scene.add(wrapper, cueStick, hitsCounter, backButton);

    let currentLevel = null;
    /**
     * Place the white back to its initial position
     */
    const resetWhite = () => {
        whiteBall.position.set(levels[currentLevel].data.white);
        if (whiteBall.previousPosition) {
            whiteBall.previousPosition.set(whiteBall.position);
        }
        whiteBall.falling = false;
        whiteBall.options.scale.set(1);
    };

    /**
     * Define the level number and load every items
     * @param {Number} number -
     */
    const setLevel = (number) => {
        if (levels[number]) {
            currentLevel = number;
            const { data } = levels[number];

            wrapper.empty();

            resetWhite();

            // Set the balls
            balls.splice(0, balls.length, whiteBall);
            const { colors } = Ball.CONSTANTS;
            data.balls.forEach((position, index) => {
                const ball = new Ball(position, colors[index]);
                balls.push(ball);
            });

            // Set the walls
            walls.splice(0, walls.length);
            data.walls.forEach((positions) => {
                const wall = new Wall(...positions);
                walls.push(wall);
            });

            // Set the holes
            holes.splice(0, holes.length);
            data.holes.forEach((position) => {
                const hole = new Hole(position);
                holes.push(hole);
            });

            wrapper.add(...holes, ...walls, ...balls);

            setHitCounter(0);
        }
    };

    /**
     * Win a match
     */
    const win = () => {
        scores[currentLevel] = Math.min(scores[currentLevel] || Infinity, hits);
        saveManager.persist("scores", scores);

        setLevel(currentLevel + 1);
    };

    scene
        .on(Scene.events.show, () => {
            setLevel(saveManager.get("level") || 0);
        }, true)
        .on(Scene.events.draw, () => {
            balls.forEach((ball, index) => {
                if (ball.falling) {
                    const ratio = 0.05;
                    ball.position.lerp(ball.falling.position, ratio);
                    ball.options.scale.lerp(undefined, ratio);

                    if (ball.options.scale.distance() < 0.1) {
                        if (ball === whiteBall) {
                            resetWhite();
                            setHitCounter(++hits);
                        }
                        else {
                            balls.splice(index, 1);
                            ball.delete();
                            if (balls.length === 1) {
                                win();
                            }
                        }
                    }
                }
                else {
                    verlet(ball, getForces);
                }

                holes.forEach((hole) => {
                    if (hole.position.distance(ball.position) < hole.radius) {
                        ball.falling = hole;
                    }
                });
            });

            if (cueStick.animated) {
                const ratio = Math.max(((scene.frameCount - cueStick.animated) / 30) ** 1.5, 0.02);
                cueStick.position.lerp(whiteBall.position, ratio);

                if (cueStick.position.distance(whiteBall.position) < whiteBall.radius) {
                    const nudge = cueStick.hitFrom.clone()
                        .subtract(whiteBall.position)
                        .divide(10);
                    whiteBall.previousPosition.add(nudge);
                    cueStick.animated = false;
                }
            }
            else {
                cueStick.position.lerp(scene.cursorPosition, 0.2);
            }
            cueStick.rotate(whiteBall.position);
        }, true)
        .on(MouseEvent.events.down, ({ position, target }) => {
            if (!cueStick.animated && !backButton.isAncestorOf(target)) {
                cueStick.animated = scene.frameCount;
                cueStick.hitFrom = position;
                setHitCounter(++hits);
            }
        });
};
