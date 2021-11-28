export default class FormValidator {
    constructor(config, formElement) {
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._buttonSelector = config.buttonSelector;
        this._inputErrorClass = config.inputErrorClass;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._formElement = formElement;
    }
    _showInputError = (errorElement, inputElement) => {
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideInputError = (errorElement, inputElement) => {
        errorElement.textContent = '';
        inputElement.classList.remove(this._inputErrorClass);

    }
    _checkInputValidity = (inputElement) => {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        if (!inputElement.validity.valid) {
            this._showInputError(errorElement, inputElement);
        } else {
            this._hideInputError(errorElement, inputElement);
        }
    };
    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false
        }
    }
    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitBbuttonElement = this._formElement.querySelector(this._buttonSelector);
        this._toggleButtonState(inputList, submitBbuttonElement);
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, submitBbuttonElement);
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