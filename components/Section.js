export default class Section {
    constructor({ items, renderer }, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    renderItems() {
        this._items.forEach((item) => {
            const element = this._renderer(item);

        });
    }
    addItem(item) {
        this._container.append(item)
    }

    addNewItem(item) {
        this._container.prepend(item);
    }
}