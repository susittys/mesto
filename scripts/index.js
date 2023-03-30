import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {elementsContainer, openPopup, closePopup, checkNoPlaces} from './utils/utils.js';

// эл-ты Набора карточек
const popupsList        = document.querySelectorAll('.popup');

// эл-ты блока Профиль
const buttonEditProfile = document.querySelector('.profile__edit'),
      buttonAddPlace    = document.querySelector('.profile__add'),
      nameProfile = document.querySelector('.profile__name'),
      jobProfile  = document.querySelector('.profile__job');

// эл-ты попап-окна Редактирования Профиля
const popupEditProfile = document.querySelector('.popup_type_profile'),
      formEditProfile  = popupEditProfile.querySelector('.popup__form'),
      nameEditProfile  = popupEditProfile.querySelector('.popup__input_type_name'),
      jobEditProfile   = popupEditProfile.querySelector('.popup__input_type_job');

// эл-ты попап-окна Добавление места
const popupAddPlace = document.querySelector('.popup_type_place'),
      formAddPlace  = popupAddPlace.querySelector('.popup__form'),
      titleAddPlace = popupAddPlace.querySelector('.popup__input_type_title'),
      linkAddPlace  = popupAddPlace.querySelector('.popup__input_type_link');

// объект настроек с селекторами и классами формы для валидацию полей
const options = {
    inputSelector: '.popup__input',                    // поля ввода форм
    fieldsetSelector: '.popup__fieldset',             // наборы полей ввода форм
    inputErrorSelector: '.popup__error',             // строка информирующая об неудачной валидации полей ввода форм
    submitButtonSelector: '.popup__submit',         // кнопки отправки форм
    inactiveButtonClass: 'popup__submit_disabled', // стили кнопки отправки при неудачной валидации полей ввода форм
    inputErrorClass: 'popup__input_type_error',   // стили полей ввода формы при неудачной валидации полей ввода форм
    errorClass: 'popup__error_visible'           // стили строки с ошибкой, делающий её видимой под полями ввода форм
}

const FormAddPlace = new FormValidator(options, formAddPlace);
const FormEditProfile = new FormValidator(options, formEditProfile);


    //########################//
   // Инициализация страницы //
  //########################//

// Запуск валидации с классами форм
FormAddPlace.enableValidation();
FormEditProfile.enableValidation();


// при инициализации страницы
initialCards.forEach(renderPlaces);

// обр-ик клика по Попап (всем Попап дан атрибут tabindex="-1" – только программная фокусировка)
Array.from( popupsList ).forEach( popup => {

    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
});


    //####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// обработчик клика кнопки Редактирования Профиля
buttonEditProfile.addEventListener('click', function () {
    FormEditProfile.resetForm();

    nameEditProfile.value = nameProfile.textContent;
    jobEditProfile.value  = jobProfile.textContent;

    openPopup( popupEditProfile );
});

// обр-ик клика кн-ки "Сохранить"
formEditProfile.addEventListener('submit', submitEditProfile);

// Фн-ия сохранения данных полей формы
function submitEditProfile(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    nameProfile.textContent = nameEditProfile.value;
    jobProfile.textContent  = jobEditProfile.value;

    closePopup(popupEditProfile);
}


    //##############################//
   // Попап-окно: Добавление места //
  //##############################//

// обработчик клика кнопки Добавление места
buttonAddPlace.addEventListener('click', function () {
    FormAddPlace.resetForm();
    openPopup( popupAddPlace );
});

// обр-ик клика кн-ки "Создать"
formAddPlace.addEventListener('submit', submitAddPlace);

// Фн-ия добавления новой карточки
function submitAddPlace(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    const infoPlace = {};
          infoPlace['name'] = titleAddPlace.value;
          infoPlace['link'] = linkAddPlace.value;

    renderPlaces( infoPlace );

    closePopup(popupAddPlace);
}

function renderPlaces(placeData) {

    const placesCard = new Card( placeData, '#place-template').getCard();

    elementsContainer.prepend(placesCard);

    // если картинка добавлена, убрать "Нет добавленных.."
    checkNoPlaces();
}