let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.form');
let formInput = formElement.querySelectorAll('input');
let profileName = document.querySelector('.profile__name');
let profileSubtitle = document.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  formInput[0].setAttribute('value', profileName.textContent);
  formInput[1].setAttribute('value', profileSubtitle.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
  formInput[0].removeAttribute('value');
  formInput[1].removeAttribute('value');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = formInput[0].value;
  profileSubtitle.textContent = formInput[1].value;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', closePopup);

