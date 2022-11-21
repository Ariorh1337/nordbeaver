import { Subject } from "utils/observer";

export default class SoundManager extends Subject {
    private _mute = false;
    private _volume = 1;

    constructor() {
        super();
    }

    public set volume(value: number) {
        this._volume = value;
        this._mute = value === 1;

        this.notify_all();
    }

    public get volume() {
        return this._volume;
    }

    public set mute(value: boolean) {
        this.volume = Number(value);
    }

    public get mute() {
        return this._mute;
    }
}