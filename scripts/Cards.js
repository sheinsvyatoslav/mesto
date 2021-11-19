import { openPopup } from "./index.js";
export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  //получение шаблона для карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _openImage() {
    const popupImage = document.querySelector('.popup_type_image');
    openPopup(popupImage);
    popupImage.querySelector('.popup__name').textContent = this._name;
    popupImage.querySelector('.popup__picture').src = this._link;
    popupImage.querySelector('.popup__picture').alt = this._name;
  }

  _setEventListeners() {
    //лайк карточки
    this._element.querySelector('.card__like-button').addEventListener('click', (evt) => { 
      evt.target.classList.toggle('card__like-button_active');
    });

    //удаление карточки
    this._element.querySelector('.card__delete-button').addEventListener('click', (evt) => { 
      const cardItem = evt.target.closest('.card');
      cardItem.remove();
    });

    //открытие изображения 
    this._element.querySelector('.card__image').addEventListener('click', () => { 
      this._openImage();
    });
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    return this._element;
  }
}
