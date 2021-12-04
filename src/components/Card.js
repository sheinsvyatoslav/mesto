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
      this._handleCardClick();
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
