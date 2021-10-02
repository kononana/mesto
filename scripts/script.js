let popupEditProfile = document.querySelector('.popup__edit-profile')

let popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
let formElement = popupEditProfile.querySelector('.popup__edit-form');
let nameInput = popupEditProfile.querySelector('.popup__item_field_name');
let jobInput = popupEditProfile.querySelector('.popup__item_field_job');

/**/
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

/**/
let popupAddCard = document.querySelector('.popup__add-card')

let popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
let formCardElement = popupAddCard.querySelector('.popup__add-form');
let nameCardInput = popupAddCard.querySelector('.popup__item_field_card-name');
let linkCardInput = popupAddCard.querySelector('.popup__item_field_card-link');
let popupAddCardBtn = document.querySelector('.profile__add-button');
/**/


function popupCardToggle() {
    popupAddCard.classList.toggle('popup_opened');
}

popupAddCardBtn.addEventListener('click', popupCardToggle);
popupAddCloseBtn.addEventListener('click', popupCardToggle);



/**/
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

/**/

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
    cardsList.append(cardElement);
}
initialCards.forEach(addCard);