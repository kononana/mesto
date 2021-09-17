const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = popup.querySelector('.popup__close');

function popupToggle() {
    popup.classList.toggle('popup__opened')

}
popupOpenBtn.addEventListener('click', popupToggle);
popupCloseBtn.addEventListener('click', popupToggle);