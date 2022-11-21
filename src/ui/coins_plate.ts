import Sprite from "elements/sprite";
import Text from "elements/text";
import { cheats, event, state } from "globals";
import * as PIXI from "pixi.js";
import { Observer } from "utils/observer";

export default class CoinsPlate extends PIXI.Container implements Observer {
    constructor(x: number, y: number, parent: PIXI.Container) {
        super();

        this.position.set(x, y);
        parent.addChild(this);

        this.create();
    }

    public on_state_update() {
        event.emit("set_coin", state.coins.toString());
    }

    private create() {
        const plate = new Sprite(180, 0, "coin_score_plate", this);
        const coin = new Sprite(70, 0, "collect_coin_icon", this);

        const textStyle = { fill: "white", fontSize: 40 };
        const text = new Text(185, 2, textStyle, "0", this);

        text.setWidthLimit(110);

        event.on("set_coin", (value: string) => {
            text.setText(value);
        });

        if (cheats) {
            cheats.addInputButton("coins", (value: string) => {
                state.coins = +value;
                event.emit("set_coin", value);
            });
        }
    }
}
