import {Card} from './Cards.js'
import {initialCards} from './initial-cards.js'
import {FormValidator} from './FormValidator.js'
//поиск необходимых элементов
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_type_add');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const formEdit = document.querySelector('.form_type_edit');
const formAdd = document.querySelector('.form_type_add');

const nameInput = document.querySelector('.form__input_type_name');
const aboutInput = document.querySelector('.form__input_type_about');
const placeInput = document.querySelector('.form__input_type_place');
const imageInput = document.querySelector('.form__input_type_image');

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cards = document.querySelector('.cards');

//добавление начальных карточек
initialCards.reverse().forEach((el) => {
  const card = new Card(el.name, el.link, '#card-template');
  cards.prepend(card.generateCard());
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
  const card = new Card(placeInput.value, imageInput.value, '#card-template');;
  cards.prepend(card.generateCard());
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

document.addEventListener('keydown', closePopupKeyboard);
document.addEventListener('mousedown', closePopupOverlay);

//валидация форм
const mestoSettings = {
  fieldSelector: 'form__set',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
}

const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const formValidator = new FormValidator(mestoSettings, formElement);
  formValidator.enableValidation();
});

