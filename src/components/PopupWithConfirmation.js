import Popup from './Popup.js'
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {submitHandler}) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.form');
  }

  open(card, item) {
    super.open();
    this._element = card;
    this._item = item;
  }

  deleteItem() {
    this._element.remove();
    this._element = null;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._item);
      this.deleteItem();
    });
  }
}