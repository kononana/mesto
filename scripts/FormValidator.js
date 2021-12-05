export default class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._buttonSelector = config.buttonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(config.inputSelector));
        this._submitButton = this._formElement.querySelector(config.buttonSelector);
    }

    _showInputError = (errorElement, inputElement) => {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError = (errorElement, inputElement) => {
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';

    }

    _checkInputValidity = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(errorElement, inputElement);
        } else {
            this._hideInputError(errorElement, inputElement);
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
            this._submitButton.disabled = 'disabled';
        } else {
            this._submitButton.classList.remove(this._inactiveButtonClass);
            this._submitButton.disabled = false
        }
    }

    _setEventListeners = () => {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    };

};