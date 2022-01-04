import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor ({popupSelector, submitForm}) { 
    super(popupSelector);
    this._submitForm = submitForm;
    this._element = popupSelector
    this._form = this._element.querySelector('.popup__form')
    this._saveButton = this._form.querySelector('.popup__submit');
    this._inputList = this._element.querySelectorAll(".popup__input");
   
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListener() {
    super.setEventListener(); 
    this._form.addEventListener("submit", (event) => { 
      event.preventDefault(); 
      this._submitForm(this._getInputValues());  
    }); 
  } 

// Во время ожидания ответа от сервера
  renderLoading(isLoading) {
    if (isLoading) {
     this._saveButton.textContent = 'Сохранение...';
    } else {
     this._saveButton.textContent = 'Сохранить';
    }
  }


  close() {
    super.close(); 
    this._form.reset();
  }
 
 
}


