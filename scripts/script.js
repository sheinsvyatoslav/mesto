//поиск необходимых элементов
let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = document.querySelector('.popup__close-button_type_edit');
let closeButtonAdd = document.querySelector('.popup__close-button_type_add');
let closeButtonImage = document.querySelector('.popup__close-button_type_image');
let addButton = document.querySelector('.profile__add-button');
let deleteButton = document.querySelectorAll('.card__delete-button');
let likeButton = document.querySelectorAll('.card__like-button');

let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupImage = document.querySelector('.popup_type_image');
let formEdit = document.querySelector('.form_type_edit');
let formAdd = document.querySelector('.form_type_add');

let nameInput = document.querySelector('.form__item_type_name');
let aboutInput = document.querySelector('.form__item_type_about');
let placeInput = document.querySelector('.form__item_type_place');
let imageInput = document.querySelector('.form__item_type_image');

let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');
let cardName = document.querySelectorAll('.card__name');
let cardImage = document.querySelectorAll('.card__image');

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

const initialCardsName = initialCards.map(el => el.name);
const initialCardsImage = initialCards.map(el => el.link); 

//присваиваем имена и ссылки из полученных массивов соответстующим элементам разметки

/* for (let i = 0; i < cardNameArray.length; i++) {
  cardNameArray[i].textContent = initialCardsNameOnly[i];   
  };

for (let i = 0; i < cardImageArray.length; i++) {
  cardImageArray[i].src = initialCardsImageOnly[i];   
  };
*/

 cardName.forEach(function(el, i){
  el.textContent = initialCardsName[i];
});

cardImage.forEach(function(el, i){
  el.src = initialCardsImage[i];
}); 

//функция открытия попапа изменения
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

//функция закрытия попапа изменения
function closePopupEdit() {
  popupEdit.classList.remove('popup_opened');
  nameInput.removeAttribute('value');
  aboutInput.removeAttribute('value');
}

//открытие и закрытие попапа создания карточки
function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup_opened');
}

function openPopupImage() {
  
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

// добавление карточки и присваивание ей функций удаления и лайка
function addCard(nameValue, imageValue) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__name').textContent = nameValue;
  cardElement.querySelector('.card__image').src = imageValue;

  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('card__like-button_active');
  });

  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) { 
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
  });
  
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) { 
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__name').textContent = nameValue;
    popupImage.querySelector('.popup__picture').src = imageValue;
  });
   
  cards.prepend(cardElement);
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
  closePopupAdd();
}

//удаление первоначальных карточек
  deleteButton.forEach(function(el) {
    el.addEventListener("click", function(evt) {
      const cardItem = evt.target.closest('.card');
      cardItem.remove();
    });
  });


//лайк первоначальным карточкам
likeButton.forEach(function(el) {
  el.addEventListener("click", function(evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
});

//вызываем функции согласно событиям
editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', closePopupEdit);
formEdit.addEventListener('submit', formSubmitHandlerEdit);

addButton.addEventListener('click', openPopupAdd);
closeButtonAdd.addEventListener('click', closePopupAdd);
formAdd.addEventListener('submit', formSubmitHandlerAdd);

cardImage.forEach(function(el, i) {
  el.addEventListener("click", function () {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__name').textContent = cardName[i].textContent;
    popupImage.querySelector('.popup__picture').src = cardImage[i].src;
  }); 
});

closeButtonImage.addEventListener('click', closePopupImage);


