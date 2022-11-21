import * as PIXI from "pixi.js";
import { Observer } from "utils/observer";
import { height, width, sound } from "globals";
import Sprite from "elements/sprite";
import Container from "elements/container";
import CoinsPlate from "ui/coins_plate";
import Button from "elements/button";

export default class Menu extends Container {
    static instance: Menu;

    constructor(app: PIXI.Application) {
        if (Menu.instance) return Menu.instance;

        super(app);

        this.position.set(width / 2, height / 2);

        this.create();

        Menu.instance = this;
    }

    public override destroy() {}

    private create() {
        const x = width / 2;
        const y = height / 2;

        const top_bar = this.addChild(new PIXI.Container());
        top_bar.position.set(0, -y + 60);

        new CoinsPlate(-x, 0, top_bar);

        //

        const pause = new Button({
            x: x - 80,
            y: 15,
            parent: top_bar,
            active: "btn_pause_active",
            hover: "btn_pause_hover",
            press: "btn_pause_press",
        });

        //

        const mute = new Button({
            x: x - 225,
            y: 15,
            parent: top_bar,
            active: `btn_sound_${+!sound.mute as 0 | 1}_active`,
            hover: `btn_sound_${+!sound.mute as 0 | 1}_hover`,
            press: `btn_sound_${+!sound.mute as 0 | 1}_press`,
        });

        (mute as Observer).on_state_update = () => {
            mute.setStates({
                active: `btn_sound_${+!sound.mute as 0 | 1}_active`,
                hover: `btn_sound_${+!sound.mute as 0 | 1}_hover`,
                press: `btn_sound_${+!sound.mute as 0 | 1}_press`,
            });
        };

        mute.onClick = () => (sound.mute = !sound.mute);
        sound.add_observer(mute as Observer);

        //

        const fullscreen = new Button({
            x: x - 370,
            y: 15,
            parent: top_bar,
            active: "btn_fullscreen_active",
            hover: "btn_fullscreen_hover",
            press: "btn_fullscreen_press",
        });
    }
}
