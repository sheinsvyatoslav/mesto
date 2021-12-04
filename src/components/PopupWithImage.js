import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup({place, image}) {
    this._popup.querySelector('.popup__name').textContent = place;
    this._popup.querySelector('.popup__picture').src = image;
    this._popup.querySelector('.popup__picture').alt = place;
    super.openPopup();
  }
}