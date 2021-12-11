import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./constants.js";
import { config } from "./constants.js";

/*Объявление переменных*/
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
const profileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__input_field_name');
const jobInput = popupEditProfile.querySelector('.popup__input_field_job');
/**/

const popupOpenBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-occupation');
/**/
const popupAddCard = document.querySelector('.popup_add-card')
const popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
const formCardElement = popupAddCard.querySelector('.popup__add-form');
const nameCardInput = popupAddCard.querySelector('.popup__input_field_card-name');
const linkCardInput = popupAddCard.querySelector('.popup__input_field_card-link');
const popupAddCardBtn = document.querySelector('.profile__add-button');

/**/
const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');


/*Отрытие попапа*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", escapeHandle);
    document.addEventListener("click", overlayHandle);
}
/*Закрытие попапа*/
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", escapeHandle);
    document.removeEventListener("click", escapeHandle);
}

/* валидация форм*/

const editProfileValidation = new FormValidator(config, popupEditProfile);
editProfileValidation.enableValidation();
const addCardValidation = new FormValidator(config, popupAddCard);
addCardValidation.enableValidation();

/*дефолтное значение инпутов*/
function popupEditInputs() {
    nameInput.value = profileName.textContent
    jobInput.value = profileJob.textContent
}

function submitProfileForm(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup(popupEditProfile)

}
popupOpenBtn.addEventListener('click', () => openPopup(popupEditProfile), popupEditInputs());
popupEditCloseBtn.addEventListener('click', () => closePopup(popupEditProfile));
profileForm.addEventListener('submit', submitProfileForm);

popupAddCardBtn.addEventListener('click', () => openPopup(popupAddCard));
popupAddCloseBtn.addEventListener('click', () => closePopup(popupAddCard));
popupImageCloseBtn.addEventListener('click', () => closePopup(popupImage));


/* создание карточки*/
function createCard(item) {
    const card = new Card(item, "#card-template", openPopup);
    const cardElement = card.generateCard();
    return cardElement;
}

/* добалвение массива карточек*/

function addCard(item) {
    const listedCard = createCard(item);
    cardsList.prepend(listedCard);
}

initialCards.forEach(addCard);


function disableSubmit(formElement) {

    const submitBtn = formElement.querySelector('.popup__submit')

    submitBtn.classList.add('popup__submit_disabled');

    submitBtn.disabled = 'disabled';

}

/*Добавление новой карточки*/

function formAddCardSubmit(evt) {
    evt.preventDefault()
    addCard({ name: nameCardInput.value, link: linkCardInput.value });
    evt.currentTarget.reset();
    closePopup(popupAddCard)
}
formCardElement.addEventListener('submit', formAddCardSubmit);

//Закрытие по esc
const escapeHandle = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

// Закрытие по overlay
const overlayHandle = (evt) => {
    if (evt.target.classList.contains("popup")) {
        closePopup(evt.target);
    }
};