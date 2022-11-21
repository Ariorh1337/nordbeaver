import * as PIXI from "pixi.js";
import { width, height } from "globals";

export const orientation = function() {
    return innerWidth / innerHeight > .95 ? "landscape" : "portrait";
};

export const scaleMin = function() {
    return Math.min(innerWidth / width, innerHeight / height);
};

export const scaleMax = function() {
    return Math.max(innerWidth / width, innerHeight / height);
};

export const normalize = function(value: number) {
    const offset = innerHeight / (innerHeight * scaleMax());

    return value * offset;
};

export const scale = function() {
    return normalize(scaleMin());
};

export function rescale_to_width(
    target_text: PIXI.Container,
    target_width = 0,
    scale = 0
) {
    if (scale) {
        target_text.scale.set(scale);
        return scale;
    }
    const scale_value = Math.min(
        (target_text.scale.x * target_width) / target_text.width,
        1
    );
    target_text.scale.set(scale_value);

    return scale_value;
}
