import './index.css';
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import FormValidator from '../components/FormValidator.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import {
  initialCards, 
  mestoSettings, 
  editButton, 
  addButton,  
  popupEdit, 
  popupAdd,
  popupImage, 
  formEdit, 
  formAdd, 
  nameInput,
  aboutInput,
  placeInput,
  imageInput,
  profileNameSelector,
  profileAboutSelector,
  cardsContainer,
} from '../utils/constants.js'

function setImageEvents(data) {
  const openPopupImage = new PopupWithImage(popupImage);
  openPopupImage.openPopup(data);
  openPopupImage.setEventListeners();
}

//добавляем первоначальные карточки со всеми обработчиками
const putInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      name: item.name, 
      link: item.link, 
      handleCardClick: () => {
        setImageEvents({place: item.name, image: item.link})
      }
    }, '#card-template'); 
    putInitialCards.addItem(card.generateCard());
  }
}, cardsContainer
)

putInitialCards.renderItems();

const addCard = new PopupWithForm(
  popupAdd,
  {submitHandler: (data) => {
    const card = new Card({
      name: placeInput.value, 
      link: imageInput.value,  
      handleCardClick: () => {
        setImageEvents(data);
      }
    }, '#card-template');
    putInitialCards.addItem(card.generateCard());
  }} 
)

//изменяем данные пользователя на странице при помощи формы
const userInfo = new UserInfo({profileNameSelector, profileAboutSelector});
const editInfo = new PopupWithForm(
  popupEdit,
  {submitHandler: (data) => {
    userInfo.setUserInfo(data);
  }} 
);

//вызываем функции согласно событиям
editButton.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
  formEditValidator.resetValidation();
  editInfo.openPopup();
});
editInfo.setEventListeners();

addButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  addCard.openPopup();
});
addCard.setEventListeners();

//валидация форм
const formAddValidator = new FormValidator(mestoSettings, formAdd);
formAddValidator.enableValidation(); 
const formEditValidator = new FormValidator(mestoSettings, formEdit);
formEditValidator.enableValidation();   