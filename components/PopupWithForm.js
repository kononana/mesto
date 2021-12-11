import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor({
        popup,
        submitForm
    }) {
        super(popup)
        this._element = popup
        this._form = this._element.querySelector('.popup__form')
        this._submitForm = submitForm

    }
    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input')
        this._values = {}
        this._inputList.forEach(input => {
            this._values[input.name] = input.value

        });
        return this._values
    }

    setEventListener() {
        super.setEventListener()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues())
        })
    }


    close() {
        super.close();
        this._form.reset()
    }
}