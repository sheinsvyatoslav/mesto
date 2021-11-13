export class FormValidator {
  constructor(data, formElement) {
    this._fieldSelector = data.fieldSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClassActive = data.errorClassActive;
    this._formElement = formElement;
  }
  _showInputError() {
    const errorElement = this._fieldset.querySelector(`.${this._inputElement.id}-error`);
    errorElement.classList.add(`${this._errorClassActive}`);
    errorElement.textContent = this._inputElement.validationMessage;
    this._inputElement.classList.add(`${this._inputErrorClass}`);
  }

  _hideInputError() {
    const errorElement = this._fieldset.querySelector(`.${this._inputElement.id}-error`);
    errorElement.classList.remove(`${this._errorClassActive}`);
    errorElement.textContent = '';
    this._inputElement.classList.remove(`${this._inputErrorClass}`);
  }

  _isValid(){
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    }
    else this._hideInputError();
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

  _setEventListeners() {
    this._inputList = Array.from(this._fieldset.querySelectorAll(`.${this._inputSelector}`))
    this._buttonElement = this._formElement.querySelector(`.${this._submitButtonSelector}`);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._isValid();
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    const fieldsetList = Array.from(this._formElement.querySelectorAll(`.${this._fieldSelector}`))
    fieldsetList.forEach((fieldset) => {
      this._fieldset = fieldset;
      this._setEventListeners();
    });
  }
}

