import * as PIXI from "pixi.js";
import { rescale_to_width } from "utils";

const defaultStyle = {
    fontFamily: "Zubilo Black",
};

export default class Text extends PIXI.Text {
    private widthLimit: number | undefined;

    constructor(
        x: number,
        y: number,
        style?: Partial<PIXI.ITextStyle> | undefined,
        text: string = "",
        parent?: PIXI.Container
    ) {
        const textStyle = new PIXI.TextStyle(
            Object.assign({}, defaultStyle, style)
        );

        super("", textStyle);
        this.position.set(x, y);
        this.anchor.set(0.5);
        this.text = text;

        if (parent) parent.addChild(this);
    }

    public setWidthLimit(width: number) {
        this.widthLimit = width;
        this.updateWidthLimit();

        return this;
    }

    public setText(text: string) {
        if (this.text === text) return this;

        this.text = text;
        this.updateWidthLimit();

        return this;
    }

    private updateWidthLimit() {
        if (!this.widthLimit && this.widthLimit !== 0) return;
        rescale_to_width(this, this.widthLimit);
    }
}
