import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "./utils/constants.js";
import { config } from "./utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";

/*Объявление переменных*/
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-occupation');
const popupAddCard = document.querySelector('.popup_add-card')
const popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
const formCardElement = popupAddCard.querySelector('.popup__form');
const nameCardInput = popupAddCard.querySelector('.popup__input_field_card-name');
const linkCardInput = popupAddCard.querySelector('.popup__input_field_card-link');
const popupAddCardBtn = document.querySelector('.profile__add-button');
const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');
const popupDeleteCard = document.querySelector('.popup_type_delete')
const popupAvatar = document.querySelector('.popup_type_avatar')
const avatarForm  = popupAvatar.querySelector('.popup__form')
const avatarInput = popupAvatar.querySelector('.popup__input_type_avatar')
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

/* валидация форм*/

const editProfileValidation = new FormValidator(config, profileForm);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(config, formCardElement);
addCardValidation.enableValidation();
const avatarValidation = new FormValidator(config,avatarForm);
avatarValidation.enableValidation();

/*Редактирование аватара*/
const popupChangeAvatar = new PopupWithForm({
    popup: popupAvatar,
    submitForm:(data) => {
        api.editAvatar({
            avatar: data.avatar
        })
        .then((data) => {
            userProfile.setAvatar(data)
            popupChangeAvatar.close()
        })
        .catch((err) => {console.log(`${err}`)})
    }
})
popupChangeAvatar.setEventListener()

const popupAvatarOpen = () => {
    avatarValidation.clearErrors()
    popupChangeAvatar.open()
}

avatarOpenBtn.addEventListener('click', popupAvatarOpen)

/*Редактирование профиля пользователя*/
const userProfile = new UserInfo({
    name: profileName,
    job: profileJob,
    avatar: profileAvatar
})

const openProfileEdition = () => {
    const userInfo = userProfile.getUserInfo()
    nameInput.value = userInfo.name
    jobInput.value = userInfo.job
    editProfileValidation.clearErrors();
    popupEditForm.open()
}


const popupEditForm = new PopupWithForm({
    popup: popupEditProfile,
    submitForm: (data) => {
        userProfile.setUserInfo(data)
        popupEditForm.close()
    }
})
popupEditForm.setEventListener();

popupOpenBtn.addEventListener('click', openProfileEdition);

/*Попап для добаления карточек*/

const fullScreeImage = new PopupWithImage(popupImage)
fullScreeImage.setEventListener()

function openAddCardPopup() {
    addCardValidation.clearErrors();
    popupNewCardSubmit.open()
}
popupAddCardBtn.addEventListener('click', openAddCardPopup);

/* создание  карточки*/
const createCard = (item) => {
    const card = new Card({
        data: item,
        handleCardClick: () => {
            fullScreeImage.open(item)
        }
    }, "#card-template");
    const cardElement = card.generateCard();
    return cardElement;
}

/* отрисовка массива карточек*/
const itemsList = new Section({
    items: initialCards,
    renderer: (item) => {
        const element = createCard(item)
        itemsList.addItem(element)
        
    }
}, cardsList)

itemsList.renderItems();

/*Добавление новой карточки*/

const popupNewCardSubmit = new PopupWithForm({
    popup: popupAddCard,
    submitForm: (data) => {
        const newCard = createCard({name: data.title, link: data.link})
        itemsList.addNewItem(newCard)
        popupNewCardSubmit.close()
    }

})
    


popupNewCardSubmit.setEventListener();
