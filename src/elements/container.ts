import * as PIXI from "pixi.js";
import { event } from "globals";
import { scale } from "utils";

export default class Container extends PIXI.Container {
    protected app: PIXI.Application;
    protected zoom = 1;

    constructor(app: PIXI.Application) {
        super();

        this.app = app;
        this.app.stage.addChild(this);

        event.on("resize", this.resize);
        this.resize();
    }

    get event() {
        return event;
    }

    public override destroy() {
        event.off("resize", this.resize);

        super.destroy();
    }

    protected resize = () => {
        this.scale.set(scale() * this.zoom);
    };
}