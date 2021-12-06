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
  formEdit, 
  formAdd, 
  nameInput,
  aboutInput,
} from '../utils/constants.js'

//экземпляр для открытия изображений
const openPopupImage = new PopupWithImage('.popup_type_image');

//экземпляр для генерации карточек и добавления на страницу
const putInitialCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({name: item.name, link: item.link, handleCardClick: () => {
      openPopupImage.openPopup({place: item.name, image: item.link})
    }}, '#card-template');
    return card.generateCard();
  }
}, '.cards'
)

//добавляем первоначальные карточки
putInitialCards.renderItems();

//экземпляр для формы добавления карточки
const addCard = new PopupWithForm(
  '.popup_type_add',
  {submitHandler: (data) => {
    console.log(data)
    putInitialCards.addItem({name: data.place, link: data.image});
  }} 
)

//экземпляр для изменения данных пользователя на странице при помощи формы
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});
const editInfo = new PopupWithForm(
  '.popup_type_edit',
  {submitHandler: (data) => {
    userInfo.setUserInfo(data);
  }} 
);

//навешиваем обработчики
editButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  aboutInput.value = userInfoData.about;
  formEditValidator.resetValidation();
  editInfo.openPopup();
});
editInfo.setEventListeners();

addButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  addCard.openPopup();
});
addCard.setEventListeners();

openPopupImage.setEventListeners();

//валидация форм
const formAddValidator = new FormValidator(mestoSettings, formAdd);
formAddValidator.enableValidation(); 
const formEditValidator = new FormValidator(mestoSettings, formEdit);
formEditValidator.enableValidation();   