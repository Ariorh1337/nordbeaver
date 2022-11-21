import Button from "elements/button";
import Container from "elements/container";
import Sprite from "elements/sprite";
import Text from "elements/text";
import { height, i18n, state, width } from "globals";
import * as PIXI from "pixi.js";
import gsap from "gsap";

const starsAnimations = [
    {
        x: -600,
        y: -300,
        scale: 1,
        angle: 20,
    },
    {
        x: 500,
        y: -300,
        scale: 0.95,
        angle: -20,
    },
    {
        x: -600,
        y: -100,
        scale: 0.7,
        angle: 5,
    },
    {
        x: 600,
        y: -50,
        scale: 1.6,
        angle: -30,
    },
    {
        x: -600,
        y: 150,
        scale: 1.6,
        angle: -15,
    },
    {
        x: 550,
        y: 200,
        scale: 0.8,
        angle: -5,
    },
    {
        x: -550,
        y: 400,
        scale: 1,
        angle: -15,
    },
    {
        x: 550,
        y: 400,
        scale: 1,
        angle: 15,
    },
];

export default class Results extends Container {
    constructor(app: PIXI.Application, topScore = false) {
        super(app);

        this.position.set(width / 2, height / 2);

        this.width = width;
        this.height = height;
        this.zoom = 0.85;
        this.resize();

        // to prevent click through
        this.interactive = true;

        this.create(topScore);
    }

    private create(topScore = false) {
        if (topScore) this.createCelebrate();

        const plate = new Sprite(0, 0, "info_plate_big", this);
        const header = new Sprite(0, -410, "header_info_plate", this);

        const headStyle = { fill: "#003d71", fontSize: 55 };
        const headText = topScore ? i18n("new_record") : i18n("your_points");
        const head = new Text(0, -414, headStyle, headText, this);
        head.setWidthLimit(500);

        this.createPoints();
        this.createCoins();
        this.createMeters();

        const exit = new Button({
            x: 0,
            y: 340,
            parent: this,
            active: "ok_button_active",
            hover: "ok_button_hover",
            press: "ok_button_press",
        });

        exit.onClick = () => this.destroy();
    }

    private createCelebrate() {
        {
            const rays = new Sprite(0, 0, "rays", this);

            const tween = gsap.to(rays, {
                angle: 360,
                duration: 10,
                repeat: -1,
                ease: "none",
            });
            this.on("destroyed", () => tween.kill());
        }

        starsAnimations.forEach(async (config) => {
            const star = new Sprite(config.x, config.y, "star", this);
            star.scale.set(config.scale);

            await new Promise((resolve) => {
                setTimeout(resolve, Math.random() * 500);
            });

            const tween = gsap.to(star, {
                angle: config.angle,
                duration: 1,
                repeat: -1,
                ease: "none",
                yoyo: true,
            });

            this.on("destroyed", () => tween.kill());
        });
    }

    private createPoints() {
        const pointsStyle = {
            align: "center",
            dropShadow: true,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
            dropShadowColor: "#003d71",
            fill: "#00cc00",
            fontSize: 170,
        } as any;
        const pointsText = state.points.toString();
        const points = new Text(0, -255, pointsStyle, pointsText, this);
        points.setWidthLimit(595);
    }

    private createCoins() {
        const coin = new Sprite(-220, -50, "collect_coin_icon", this);

        const coinsStyle = {
            align: "center",
            dropShadow: true,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
            dropShadowColor: "#003d71",
            fill: "#f4ad25",
            fontSize: 100,
        } as any;
        const coinsText = state.coins.toString();
        const coins = new Text(30, -50, coinsStyle, coinsText, this);
        coins.setWidthLimit(300);
    }

    private createMeters() {
        const meter = new Sprite(-220, 150, "collect_distance_icon", this);

        const meterStyle = {
            align: "center",
            dropShadow: true,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 8,
            dropShadowColor: "#003d71",
            fill: "#9ac6ff",
            fontSize: 100,
        } as any;
        const meterText = i18n("m", state.meters.toString());
        const meters = new Text(30, 150, meterStyle, meterText, this);
        meters.setWidthLimit(300);
    }
}
