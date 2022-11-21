import { assets_keys } from "configs/assets";
import * as PIXI from "pixi.js";

export default class Sprite extends PIXI.Sprite {
    constructor(x: number, y: number, texture: PIXI.Texture | assets_keys, parent?: PIXI.Container) {
        super();

        this.position.set(x, y);
        this.texture = this.defineTexture(texture);
        if (parent) parent.addChild(this);

        this.anchor.set(0.5);
    }

    private defineTexture(texture: PIXI.Texture | assets_keys): PIXI.Texture {
        if (typeof texture !== "string") return texture;

        return PIXI.Assets.get(texture) as PIXI.Texture;
    }
}
