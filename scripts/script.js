/*редактировать профиль*/
let popupEditProfile = document.querySelector('.popup_edit-profile')
let popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
let formElement = popupEditProfile.querySelector('.popup__edit-form');
let nameInput = popupEditProfile.querySelector('.popup__item_field_name');
let jobInput = popupEditProfile.querySelector('.popup__item_field_job');

let popupOpenBtn = document.querySelector('.profile__edit-button');
let profile_name = document.querySelector('.profile__info-name')
let profile_job = document.querySelector('.profile__info-occupation')

function popupToggle() {
    popupEditProfile.classList.toggle('popup_opened');
    if (popupEditProfile.classList.contains('popup_opened')) {
        nameInput.value = profile_name.textContent
        jobInput.value = profile_job.textContent
    }
}

function formSubmitHandler(evt) {
    evt.preventDefault()
    profile_name.textContent = nameInput.value
    profile_job.textContent = jobInput.value
    popupToggle()
}

popupOpenBtn.addEventListener('click', popupToggle);
popupEditCloseBtn.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

/* Добавление карточек и показ полноразмерной картинки*/

let popupAddCard = document.querySelector('.popup_add-card')
let popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
let formCardElement = popupAddCard.querySelector('.popup__add-form');
let nameCardInput = popupAddCard.querySelector('.popup__item_field_card-name');
let linkCardInput = popupAddCard.querySelector('.popup__item_field_card-link');
let popupAddCardBtn = document.querySelector('.profile__add-button');


function popupCardToggle() {
    popupAddCard.classList.toggle('popup_opened');
}

popupAddCardBtn.addEventListener('click', popupCardToggle);
popupAddCloseBtn.addEventListener('click', popupCardToggle);

/* массив с карточками */
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Новокузнецк',
        link: './images/Верхоянск.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image')
const popupImageCloseBtn = popupImage.querySelector('.popup__close');

function popupImageToggle() {
    popupImage.classList.toggle('popup_opened');
}

popupImageCloseBtn.addEventListener('click', popupImageToggle);

/*Добаление массива с карточками, лайки, удаление, раскрытие полноразмерной картинки*/

const addCard = function(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
        evt.target.parentElement.remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
        popupImageToggle();
        popupImage.querySelector('.popup__image').src = evt.target.src;
        popupImage.querySelector('.popup__image-title').textContent = item.name;
    });

    cardsList.prepend(cardElement);
}

initialCards.forEach(addCard);


/*Добавление новой карточки*/

function formAddCardSubmitHandler(evt) {
    evt.preventDefault()
    const newItem = { name: nameCardInput.value, link: linkCardInput.value }
    addCard(newItem)
    nameCardInput.value = '';
    linkCardInput.value = '';
    popupCardToggle()
}

formCardElement.addEventListener('submit', formAddCardSubmitHandler);