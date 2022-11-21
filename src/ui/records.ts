import Button from "elements/button";
import Container from "elements/container";
import Sprite from "elements/sprite";
import Text from "elements/text";
import { event, height, i18n, state, width } from "globals";
import * as PIXI from "pixi.js";
import Leaderboard from "./leaderboard";

export default class Records extends Container {
    constructor(app: PIXI.Application) {
        super(app);

        this.position.set(width / 2, height / 2);

        this.width = width;
        this.height = height;
        this.zoom = 0.85;
        this.resize();

        // to prevent click through
        this.interactive = true;

        this.create();
    }

    private create() {
        const plate = new Sprite(0, 0, "info_plate_big", this);
        const header = new Sprite(0, -410, "header_info_plate", this);

        const headStyle = { fill: "#003d71", fontSize: 55 };
        const headText = i18n("your_records");
        const head = new Text(0, -414, headStyle, headText, this);
        head.setWidthLimit(500);

        const pointsStyle = {
            align: "center",
            dropShadow: true,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
            dropShadowColor: "#003d71",
            fill: "#00fd17",
            fontSize: 70,
        } as any;
        const pointsText = i18n("record", state.points.toString());
        const points = new Text(0, -270, pointsStyle, pointsText, this);
        points.setWidthLimit(600);

        const login = new Button({
            x: 0,
            y: -50,
            parent: this,
            active: "login_button_active",
            hover: "login_button_hover",
            press: "login_button_press",
        });

        //

        this.createNameBar();

        //

        const table = new Button({
            x: -160,
            y: 300,
            parent: this,
            active: "leadboard_button_active",
            hover: "leadboard_button_hover",
            press: "leadboard_button_press",
        });

        table.onClick = () => {
            new Leaderboard(this.app);
        }

        const play = new Button({
            x: 160,
            y: 300,
            parent: this,
            active: "play_button_active",
            hover: "play_button_hover",
            press: "play_button_press",
        });
    }

    private createNameBar() {
        const name_bar = new Sprite(0, 110, "user_name_bar", this);
        name_bar.interactive = true;

        const name_style = { fill: "white", fontSize: 40 };
        const name_text = new Text(0, 110, name_style, state.player, this);
        name_text.setWidthLimit(550);

        name_bar.on("pointerup", () => event.emit("keyboard_open"));
        name_bar.on("touchstart", () => event.emit("keyboard_open"));

        const onKey = (key: string) => {
            if (!key || key === " ") return;

            if (key.toLowerCase() === "backspace") {
                name_text.setText(name_text.text.slice(0, -1));
            } else {
                name_text.setText(name_text.text + key);
            }
        };
        const onBlur = () => (state.player = name_text.text);

        event.on("keyboard_key", onKey);
        event.on("keyboard_blur", onBlur);

        this.on("destroyed", () => {
            event.off("keyboard_key", onKey);
            event.off("keyboard_blur", onBlur);
        });
    }
}
