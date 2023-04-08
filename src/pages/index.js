import '../pages/index.css';
import initialCards from '../scripts/utils/cards.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import {
    formAddPlace,
    formEditProfile,

    nameEditProfile,
    jobEditProfile,

    buttonAddPlace,
    buttonEditProfile
} from '../scripts/utils/constants.js';

import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";


    //########################//
   // Инициализация страницы //
  //########################//

// загрузка готовых карточек
const defaultPlaceList = new Section({
    items: initialCards,
    renderer: cardData => {
        const placesCard = new Card( cardData, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard)
    }
}, '.elements__collection');

// рендер загруженных готовых карточек
defaultPlaceList.renderItems();

// блок профиля страницы
const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob:  '.profile__job'
});

    //##############################//
   // Попап-окно: Добавление места //
  //##############################//

// обработчик клика кнопки Добавление места
buttonAddPlace.addEventListener('click', function () {
    popupAddPlace.open();
});

// настройка формы и её обработчика submit формы Новое Место
const popupAddPlace = new PopupWithForm( {
    handleSubmit: evt => {
        evt.preventDefault();

        const dataPlace = popupAddPlace._getInputValues();

        const placesCard = new Card( dataPlace, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard);

        popupAddPlace.close();
    }
}, '.popup_type_place');



    //####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// обработчик клика кнопки Редактирования Профиля
buttonEditProfile.addEventListener('click', function () {
    const dataUser = userInfo.getUserInfo();

    nameEditProfile.value = dataUser.name;
    jobEditProfile.value  = dataUser.job;

    popupEditProfile.open()
});

// настройка формы и её обработчика submit формы Новое Место
const popupEditProfile = new PopupWithForm( {
    handleSubmit: evt => {
        evt.preventDefault();

        const dataProfile = popupEditProfile._getInputValues();

        userInfo.setUserInfo({
            name: dataProfile.name,
            job:  dataProfile.job
        });

        popupEditProfile.close();
    }
}, '.popup_type_profile')



// Запуск валидации с классами форм
formAddPlace.enableValidation();
formEditProfile.enableValidation();