import '../pages/index.css';
import initialCards from '../utils/cards.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { options, formElementPlace, formElementEditProfile, nameEditProfile, jobEditProfile } from '../utils/constants.js';
import FormValidator from "../components/FormValidator";
import PopupWithImage from "../components/PopupWithImage.js";


// формы попупсов с валидацией
const formAddPlace  = new FormValidator(options, formElementPlace),
    formEditProfile = new FormValidator(options, formElementEditProfile);

// Запуск валидации с классами форм
formAddPlace.enableValidation();
formEditProfile.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();


    //########################//
   // Инициализация страницы //
  //########################//

// загрузка готовых карточек
const defaultPlaceList = new Section({
    renderer: cardData => {
        const placesCard = new Card({
            data: cardData,
            handleCardClick: () => {
                popupWithImage.open({
                    title: cardData.title,
                    link:  cardData.link
                })
            }
        }, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard)
    }
}, '.elements__collection');

// рендер загруженных готовых карточек
defaultPlaceList.renderItems(initialCards);


// блок профиля страницы
const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob:  '.profile__job'
});


    //##############################//
   // Попап-окно: Добавление места //
  //##############################//

// настройка формы и её обработчика submit формы Новое Место
const popupAddPlace = new PopupWithForm( {
    handleSubmit: data => {
        const placesCard = new Card({
            data,
            handleCardClick: () => {
                popupWithImage.open({
                    title: data.title,
                    link:  data.link
                })
            }
        }, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard);

        popupAddPlace.close();
    }
}, '.popup_type_place');

popupAddPlace.setEventListeners();

const addPlaceButton = {
    element: document.querySelector('.profile__add'),
    // Фн-ия открытия попупа Новое Место
    click: function () {
        formAddPlace.resetForm();
        popupAddPlace.open()
    }
};

// обработчик клика кнопки Добавление места
addPlaceButton.element.addEventListener('click', addPlaceButton.click);


    //####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// настройка формы и её обработчика submit формы Редактировать пользователя
const popupEditProfile = new PopupWithForm( {
    handleSubmit: data => {

        userInfo.setUserInfo({
            name: data.name,
            job:  data.job
        });

        popupEditProfile.close();
    }
}, '.popup_type_profile');

popupEditProfile.setEventListeners();

const editProfileButton = {
    element: document.querySelector('.profile__edit'),
    // Фн-ия открытия попупа Редактирования Профиля
    click: function () {

        formEditProfile.resetForm();

        const dataUser = userInfo.getUserInfo();

        nameEditProfile.value = dataUser.name;
        jobEditProfile.value  = dataUser.job;

        popupEditProfile.open()
    }
};

// обработчик клика кнопки Редактирования Профиля
editProfileButton.element.addEventListener('click', editProfileButton.click );