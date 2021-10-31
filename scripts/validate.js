const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  inactivaButtonClass: 'popup__submit_disabled',
}
//
const showInputError = (errorElement, inputElement, config) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (errorElement, inputElement, config) => {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement,config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
      showInputError(errorElement,inputElement, config);
  } else {
      hideInputError(errorElement,inputElement, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactivaButtonClass);
      buttonElement.disabled = 'disabled';
  } else {
      buttonElement.classList.remove(config.inactivaButtonClass);
      buttonElement.disabled = false
  }
}


const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.buttonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach(inputElement => {
      inputElement.addEventListener('input', function() {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
          setEventListeners(formElement, config);
      });
};


enableValidation(config);

