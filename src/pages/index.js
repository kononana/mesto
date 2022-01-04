import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { initialCards } from "../utils/constants";
import { config } from "../utils/constants";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation  from "../components/PopupWithConfirmation.js";

/*Объявление переменных*/
const popupEditProfile = document.querySelector('.popup_edit-profile')
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-occupation');
const popupAddCard = document.querySelector('.popup_add-card')
const formCardElement = popupAddCard.querySelector('.popup__form');
const popupAddCardBtn = document.querySelector('.profile__add-button');
const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image');
const popupDeleteCard = document.querySelector('.popup_type_delete')
const popupAvatar = document.querySelector('.popup_type_avatar')
const avatarForm  = popupAvatar.querySelector('.popup__form')
const profileAvatar = document.querySelector('.profile__avatar')
const avatarOpenBtn = document.querySelector('.profile__edit-avatar')


/*API*/
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-32/',
    headers: {
        'Content-Type': 'application/json',
        authorization: 'c8ac5435-19ae-40ca-be01-a8b8eb11b753'
    }
}) 

// * Получение данных с сервера */

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfoProfile.setUserInfo(user);
    itemsList.renderItems(cards);
   
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
    
  })


/*Редактирование аватарки*/
const popupAvatarEdit = new PopupWithForm ({
    popupSelector: popupAvatar,
    submitForm: (data) => {
      popupAvatarEdit.renderLoading(true);
      api.editAvatar({
        avatar: data.avatar
      })
      .then((data) => {
        userInfoProfile.setUserInfo(data);
      })
      .then(() => {
        popupAvatarEdit.close()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => popupAvatarEdit.renderLoading(false))
    }
  })
   
  popupAvatarEdit.setEventListener();
  
  const popupAvatarOpen = () => {
    avatarValidation.clearErrors();
    popupAvatarEdit.open()
  }
  avatarOpenBtn.addEventListener('click', popupAvatarOpen);


/*Редактирование профиля пользователя*/

const userInfoProfile = new UserInfo({
  userSelector: profileName,
  infoSelector: profileJob,
  avatarSelector: profileAvatar
});

const popupProfileEdit = new PopupWithForm ({
    popupSelector: popupEditProfile,
    submitForm: (data) => { 
      popupProfileEdit.renderLoading(true);
        api.editUserInfo({
          name: data.name,
          about: data.about,
        }) 
          .then((data) => {
            userInfoProfile.setUserInfo(data);
            popupProfileEdit.close();
          })
          .catch((err) => {
            console.log(`произошла ошибка: ${err}`);
          })
          .finally(() => popupProfileEdit.renderLoading(false))
    }
  });
  
  popupProfileEdit.setEventListener();

const openProfileEdition = () => {
    const getUserInfo = userInfoProfile.getUserInfo();
    nameInput.value = getUserInfo.name
    jobInput.value = getUserInfo.about
    editProfileValidation.clearErrors();
    popupProfileEdit.open()
}

popupOpenBtn.addEventListener('click', openProfileEdition);


/*Попап для полноразмерных карточек*/

const fullScreeImage = new PopupWithImage(popupImage)
fullScreeImage.setEventListener()


/*Попап для удаления карточек*/
const popupConfirmDelete = new PopupWithConfirmation(popupDeleteCard)
popupConfirmDelete.setEventListener();


/* создание  карточки*/
const createCard = (data) => {
    const card = new Card({
        data,
        userId: userInfoProfile.getUserId(),
        handleCardClick: () => {
            fullScreeImage.open(data)
        }, 
        handleCardDelete: (cardId) => {
          popupConfirmDelete.open();
          popupConfirmDelete.setSubmition(() => {
            popupConfirmDelete.renderLoading(true);
             api.deleteCard(cardId)
              .then(() => {
                popupConfirmDelete.close()
                card.deliteCard()
              })
              .catch((err) => {
                console.log(`Ошибка: ${err}`);
              })
              .finally(() => popupConfirmDelete.renderLoading(false));
            })
          },
      handleLikeClick: (cardId) => {
        api.addLike(cardId)
          .then((res) => {
            card.like(res);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      },
      handleLikeDelete: (cardId) => {
        api.deleteLike(cardId)
        .then((response) => {
          card.like(response);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      },
    }, "#card-template");
    const cardElement = card.generateCard();
    return cardElement;
}

/*Добавление новой карточки*/

const popupNewCardSubmit = new PopupWithForm ({
  popupSelector: popupAddCard,
  submitForm:(data) => {
    popupNewCardSubmit.renderLoading(true);
    api.addNewCard({
      title: data.title,
      link: data.link
    })
    .then((data) => {
    const element = createCard(data)
     itemsList.addNewItem(element);
    })
    .then(() => {
      popupNewCardSubmit.close(); 
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => popupNewCardSubmit.renderLoading(false))
    
}
}) 

popupNewCardSubmit.setEventListener();

//Открытие попапа добавления карточек 
function openAddCardPopup() {
  addCardValidation.clearErrors();
  popupNewCardSubmit.open()
}
popupAddCardBtn.addEventListener('click', openAddCardPopup);

/* отрисовка массива карточек*/
const itemsList = new Section({
  renderer: (item) => {
      const element = createCard(item)
      itemsList.addItem(element)     
  }
}, cardsList)


/* валидация форм*/

const editProfileValidation = new FormValidator(config, profileForm);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(config, formCardElement);
addCardValidation.enableValidation();
const avatarValidation = new FormValidator(config,avatarForm);
avatarValidation.enableValidation();