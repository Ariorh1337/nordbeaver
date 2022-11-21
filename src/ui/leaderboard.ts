import { month, week, all_time } from "configs/leaderboard";
import Button from "elements/button";
import Container from "elements/container";
import Sprite from "elements/sprite";
import Text from "elements/text";
import { height, i18n, state, width } from "globals";
import * as PIXI from "pixi.js";

export default class Leaderboard extends Container {
    private state: "week" | "month" | "all_time" = "all_time";
    private states = { week, month, all_time };
    private title!: Text;
    private lines!: Text[];

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
        const headText = i18n("table_records");
        const head = new Text(0, -414, headStyle, headText, this);
        head.setWidthLimit(500);

        //

        this.createNavigation();
        
        this.createList();

        //

        const exit = new Button({
            x: 0,
            y: 365,
            parent: this,
            active: "ok_button_active",
            hover: "ok_button_hover",
            press: "ok_button_press",
        });

        exit.onClick = () => this.destroy();
    }

    private createNavigation() {
        const leftBtn = new Button({
            x: -275,
            y: -305,
            parent: this,
            active: "arrow_btn_active",
            hover: "arrow_btn_hover",
            press: "arrow_btn_press",
        });

        leftBtn.scale.x = -1;
        leftBtn.onClick = this.changeList.bind(this, -1);

        //

        const titleStyle = {
            align: "center",
            dropShadow: true,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
            dropShadowColor: "#003d71",
            fill: "#ff6801",
            fontSize: 70,
        } as any;
        const titleText = i18n(this.state);
        const title = new Text(0, -310, titleStyle, titleText, this);
        title.setWidthLimit(450);

        this.title = title;

        //

        const rightBtn = new Button({
            x: 275,
            y: -305,
            parent: this,
            active: "arrow_btn_active",
            hover: "arrow_btn_hover",
            press: "arrow_btn_press",
        });

        rightBtn.onClick = this.changeList.bind(this, 1);
    }

    private createList() {
        const colors = ["#c16001", "#205caf", "#8a1a00", "#333333"];
        const lines = [];

        for (let i = 0; i < 3; i++) {
            const y = -220 + i * 80;

            new Sprite(-100, y, `place_${(i + 1) as 1 | 2 | 3}`, this);
            new Sprite(260, y, "highleader_scores_plate", this);

            const name = new Text(-265, y - 2, { fill: colors[i], fontSize: 50 }, "-", this);
            name.anchor.set(0, 0.5);
            name.setWidthLimit(400);
            lines.push(name);

            const score = new Text(260, y - 2, { fill: colors[i], fontSize: 50 }, "-", this);
            score.setWidthLimit(130);
            lines.push(score);
        }

        for (let i = 3; i < 10; i++) {
            const y = -130 + i * 45;

            new Sprite(-65, y, "midleader_name_plate", this);
            new Sprite(260, y, "midleader_scores_plate", this);
            new Text(-310, y - 4, { fill: "white", fontSize: 40 }, `${i + 1}`, this);

            const name = new Text(-265, y - 2, { fill: colors[3], fontSize: 40 }, "-", this);
            name.anchor.set(0, 0.5);
            name.setWidthLimit(400);
            lines.push(name);

            const score = new Text(260, y - 2, { fill: colors[3], fontSize: 50 }, "-", this);
            score.setWidthLimit(130);
            lines.push(score);
        }

        this.lines = lines;

        this.updateList();
    }

    private changeList(value: number) {
        type state_keys = keyof typeof this.states;

        const states = Object.keys(this.states) as state_keys[];
        let index = states.indexOf(this.state);

        if (index <= 0) index = states.length;

        this.state = states[(index + value) % states.length];
        this.title.text = i18n(this.state);

        this.updateList();
    }

    private updateList() {
        for (let i = 0; i < this.lines.length; i += 2) {
            const name = this.lines[i];
            const score = this.lines[i + 1];

            const data = this.states[this.state][i / 2];

            name.setText(data.name);
            score.setText(`${data.score}`);
        }
    }
}
