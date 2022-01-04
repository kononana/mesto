export default class FormValidator {
  constructor(config, formElement) {
      this._formSelector = config.formSelector;
      this._inputSelector = config.inputSelector;
      this._buttonSelector = config.buttonSelector;
      this._inputErrorClass = config.inputErrorClass;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._formElement = formElement;
      this._errorClass = config.errorClass;
      this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
      this._submitButton = this._formElement.querySelector(config.buttonSelector);
  }

  _showInputError = (inputElement) => {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass)
  }

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass)
      errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement);
      } else {
          this._hideInputError(inputElement);
      }
  };


  _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      })
  }
  _toggleButtonState = () => {
      if (this._hasInvalidInput()) {
          this._submitButton.classList.add(this._inactiveButtonClass);
          this._submitButton.disabled = true;
      } else {
          this._submitButton.classList.remove(this._inactiveButtonClass);
          this._submitButton.disabled = false
      }
  }

  _setEventListener = () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
          });
      });
  };
  
// Очистка полей от ошибок

  clearErrors() {
    this._inputList.forEach(inputElement => {
            if (inputElement.classList.contains(this._inputErrorClass)) {
            this._hideInputError(inputElement);
            }
        });
            this._toggleButtonState();
    };


  enableValidation = () => {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      })
      this._setEventListener();
  };

};