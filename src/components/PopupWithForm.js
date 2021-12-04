import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
  
  //создаем объект данных формы
  _getInputValues() {
    const inputList = this._form.querySelectorAll('.form__input');
    const inputData = {};
    inputList.forEach((inputElement) => {
      inputData[inputElement.name] = inputElement.value;
    })
    return inputData;
    
    /* через метод reduce
    const inputListArr = Array.from(this._form.querySelectorAll('.form__input'));
    const inputData = inputListArr.reduce(function (result, item) {
      result[item.name] = item.value;
      return result;
    }, {});

    return inputData;
     */
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
      this.closePopup();
    });
  }
}