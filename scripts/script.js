/* массив с карточками */
const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Новокузнецк',
        link: './images/Верхоянск.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },

    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },

    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
/*Объявление переменных*/
const popupEditProfile = document.querySelector('.popup_edit-profile')
const popupEditCloseBtn = popupEditProfile.querySelector('.popup__close');
const profileForm = popupEditProfile.querySelector('.popup__edit-form');
const nameInput = popupEditProfile.querySelector('.popup__item_field_name');
const jobInput = popupEditProfile.querySelector('.popup__item_field_job');
/**/

const popupOpenBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-occupation');
/**/
const popupAddCard = document.querySelector('.popup_add-card')
const popupAddCloseBtn = popupAddCard.querySelector('.popup__close');
const formCardElement = popupAddCard.querySelector('.popup__add-form');
const nameCardInput = popupAddCard.querySelector('.popup__item_field_card-name');
const linkCardInput = popupAddCard.querySelector('.popup__item_field_card-link');
const popupAddCardBtn = document.querySelector('.profile__add-button');
/**/
const cardsList = document.querySelector('.elements__list');
const popupImage = document.querySelector('.popup_show_image');
const popupImageCloseBtn = popupImage.querySelector('.popup__close');

/*Отрытие попапа*/
function openPopup(window) {
    window.classList.add('popup_opened');
}
/*Закрытие попапа*/
function closePopup(window) {
    window.classList.remove('popup_opened');
}
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

/* создание карточки, лайки, удаление, раскрытие полноразмерной картинки*/

const createCard = function(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__title').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = item.name;

    cardElement.querySelector('.element__like-button').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like-button_active');
    });

    cardElement.querySelector('.element__delete-button').addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    });

    cardElement.querySelector('.element__image').addEventListener('click', function(evt) {
        openPopup(popupImage);
        popupImage.querySelector('.popup__image').src = evt.target.src;
        popupImage.querySelector('.popup__image').alt = item.name;
        popupImage.querySelector('.popup__image-title').textContent = item.name;

    });

    return cardElement
}

/* добалвение массива карточек*/

function addCard(card) {
    listedCard = card.map(createCard);
    cardsList.prepend(...listedCard);
}

addCard(initialCards);

/*Добавление новой карточки*/

function formAddCardSubmit(evt) {
    evt.preventDefault()
    const newItem = createCard({ name: nameCardInput.value, link: linkCardInput.value });
    cardsList.prepend(newItem);
    nameCardInput.value = '';
    linkCardInput.value = '';
    closePopup(popupAddCard)
}

formCardElement.addEventListener('submit', formAddCardSubmit);