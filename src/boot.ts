import * as PIXI from "pixi.js";
import { height, width } from "globals";
import gsap from "gsap";

import { assets_config, assets_keys } from "configs/assets";
import Container from "elements/container";

export default class Boot extends Container {
    constructor(app: PIXI.Application) {
        super(app);

        this.position.set(width / 2, height / 2);

        this.create();
    }

    /**
     * Loads a list of assets from the config
     * Returns a promise that will be fulfilled after all assets are loaded
     * Calls the "loading" event which returns the progress from 0 to 1
     */
    public loading() {
        const assets = [] as Promise<unknown>[];
        let progress = 0;

        this.event.emit("loading", progress);

        for (const key in assets_config) {
            PIXI.Assets.add(key, assets_config[key as assets_keys]);
            const promise = PIXI.Assets.load(key);

            assets.push(promise);
            promise.then(() => {
                progress++;
                this.event.emit("loading", progress / assets.length);
            });
        }

        return Promise.allSettled(assets);
    }

    private create() {
        const bunny = PIXI.Sprite.from(assets_config.loader_bunny);
        bunny.anchor.set(0.5);
        bunny.scale.set(0.5);

        const tween = gsap.fromTo(
            bunny,
            { angle: 0 },
            { angle: 360, duration: 0.72, repeat: -1 }
        );
        this.on("destroyed", () => tween.kill());

        this.addChild(bunny);
    }
}
