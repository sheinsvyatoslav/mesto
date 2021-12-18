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
  token: '46a3dddb-4cdf-4612-a6e0-215cf13e5e22'
}); 

//экземпляр для открытия изображений
const popupImage = new PopupWithImage('.popup_type_image');

//экземпляр для изменения данных пользователя на странице при помощи формы
const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

//экземпляр для создания карточки и вставки в DOM
const cardList = new Section({
  renderer: (item) => {
    const card = new Card({
      name: item.name, 
      link: item.link,
      likesNumber: item.likes.length,
      ownerId: item.owner._id,
      handleCardClick: () => {
        popupImage.open({place: item.name, image: item.link})
      },
      handleDeleteCard: (cardElement) => {
        popupConfirmDeleteCard.open(cardElement, item);
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

Promise.all([
  // передаем данные о пользователе и отрисовываем карточки
    api.getUserInfo()
    .then(userData => {
      userInfo.setUserInfo(userData);
      userInfo.setAvatar(userData);
  })
    .catch((err) => {
      console.log(err);
  }),
    api.getInitialCards(),
  ])
  .then(([user, cards])=>{
    console.log([user, cards])
    cardList.renderItems(cards);
 })

//экземпляр подтверждение удлаения карточки
const popupConfirmDeleteCard = new PopupWithConfirmation(
  '.popup_type_delete',
  {submitHandler: (item) => {
    api.deleteCard(item._id)
    .then(() => {
      popupConfirmDeleteCard.close();
    })
    .catch((err) => {
      console.log(err);
      })
  }}
)

//экземпляр для формы добавления карточки
const popupAddCard = new PopupWithForm(
  '.popup_type_add',
  {submitHandler: (data) => {
    api.addCard({name: data.place, link: data.image})
    .then(card => {
      console.log(card);
      cardList.addItem(card);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(false, 'Создать')
    })
  }}
)

//экземпляр изменения инфо
const popupEditProfile = new PopupWithForm(
  '.popup_type_edit',
  {submitHandler: (data) => {
    api.setUserInfo({name: data.name, about: data.about})
    .then(result => {
      console.log(result)
      userInfo.setUserInfo(result);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false, 'Сохранить')
    })
  }} 
);

//экземпляр для изменения аватара
const popupEditAvatar = new PopupWithForm(
  '.popup_type_avatar',
  {submitHandler: (avatar) => {
    api.setAvatar(avatar)
    .then(result => {
      console.log(result);
      userInfo.setAvatar(result);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false, 'Сохранить')
    })
  }} 
);

//навешиваем обработчики
editButton.addEventListener('click', () => {
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  aboutInput.value = userInfoData.about;
  formEditValidator.resetValidation();
  popupEditProfile.open();
});
popupEditProfile.setEventListeners();

addButton.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddCard.open();
});
popupAddCard.setEventListeners();

avatarButton.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();

popupImage.setEventListeners();

popupConfirmDeleteCard.setEventListeners();

//валидация форм
const formAddValidator = new FormValidator(mestoSettings, formAdd);
formAddValidator.enableValidation();
const formEditValidator = new FormValidator(mestoSettings, formEdit);
formEditValidator.enableValidation();
const formAvatarValidator = new FormValidator(mestoSettings, formAvatar);
formAvatarValidator.enableValidation();