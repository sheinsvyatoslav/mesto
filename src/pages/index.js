import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';
import { 
  mestoSettings, 
  editButton, 
  addButton,
  avatarButton,   
  formEdit, 
  formAdd,
  formAvatar, 
  nameInput,
  aboutInput,
} from '../utils/constants.js';

//экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
}); 

//экземпляр для открытия изображений
const openPopupImage = new PopupWithImage('.popup_type_image');

//экземпляр для создания карточки и вставки в DOM
const putCard = new Section({
  renderer: (item) => {
    const card = new Card({
      name: item.name, 
      link: item.link,
      likesNumber: item.likes.length,
      ownerId: item.owner._id,
      handleCardClick: () => {
        openPopupImage.openPopup({place: item.name, image: item.link})
      },
      handleDeleteCard: (cardElement) => {
        confirmDelete.openPopup(cardElement, item);
      },
      putLike: () => {
        api.putLike(item._id)
      },
      removeLike: () => {
        api.removeLike(item._id)
      },
      putInitialLikes: () => {
        item.likes.forEach((like) => {
          card.setInitialLike(like);
        })
      }
    },
      '#card-template');
    return card.generateCard();
  }
}, '.cards'
)

//экземпляр подтверждение удлаения карточки
const confirmDelete = new PopupWithConfirmation(
  '.popup_type_delete',
  {submitHandler: (item) => {
    api.deleteCard(item._id)
    .catch((err) => {
      console.log(err);
      })
  }}
)

//экземпляр для изменения данных пользователя на странице при помощи формы
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

//экземпляр для формы добавления карточки
const addCard = new PopupWithForm(
  '.popup_type_add',
  {submitHandler: (data) => {
    api.addCard({name: data.place, link: data.image})
    .then(card => {
    console.log(card);
    putCard.addItem(card);
    })
    .catch((err) => {
    console.log(err);
    })
    .finally(() => {
    addCard.renderLoading(false, 'Создать')
    })
  }}
)

//экземпляр изменения инфо
const editInfo = new PopupWithForm(
  '.popup_type_edit',
  {submitHandler: (data) => {
    api.setUserInfo({name: data.name, about: data.about})
    .then(result => {
      console.log(result)
      userInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editInfo.renderLoading(false, 'Сохранить')
    })
  }} 
);

//экземпляр для изменения аватара
const editAvatar = new PopupWithForm(
  '.popup_type_avatar',
  {submitHandler: (avatar) => {
    api.setAvatar(avatar)
    .then(result => {
      console.log(result);
      userInfo.setAvatar(result);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatar.renderLoading(false, 'Сохранить')
    })
  }} 
);

//подгружаем первоначальные карточки
api.getInitialCards()
  .then(cards => {
    console.log(cards);
    putCard.renderItems(cards);
})

//подгружаем первоначальную информацию о пользователе
api.getUserInfo()
  .then(userData => {
    console.log(userData);
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
})
  .catch((err) => {
    console.log(err);
})

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

avatarButton.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  editAvatar.openPopup();
});
editAvatar.setEventListeners();

openPopupImage.setEventListeners();

confirmDelete.setEventListeners();

//валидация форм
const formAddValidator = new FormValidator(mestoSettings, formAdd);
formAddValidator.enableValidation();
const formEditValidator = new FormValidator(mestoSettings, formEdit);
formEditValidator.enableValidation();
const formAvatarValidator = new FormValidator(mestoSettings, formAvatar);
formAvatarValidator.enableValidation();