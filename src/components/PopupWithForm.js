import  Popup  from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popup, { submitForm }) {
        super(popup);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._inputsList = Array.from(this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues() {
        this._inputValue = {}
        this._inputsList.forEach((input) => {
            this._inputValue[input.id] = input.value;

        });
        console.log("значение инпутов:", this._inputValue)

        return this._inputValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

}