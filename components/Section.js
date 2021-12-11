export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this.container = document.querySelector(containerSelector)
    }


    addItems(item) {
        this.container.append(item)
    }
    renderedItems() {
        this._renderedItems.forEach(item => {
            this.renderer(item)
        })
    }

}