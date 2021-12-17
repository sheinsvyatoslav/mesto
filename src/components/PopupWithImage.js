import Popup from './Popup.js'
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({place, image}) {
    this._imageName = this._popup.querySelector('.popup__name');
    this._imagePicture = this._popup.querySelector('.popup__picture');
    this._imageName.textContent = place;
    this._imagePicture.src = image;
    this._imagePicture.alt = place;
    super.open();
  }
}