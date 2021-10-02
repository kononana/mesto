let popup = document.querySelector('.popup')

let popupCloseBtn = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__item_field_name');
let jobInput = popup.querySelector('.popup__item_field_job');

/**/
let popupOpenBtn = document.querySelector('.profile__edit-button');
let profile_name = document.querySelector('.profile__info-name')
let profile_job = document.querySelector('.profile__info-occupation')


function popupToggle() {
    popup.classList.toggle('popup_opened');
    if (popup.classList.contains('popup_opened')) {
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
popupCloseBtn.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler);

/**/
let popupOpenCard = document.querySelector('.profile__add-button');
let cardNameInput = popup.querySelector('.popup__item_field_card-name');
let cardLinkInput = popup.querySelector('.popup__item_field_card-link');

function popupCardToggle() {
    popup.classList.toggle('popup_opened');
}
popupOpenCard.addEventListener('click', popupCardToggle)
popupCloseBtn.addEventListener('click', popupToggle);


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