export default class LocalCheats {
    private visible = false;
    private container: HTMLDivElement;
    private cheatList: HTMLDivElement;
    private cheatLines: Map<string, HTMLElement> = new Map();

    constructor() {
        this.container = this.createContainer();
        this.cheatList = this.createCheatsList();
        this.createToggleButton();
    }

    public addCheatLine(
        name: string,
        config: {
            tag: string;
            attributes?: [string, string][];
            styles?: [string, string][];
            innerHTML?: string;
        }
    ) {
        if (this.cheatLines.has(name)) {
            console.error(`Cheat line ${name} already exists`);
            return;
        }

        const element = document.createElement(config.tag);

        config.attributes?.forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        config.styles?.forEach(([key, value]) => {
            element.style.setProperty(key, value);
        });
        element.innerHTML = config.innerHTML ?? "";

        this.cheatLines.set(name, element);

        this.cheatList.appendChild(element);

        return element;
    }

    public addButton(id: string, callback: Function) {
        const text = this.prepareText(id);

        this.addCheatLine(id, {
            tag: "div",
            attributes: [["id", id]],
            styles: [
                ["display", "flex"],
                ["width", "fit-content"],
                ["margin-bottom", "10px"],
            ],
            innerHTML: `<button id="${id}_btn">${text}</button>`,
        })
            ?.querySelector(`#${id}_btn`)
            ?.addEventListener("pointerdown", (event: any) => callback());
    }

    public addInputButton(id: string, callback: Function) {
        const text = this.prepareText(id);

        this.addCheatLine(id, {
            tag: "div",
            attributes: [["id", id]],
            styles: [
                ["display", "flex"],
                ["width", "fit-content"],
                ["margin-bottom", "10px"],
            ],
            innerHTML: `<input id="${id}_input" type="text" style="width: 50px; text-align: center;"><button id="${id}_btn">${text}</button>`,
        })
            ?.querySelector(`#${id}_btn`)
            ?.addEventListener("pointerdown", (event: any) => {
                const target = event.target;
                const parent = target.parentElement;
                const value = parent.querySelector(`#${id}_input`)?.value;

                callback(value);
            });
    }

    public addCheckbox(id: string, callback: Function) {
        const text = this.prepareText(id);

        this.addCheatLine(id, {
            tag: "div",
            attributes: [["id", id]],
            styles: [
                ["display", "flex"],
                ["width", "fit-content"],
                ["height", "25px"],
                ["margin-bottom", "10px"],
            ],
            innerHTML: `<input id="${id}_checkbox" type="checkbox" style="width: 50px; text-align: center;"><p>${text}</p>`,
        })
            ?.querySelector(`#${id}_checkbox`)
            ?.addEventListener("change", (event: any) => {
                const target = event.target;
                callback(target.checked);
            });
    }

    private createContainer() {
        const container = document.createElement("div");
        container.setAttribute("id", "cheats_container");
        container.style.setProperty("position", "absolute");
        container.style.setProperty("top", "170px");
        container.style.setProperty("right", "4px");
        container.style.setProperty("background-color", "white");
        container.style.setProperty("padding", "5px");
        container.style.setProperty("width", "fit-content");
        container.style.setProperty("display", "flex");
        container.style.setProperty("flex-direction", "column");
        container.style.setProperty("z-index", "1000000000");

        document.body.appendChild(container);

        return container;
    }

    private createCheatsList() {
        const panel = document.createElement("div");
        panel.style.setProperty("display", "none");
        this.container.appendChild(panel);

        return panel;
    }

    private createToggleButton() {
        const button = document.createElement("button");
        button.insertAdjacentText("afterbegin", "Cheats");
        button.style.setProperty("cursor", "pointer");
        this.container.appendChild(button);

        button.addEventListener("click", () => {
            this.visible = !this.visible;
            const display = this.visible ? "block" : "none";
            this.cheatList.style.setProperty("display", display);
        });
    }

    private prepareText(id: string) {
        return id
            .replace(/(^[a-zA-z])/, (c) => c.toUpperCase())
            .replaceAll("_", " ");
    }
}
