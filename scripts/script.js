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

const nameInput = document.querySelector('.form__item_type_name');
const aboutInput = document.querySelector('.form__item_type_about');
const placeInput = document.querySelector('.form__item_type_place');
const imageInput = document.querySelector('.form__item_type_image');

const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const cardName = document.querySelectorAll('.card__name');
const cardImage = document.querySelectorAll('.card__image');

const cards = document.querySelector('.cards');

//массив карточек
const initialCards = [
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

for (let i = 5; i >= 0; i--) {
  createCard(initialCards[i].name, initialCards[i].link);
  addCard(createCard(initialCards[i].name, initialCards[i].link));
}

//присваивание элементам формы текста со страницы
function PopupPutInfo() {
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

// создание карточки
function createCard(nameValue, imageValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = nameValue;
  cardElement.querySelector('.card__image').src = imageValue;

  //лайк карточки при нажатии на кнопку
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('card__like-button_active');
  });

  //удаление карточки при нажатии на кнопку
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) { 
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  });

  cardElement.querySelector('.card__image').addEventListener('click', function (evt) { 
    openPopup(popupImage);
    popupImage.querySelector('.popup__name').textContent = nameValue;
    popupImage.querySelector('.popup__picture').src = imageValue;
  });

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
  createCard(placeInput.value, imageInput.value);
  addCard(createCard(placeInput.value, imageInput.value));
  placeInput.value = '';
  imageInput.value = '';
  closePopup(popupAdd);
}

//вызываем функции согласно событиям
editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  PopupPutInfo();
});
closeButtonEdit.addEventListener('click', () => closePopup(popupEdit));
formEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', () => openPopup(popupAdd));
closeButtonAdd.addEventListener('click', () => closePopup(popupAdd));
formAdd.addEventListener('submit', formSubmitHandlerAdd);

closeButtonImage.addEventListener('click', () => closePopup(popupImage));


