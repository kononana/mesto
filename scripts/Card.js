export default class Card {
    constructor(data, cardSelector, openFullScreenImage) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._openFullScreenImage = openFullScreenImage;

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
        this._setEventListeners();

        return this._cardTemplate;
    }

    /* */
    _likeCard() {
        this._cardTemplate.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }
    _deleteCard() {
        this._cardTemplate.remove();
    }

    _setEventListeners() {
        this._cardTemplate.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCard();
        })
        this._cardTemplate.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        })

        this._elementImage.addEventListener('click', () => {
            this._openFullScreenImage(this._link, this._name);
        })
    }
}