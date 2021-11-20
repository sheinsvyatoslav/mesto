import {Card} from './Cards.js'
import {initialCards, mestoSettings} from './utils.js'
import {FormValidator} from './FormValidator.js'
//поиск необходимых элементов
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup');
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

//добавляем первоначальные карточки
initialCards.reverse().forEach(function(el) { 
  addCard(createCard(el.name, el.link));
}); 

//функция создания карточки 
function createCard(name, link) {  
  const card = new Card(name, link, '#card-template', openPopup);
  return card.generateCard(); 
} 

//функция добавления карточки 
function addCard(card) { 
  cards.prepend(card); 
}

//присваивание элементам формы текста со страницы
function popupPutInfo() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

//открытие и закрытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyboard);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyboard);
}

//закрытие попапа клавишей Escape
function closePopupKeyboard(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

//функция сохранения sданных формы изменения
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
  popupPutInfo();
  formEditValidator.resetValidation();
  openPopup(popupEdit);
});
formEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  openPopup(popupAdd);
});
formAdd.addEventListener('submit', formSubmitHandlerAdd);

//закрытие попапов на крестик и оверлей
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
})

//валидация форм
const formAddValidator = new FormValidator(mestoSettings, formAdd);
formAddValidator.enableValidation(); 
const formEditValidator = new FormValidator(mestoSettings, formEdit);
formEditValidator.enableValidation(); 


