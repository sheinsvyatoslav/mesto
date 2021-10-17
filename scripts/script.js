//поиск необходимых элементов
let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.popup-edit__close-button');
let closeButtonNew = document.querySelector('.popup-new__close-button');
let addButton = document.querySelector('.profile__add-button');
let likeButton = document.querySelectorAll('.card__like-button');
const likeButtonArray = Array.from(likeButton);
let deleteButton = deleteCard();

let popupEdit = document.querySelector('.popup-edit');
let popupNew = document.querySelector('.popup-new');
let formEdit = document.querySelector('.form_type_edit');
let formAdd = document.querySelector('.form_type_add');

let nameInput = document.querySelector('.form__item_type_name');
let aboutInput = document.querySelector('.form__item_type_about');
let placeInput = document.querySelector('.form__item_type_place');
let imageInput = document.querySelector('.form__item_type_image');

let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let cardName = document.querySelectorAll('.card__name');
const cardNameArray = Array.from(cardName);
let cardImage = document.querySelectorAll('.card__image');
const cardImageArray = Array.from(cardImage);

let cards = document.querySelector('.cards');


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
//разделяем исходный массив на массив имен карточек и массив ссылок на изображения

/*const initialCardsNameOnly = [];
  const initialCardsImageOnly = [];

for (let i = 0; i < initialCards.length; i++) {
    initialCardsNameOnly[i] = initialCards[i].name;   
  };

for (let i = 0; i < initialCards.length; i++) {
    initialCardsImageOnly[i] = initialCards[i].link;   
  }; */

const initialCardsNameOnly = initialCards.map(el => el.name);
const initialCardsImageOnly = initialCards.map(el => el.link); 

//присваиваем имена и ссылки из полученных массивов соответстующим элементам разметки

/* for (let i = 0; i < cardNameArray.length; i++) {
  cardNameArray[i].textContent = initialCardsNameOnly[i];   
  };

for (let i = 0; i < cardImageArray.length; i++) {
  cardImageArray[i].src = initialCardsImageOnly[i];   
  };
*/

 cardName.forEach(function(el, i){
  el.textContent = initialCardsNameOnly[i];
});

cardImage.forEach(function(el, i){
  el.src = initialCardsImageOnly[i];
}); 

//cоздаем массивы названий карточек и ссылок на изображения
const cardNameText = cardNameArray.map(el => el.textContent);
const cardImageLink = cardImageArray.map(el => el.src);

//функция открытия попапа изменения
function openPopupEdit() {
  popupEdit.classList.add('popup-edit_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

//функция закрытия попапа изменения
function closePopupEdit() {
  popupEdit.classList.remove('popup-edit_opened');
  nameInput.removeAttribute('value');
  aboutInput.removeAttribute('value');
}

//открытие и закрытие попапа создания карточки
function openPopupNew() {
  popupNew.classList.add('popup-new_opened');
}

function closePopupNew() {
  popupNew.classList.remove('popup-new_opened');
}

// добавление карточки
function addCard(nameValue, imageValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = nameValue;
  cardElement.querySelector('.card__image').src = imageValue;

  cards.prepend(cardElement);
  deleteCard();
  console.log(cards);
}

//функция сохранения данных формы изменения
function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopupEdit();
}

//функция сохранения данных формы создания карточки
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  addCard(placeInput.value, imageInput.value)
  closePopupNew();
}

//функция удаления карточки
function deleteCard() {
  let deleteButton = document.querySelectorAll('.card__delete-button');
  deleteButton.forEach(function(el, i) {
    el.addEventListener("click", function() {
      const cardItem = deleteButton[i].closest('.card');
      cardItem.remove();
    });
  });
}

//вызываем функции согласно событиям
editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', openPopupNew);
closeButtonNew.addEventListener('click', closePopupNew);
formAdd.addEventListener('submit', formSubmitHandlerAdd);

//ставим лайки c помощью цикла for
/*
for (let i = 0; i < likeButtonArray.length; i++) {
    likeButtonArray[i].addEventListener("click", function(evt) {
      evt.target.classList.toggle('card__like-button_active');
        });
    }
*/

likeButtonArray.forEach(function(el) {
  el.addEventListener("click", function(evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
})

//удаление карточки







