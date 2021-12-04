export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

export const mestoSettings = {
  fieldSelector: 'form__set',
  inputSelector: 'form__input',
  submitButtonSelector: 'form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClassActive: 'form__input-error_active'
}

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const formEdit = document.querySelector('.form_type_edit');
export const formAdd = document.querySelector('.form_type_add');
export const nameInput = document.querySelector('.form__input_type_name');
export const aboutInput = document.querySelector('.form__input_type_about');
export const placeInput = document.querySelector('.form__input_type_place');
export const imageInput = document.querySelector('.form__input_type_image');
export const profileNameSelector = document.querySelector('.profile__name');
export const profileAboutSelector = document.querySelector('.profile__about');
export const cardsContainer = document.querySelector('.cards');