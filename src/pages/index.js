import "./index.css"
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { data } from "autoprefixer";

/*Объявление переменных*/
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
const profileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
const popupOpenBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-occupation');
const popupAddCard = document.querySelector('.popup_add-card')
const popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
const formCardElement = popupAddCard.querySelector('.popup__add-form');
const nameCardInput = popupAddCard.querySelector('.popup__input_field_card-name');
const linkCardInput = popupAddCard.querySelector('.popup__input_field_card-link');
const popupAddCardBtn = document.querySelector('.profile__add-button');
const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');

/* валидация форм*/

const editProfileValidation = new FormValidator(config, profileForm);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(config, formCardElement);
addCardValidation.enableValidation();


/*Редактирование профиля пользователя*/
const userProfile = new UserInfo({
  nameUser: profileName,
  aboutUser: profileJob
})

const openProfileEdition = () => {
    popupEditForm.open()
    const getInfo = userProfile.getUserInfo()
    nameInput.value = getInfo.name
    jobInput.value = getInfo.about

}

const popupEditForm = new PopupWithForm(popupEditProfile,{
    submitForm: (data) => {
        userProfile.setUserInfo(data)
        popupEditForm.close()
    }
})

popupEditForm.setEventListeners();

popupOpenBtn.addEventListener('click', openProfileEdition);

/*Попап для добаления карточек*/

const fullScreeImage = new PopupWithImage(popupImage)
fullScreeImage.setEventListeners()

function openAddCardPopup() {
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

const popupNewCardSubmit = new PopupWithForm(popupAddCard,{
    submitForm: () => {
        const newCard = createCard({ name: nameCardInput.value, link: linkCardInput.value })
        itemsList.addNewItem(newCard)
        popupNewCardSubmit.close()
    }
})
popupNewCardSubmit.setEventListeners();
