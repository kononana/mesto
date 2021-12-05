export default class Card {
    constructor({ name, link }, cardSelector, openPopup) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._openPopup = openPopup;

    }
    _getTamplate() {
        const cardTemplate = document.querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true)

        return cardTemplate;
    }

    generateCard() {
        this._cardTemplate = this._getTamplate();
        this._elementName = this._cardTemplate.querySelector('.element__title');
        this._elementImage = this._cardTemplate.querySelector('.element__image')
        this._elementName.textContent = this._name;
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._likebutton = this._cardTemplate.querySelector('.element__like-button')
        this._deleteButton = this._cardTemplate.querySelector('.element__delete-button')
        this._setEventListeners();
        return this._cardTemplate;
    }

    _likeCard() {
        this._likebutton.classList.toggle('element__like-button_active');
    }
    _deleteCard() {
        this._cardTemplate.remove();
    }

    _openFullImage() {
        this._popupImage = document.querySelector('.popup_show_image');
        this._popupImage.querySelector('.popup__image').src = this._link
        this._popupImage.querySelector('.popup__image').alt = this._name
        this._popupImage.querySelector('.popup__image-title').textContent = this._name
        this._openPopup(this._popupImage)
    }


    _setEventListeners() {
        this._cardTemplate.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCard();
        })
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        })

        this._elementImage.addEventListener('click', () => {
            this._openFullImage();
        })
    }
}