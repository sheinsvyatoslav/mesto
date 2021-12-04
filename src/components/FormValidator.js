export default class FormValidator {
  constructor(data, formElement) {
    this._fieldSelector = data.fieldSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClassActive = data.errorClassActive;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`.${this._submitButtonSelector}`);
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(`${this._errorClassActive}`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(`${this._inputErrorClass}`);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(`${this._errorClassActive}`);
    errorElement.textContent = '';
    inputElement.classList.remove(`${this._inputErrorClass}`);
  }

  _isValid(){
    if (!this._inputElement.validity.valid) {
      this._showInputError(this._inputElement);
    }
    else this._hideInputError(this._inputElement);
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      this._buttonElement.classList.remove(`${this._inactiveButtonClass}`)
      this._buttonElement.removeAttribute('disabled');
    } 
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
      this._setEventListeners();
  }
}

