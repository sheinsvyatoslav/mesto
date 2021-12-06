export default class Card {
  constructor({name, link, handleCardClick}, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  //получение шаблона для карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    //лайк карточки
    this._likeButton.addEventListener('click', (evt) => { 
      evt.target.classList.toggle('card__like-button_active');
    });

    //удаление карточки
    this._deleteButton.addEventListener('click', (evt) => { 
      this._element.remove();
      this._element = null;
    });

    //открытие изображения 
    this._cardImage.addEventListener('click', () => { 
      this._handleCardClick();
    });
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.card__name');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton =  this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
