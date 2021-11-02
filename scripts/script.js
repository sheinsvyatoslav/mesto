//поиск необходимых элементов
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_type_add');
const closeButtonImage = document.querySelector('.popup__close-button_type_image');
const addButton = document.querySelector('.profile__add-button');
const deleteButton = document.querySelectorAll('.card__delete-button');
const likeButton = document.querySelectorAll('.card__like-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');

const nameInput = document.querySelector('.form__input_type_name');
const aboutInput = document.querySelector('.form__input_type_about');
const placeInput = document.querySelector('.form__input_type_place');
const imageInput = document.querySelector('.form__input_type_image');

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardName = document.querySelectorAll('.card__name');
const cardImage = document.querySelectorAll('.card__image');

const cards = document.querySelector('.cards');

initialCards.reverse().forEach(function(el) {
  addCard(createCard(el.name, el.link));
});

//присваивание элементам формы текста со страницы
function popupPutInfo() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

//открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//открытие изображения
function openImage(cardElement, nameValue, imageValue) {
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) { 
    openPopup(popupImage);
    popupImage.querySelector('.popup__name').textContent = nameValue;
    popupImage.querySelector('.popup__picture').src = imageValue;
  });
}

//закрытие попапа клавишей Escape
function closePopupKeyboard(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

//закрытие попапа на оверлей
function closePopupOverlay(evt) {
  const openedPopup = document.querySelector('.popup_opened')
  if (evt.target.classList.contains('popup')) {
    closePopup(openedPopup);
  } 
}

//очистка ошибок перед открытием попапа
function preparePopup(popup) {
  const inputList = Array.from(popup.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    const errorElement = popup.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  });
  const buttonElement = popup.querySelector('.form__button');
  buttonElement.classList.remove('form__button_inactive')
  buttonElement.removeAttribute('disabled');
}

//лайк карточки
function likeCard(cardElement) {
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('card__like-button_active');
  });
}

//удаление карточки
function deleteCard(cardElement) {
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) { 
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  });
}

// создание карточки
function createCard(nameValue, imageValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__name').textContent = nameValue;
  cardElement.querySelector('.card__image').src = imageValue;

  likeCard(cardElement);
  deleteCard(cardElement);
  openImage(cardElement, nameValue, imageValue);

  return cardElement;
}

//добавление карточки
function addCard(card) {
  cards.prepend(card);
}

//функция сохранения данных формы изменения
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopup(popupEdit);
}

//функция сохранения данных формы создания карточки
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addCard(createCard(placeInput.value, imageInput.value));
  placeInput.value = '';
  imageInput.value = '';
  closePopup(popupAdd);
}

//вызываем функции согласно событиям
editButton.addEventListener('click', () => {
  preparePopup(popupEdit);
  openPopup(popupEdit);
  popupPutInfo();
});
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', () => {
  const submitButton = formAdd.querySelector('.form__button')
  submitButton.classList.add('form__button_inactive');
  submitButton.setAttribute('disabled', true);
  openPopup(popupAdd);
});
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
formAdd.addEventListener('submit', formSubmitHandlerAdd);

closeButtonImage.addEventListener('click', () => closePopup(popupImage));

document.addEventListener('keydown', closePopupKeyboard);
document.addEventListener('mousedown', closePopupOverlay);


