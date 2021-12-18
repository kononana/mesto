import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    constructor(popup,{submitForm
    }) {
        super(popup)
        this._form = this._popup.querySelector('.popup__form')
        this._submitForm = submitForm
    }

    _getInputValues() {
      this._inputList = this._form.querySelectorAll('.popup__input')
      this._values = {}
      this._inputList.forEach(input => {
          this._values[input.id] = input.value;

      });
      return this._values
  }


    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._submitForm(this._getInputValues());
        })
    }


    close() {
        super.close();
        this._form.reset()
    }
}



