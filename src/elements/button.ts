import { assets_keys } from "configs/assets";
import * as PIXI from "pixi.js";
import Sprite from "./sprite";

interface ButtonStates {
    active: assets_keys;
    hover: assets_keys;
    press: assets_keys;
};

interface ButtonConfig {
    x: number;
    y: number;

    active: assets_keys;
    hover: assets_keys;
    press: assets_keys;

    parent: PIXI.Container;
};

export default class Button extends PIXI.Container {
    private sprite!: Sprite;
    private state: "active" | "hover" | "press" = "active";
    private states: ButtonStates;

    constructor(config: ButtonConfig) {
        super();

        this.states = {
            active: config.active,
            hover: config.hover,
            press: config.press,
        };

        this.position.set(config.x, config.y);
        config.parent.addChild(this);

        this.create();
    }

    public onClick = () => {};

    public setStates(states: ButtonStates) {
        this.states = states;
        this.updateState();
    }

    public updateState(state?: "active" | "hover" | "press") {
        if (!state) state = this.state;

        const texture = this.states[state];
        this.sprite.texture = PIXI.Assets.get(texture) as PIXI.Texture;
    }

    private create() {
        this.sprite = new Sprite(0, 0, this.states.active, this);
        this.sprite.interactive = true;

        this.sprite.on("pointerover", () => this.onHover());
        this.sprite.on("pointerout", () => this.onHoverOut());
        this.sprite.on("pointerdown", () => this.onPress());
        this.sprite.on("pointerup", () => this.onPressOut());
        this.sprite.on("pointerupoutside", () => this.onPressOut());

        this.sprite.on("touchstart", () => this.onPress());
        this.sprite.on("touchend", () => this.onPressOut());
    }

    private onHover() {
        this.updateState("hover");

        document.body.style.cursor = "pointer";
    }

    private onHoverOut() {
        this.updateState("active");

        document.body.style.cursor = "auto";
    }

    private onPress() {
        this.updateState("press");
    }

    private onPressOut() {
        this.updateState("active");

        this.onClick();
    }
}