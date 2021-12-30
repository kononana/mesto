export default class Card {
  constructor({data, userId, handleCardClick, handleLikeClick, handleCardDelete, handleLikeDelete}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeDelete = handleLikeDelete
    this._userId = userId;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
  }

  _getTemplate() { 
    const cardElement = document
      .querySelector(this._cardSelector) 
      .content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._elementName = this._element.querySelector('.element__title');
      this._elementImage = this._element.querySelector('.element__image');
      this._elementLike = this._element.querySelector('.element__like-button');
      this._eltmentDelete = this._element.querySelector('.element__delete-button');
      this._elementLikeCounter = this._element.querySelector('.element__like-counter');

      this._elementName.textContent = this._name; 
      this._elementImage.src = this._link; 
      this._elementImage.alt = this._name; 
      this._elementLikeCounter.textContent = this._likes.length; 
      this._checkForDeleteCard(); 
      this._сheckForLike(); 
      this._setEventListener(); 
      return this._element;
    }
    _setEventListener() {
     
      this._eltmentDelete.addEventListener("click", () => {
        this._handleCardDelete(this._cardId);
      });
     
      this._elementLike.addEventListener("click", () => {
        this._setLike();
      });
      
      this._elementImage.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link); 
      });
    }
// отображать ли кнопку удаления карточки 
    _checkForDeleteCard(){ 
      if (this._ownerId !== this._userId) { 
        this._eltmentDelete.classList.add("element__delete_hidden")
      } else {
        this._eltmentDelete.classList.remove("element__delete_hidden")
      }
    } 

    deliteCard = () => {
      this._element.remove();
}

 //  удаление, добавление лайков к карточке
    _isLiked() {
      return this._likes.some((like) => like._id === this._userId);
    }

    _сheckForLike() {
      if (this._isLiked()) {
        this._elementLike.classList.add("element__like-button_active")
      } else {
        this._elementLike.classList.remove("element__like-button_active");
      }
    }

   like = (response) => {
      this._likes = response.likes;
      this._elementLikeCounter.textContent = this._likes.length;
      this._elementLike.classList.toggle("element__like-button_active");
    };
    

    _setLike = () => {
      if (this._isLiked()) {
        this._handleLikeDelete(this._cardId);
      } else {
        this._handleLikeClick(this._cardId);
      }
    };
   
}

