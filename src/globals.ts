import { utils } from "pixi.js";
import SoundManager from "sound";
import LocalCheats from "utils/cheats";
import * as language from "configs/language";

export const width = 1280;
export const height = 960;

export const canvas = document.getElementById("root") as HTMLCanvasElement;

export const event = new utils.EventEmitter();

export const cheats = new LocalCheats();

export const sound = new SoundManager();

export const i18n = function(key: language.lang_keys, replace?: string) {
    return language.ru[key].replace("{{X}}", replace || "");
};

export const state = {
    coins: 0,
    points: 0,
    meters: 0,
    player: "Guest_0000"
};
