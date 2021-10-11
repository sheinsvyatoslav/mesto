//поиск необходимых элементов
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let aboutInput = formElement.querySelector('.form__item_type_about');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');

//функция открытия попапа
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileSubtitle.textContent;
}

//функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
  nameInput.removeAttribute('value');
  aboutInput.removeAttribute('value');
}

//функция сохранения данных формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = aboutInput.value;
  closePopup();
}

//вызываем функции согласно событиям
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

