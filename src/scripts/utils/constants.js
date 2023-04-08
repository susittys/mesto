// эл-ты Набора карточек
import FormValidator from "../classes/FormValidator.js";

const elementsNoPlaces = document.querySelector('.elements__no-places');
const elementsContainer = document.querySelector('.elements__collection');

// эл-ты блока Профиль
const buttonEditProfile = document.querySelector('.profile__edit'),
    buttonAddPlace    = document.querySelector('.profile__add');

// эл-ты попап-окна Добавление места
const popupElementAddPlace = document.querySelector('.popup_type_place'),
    formElementPlace  = popupElementAddPlace.querySelector('.popup__form');

// эл-ты попап-окна Редактирования Профиля
const popupElelemntEditProfile = document.querySelector('.popup_type_profile'),
    formElementEditProfile  = popupElelemntEditProfile.querySelector('.popup__form'),
    nameEditProfile = popupElelemntEditProfile.querySelector('.popup__input_type_name'),
    jobEditProfile = popupElelemntEditProfile.querySelector('.popup__input_type_job');

const containerFullImage = document.querySelector('.popup_type_image'),
    titleFullImage = containerFullImage.querySelector('.popup__subtitle-image'),
    imageFullImage = containerFullImage.querySelector('.popup__full-image');

// объект настроек с селекторами и классами формы для валидацию полей
const options = {
    inputSelector: '.popup__input',                    // поля ввода форм
    fieldsetSelector: '.popup__fieldset',             // наборы полей ввода форм
    inputErrorSelector: '.popup__error',             // строка информирующая об неудачной валидации полей ввода форм
    submitButtonSelector: '.popup__submit',         // кнопки отправки форм
    inactiveButtonClass: 'popup__submit_disabled', // стили кнопки отправки при неудачной валидации полей ввода форм
    inputErrorClass: 'popup__input_type_error',   // стили полей ввода формы при неудачной валидации полей ввода форм
    errorClass: 'popup__error_visible'           // стили строки с ошибкой, делающий её видимой под полями ввода форм
};

// формы попупсов с валидацией
const formAddPlace  = new FormValidator(options, formElementPlace),
    formEditProfile = new FormValidator(options, formElementEditProfile);

export {
    elementsContainer,
    elementsNoPlaces,

    buttonAddPlace,
    buttonEditProfile,

    formAddPlace,
    formEditProfile,

    nameEditProfile,
    jobEditProfile,

    titleFullImage,
    imageFullImage
}