import {myId} from '../utils/constants.js'
export default class Card {
  constructor({name, link, likesNumber, ownerId, handleCardClick, handleDeleteCard, putLike, removeLike, putInitialLikes}, cardSelector) {
    this._name = name;
    this._link = link;
    this._likesNumber = likesNumber;
    this._ownerId = ownerId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._putLike = putLike;
    this._removeLike = removeLike;
    this._putInitialLikes = putInitialLikes;
  }

  //получение шаблона для карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    //лайк карточки
    this._likeButton.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('card__like-button_active')) { 
        evt.target.classList.add('card__like-button_active');
        this._likesNumberElement.textContent = +this._likesNumberElement.textContent + 1;
        this._putLike();
      } 
      else {
        evt.target.classList.remove('card__like-button_active');
        this._likesNumberElement.textContent = +this._likesNumberElement.textContent - 1;
        this._removeLike();
      }
    });

    //открытие изображения 
    this._cardImage.addEventListener('click', () => { 
      this._handleCardClick();
    });
  }

  //добавление кнопки удаления
  _showDeleteButton() {
    if(this._ownerId === myId) {
      this._deleteButton.classList.add('card__delete-button_show');
      this._deleteButton.addEventListener('click', () => { 
        this._handleDeleteCard(this._element);
      });
    }
  }

  setInitialLike(like) {
    if(like._id === myId) {
      this._likeButton.classList.add('card__like-button_active');
    }
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.card__name');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton =  this._element.querySelector('.card__like-button');
    this._likesNumberElement = this._element.querySelector('.card__like-number');
    this._deleteButton = this._element.querySelector('.card__delete-button');
    this._showDeleteButton();
    this._putInitialLikes();
    this._likesNumberElement.textContent = this._likesNumber;
    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
