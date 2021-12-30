import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._form = document.querySelector('.popup_type_delete')
  }

  setSubmition(action) { 
    this.handleSubmit = action
  }

  setEventListener() {
    super.setEventListener(); 
    this._form.addEventListener("submit", (event) => {
      event.preventDefault(); 
      this.handleSubmit();
    })
  }

}
