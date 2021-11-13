const closeButtonImage = document.querySelector('.popup__close-button_type_image');
const popupImage = document.querySelector('.popup_type_image');
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
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__name').textContent = this._name;
    popupImage.querySelector('.popup__picture').src = this._link;
  }

  _closeImage(){
    popupImage.classList.remove('popup_opened');
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

    //закрытие изображения
    closeButtonImage.addEventListener('click', () => {
      this._closeImage();
    });
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__name').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    return this._element;
  }
}
