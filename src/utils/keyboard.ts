import { event } from "globals";

export default function() {
    const element = document.getElementById("mobile_keyboard") as HTMLInputElement;
    if (!element) return;
    element.value = " ";

    element.onfocus = () => {
        element.style.zIndex = "1";
        event.emit("keyboard_focus");
    };
    element.onblur = () => {
        element.style.zIndex = "0";
        event.emit("keyboard_blur");
    };
    element.oninput = () => {
        event.emit("keyboard_key", element.value[1]);
        element.value = " ";
    }
    element.onkeydown = function(pressEvent) {
        element.value = " ";

        if (pressEvent.key === "Enter") return element.blur();
        if (pressEvent.key === "Backspace") {
            return event.emit("keyboard_key", "backspace");
        }
    };

    event.on("keyboard_open", () => {
        document.getElementById("mobile_keyboard")?.focus();
    });
    event.on("keyboard_close", () => {
        document.getElementById("mobile_keyboard")?.blur();
    });
}