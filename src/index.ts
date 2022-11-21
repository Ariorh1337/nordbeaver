import * as PIXI from "pixi.js";
import { width, height, canvas, event, cheats, state } from "globals";
import { scaleMax } from "utils";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import { assets_config } from "configs/assets";

import Boot from "boot";
import Menu from "ui/menu";
import Records from "ui/records";
import Results from "ui/results";
import keyboard from "utils/keyboard";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);

//

const resize = function () {
    canvas.style.transform = `scale(${scaleMax()})`;
    event.emit("resize");
};
(window.onresize = resize)();

keyboard();

(async () => {
    const app = new PIXI.Application({
        width: width,
        height: height,
        view: canvas,
    });

    const bg = PIXI.Sprite.from(assets_config.loader_bg);
    bg.anchor.set(0);
    app.stage.addChild(bg);

    const boot = new Boot(app);
    await boot.loading();

    boot.destroy();

    const menu = new Menu(app);

    if (cheats) {
        let rec: Records;
        let results: Results;

        cheats.addInputButton("records", (value: string) => {
            if (rec) rec.destroy();
            if (results) results.destroy();

            state.points = parseInt(value);
            rec = new Records(app);
        });

        cheats.addButton("top_result", () => {
            if (rec) rec.destroy();
            if (results) results.destroy();

            results = new Results(app, true);
        });

        cheats.addButton("result", () => {
            if (rec) rec.destroy();
            if (results) results.destroy();

            results = new Results(app);
        });
    }
})();
