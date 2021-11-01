const mestoSettings = {
  formSelector: 'form',
  fieldsetelector: 'form__set',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
}

//отобразить ошибку 
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${obj.inputErrorClass}`);
  errorElement.classList.add(`${obj.errorClassActive}`);
  errorElement.textContent = errorMessage;
}

//скрыть ошибку
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${obj.inputErrorClass}`);
  errorElement.classList.remove(`${obj.errorClassActive}`);
  errorElement.textContent = '';
}

//проверка на валидность
const isValid = (formElement, inputElement, obj) => {
  hideInputError(formElement, inputElement, obj);
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj)
  }
  else hideInputError(formElement, inputElement, obj);
}

//проверка на валидность элементов формы
const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${obj.inputSelector}`));
  const buttonElement = formElement.querySelector(`.${obj.submitButtonSelector}`);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
  
}

//проверка всех форм
const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(`.${obj.formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(`.${obj.fieldsetelector}`))
    fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset, obj);
    });
  });
};

//поиск невалидного поля ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//отключение кнопки
const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${obj.inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(`${obj.inactiveButtonClass}`)
    buttonElement.removeAttribute('disabled');
  } 
}

enableValidation(mestoSettings);

