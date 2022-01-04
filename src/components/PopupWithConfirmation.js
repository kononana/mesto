import Popup from "./Popup.js"

export default class PopupWithConfirmation extends Popup {
  constructor (popupSelector) {
    super (popupSelector);
    this._form = document.querySelector('.popup_type_delete')
    this._saveButton = this._form.querySelector('.popup__submit');
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

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Удаление...';
     } else {
      this._saveButton.textContent = 'Да';
     }
  }

}
