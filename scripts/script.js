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