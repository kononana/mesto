import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup)
        this._popupName = this._popup.querySelector('.element__title');
        this._popupImage = this._popup.querySelector('.element__image');

    }

    open(link, name) {
        super.open();
        this._popupImage.src = link;
        this._popupName.alt = name;
        this._popupName.textContent = name;

    }
}