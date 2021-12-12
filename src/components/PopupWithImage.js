import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._name = this._popup.querySelector('.popup__image-title');
        this._link = this._popup.querySelector('.popup__image');

    }

    open({
        link,
        name
    }) {
        super.open();
        this._link.src = link;
        this._name.alt = name;
        this._name.textContent = name;

    }
}