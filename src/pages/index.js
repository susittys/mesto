import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from "../components/UserInfo.js";

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

import FormValidator from "../components/FormValidator";

import imageForError from '../images/image_no-places.jpg';
import imageForLoad  from '../images/image_loading.gif';

import { checkNoPlaces } from '../utils/utils.js';
import { options, elementAvatar, formElementAvatar, linkInputAvatar, formElementPlace, formElementEditProfile, titleFullImage, imageFullImage } from '../utils/constants.js';

// формы попупсов с валидацией
const formAddPlace  = new FormValidator(options, formElementPlace),
      formEditAvatar  = new FormValidator(options, formElementAvatar),
      formEditProfile = new FormValidator(options, formElementEditProfile);

// Запуск валидации с классами форм
formAddPlace.enableValidation();
formEditAvatar.enableValidation();
formEditProfile.enableValidation();

// блок профиля страницы
const userInfo = new UserInfo({
    selectorName: '.profile__name',
    selectorJob:  '.profile__job',
    selectorAva:  '.profile__ava'
});


// соединение с апи-сервера
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
        authorization: '505c032c-e3a0-424b-8a9a-2aeedcf63dbc',
        'Content-Type': 'application/json'
    }
});


    /* настройка форм их кнопок submit */

// Обновить аватар
const popupEditAvatar = new PopupWithForm( {
    handleSubmit: ({ avatar }) => {

        return api.updateAvatar({ avatar },'/users/me/avatar')
            .then( ({ avatar }) => userInfo.changeAvatar(avatar) )
            .catch( error => console.log(`Ошибка при обновлении аватарки: ${error}`) )
    }
}, '.popup_type_avatar');

// Новое Место
const popupAddPlace = new PopupWithForm( {
    handleSubmit: (data) => {

        return api.addUserCard(data,'/cards')
            .then( dataCard => {
                defaultPlaceList.renderItems([ dataCard ] );
            })
            .catch( error => console.log(`Ошибка при добавлении новой карточки: ${error}`) )
    }
}, '.popup_type_place');

// Редактировать инфу о пользователе
const popupEditProfile = new PopupWithForm( {
    handleSubmit: (data) => {

        return api.editUserProfile(data,'/users/me')
            .then( ({ name, about }) => {
                userInfo.setUserInfo({
                    name: name,
                    job:  about
                })
            })
            .catch( error => console.log(`Ошибка при редактировании профиля: ${error}`) )
    }
}, '.popup_type_profile');


// Фулл-изображение из коллекции карточек
const popupWithImage = new PopupWithImage({ imageForLoad, imageForError, titleFullImage, imageFullImage }, '.popup_type_image');

// Подтверждение удаления
const popupRemoveCard = new PopupWithConfirm({
    handleSubmit: function() {

        return api.removeUserCard(`/cards/${this.idCard}`)
            .then( () => {
                this.cardElement.remove();
                checkNoPlaces();
            })
            .catch( error => console.log(`Ошибка при удалении  карточки: ${error}`) )
    }
}, '.popup_type_confirm');


    /* Инициализация страницы */

Promise.all([
    // рендер информации о пользователе
    api.getUserInfo('/users/me'),
    // рендер загруженных готовых карточек
    api.getInitCards('/cards')
])
    // тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
    .then(([{ name, about, avatar, _id }, initCards]) => {
        // тут установка данных пользователя
        userInfo.setUserInfo({
            name: name,
            job: about,
            id: _id
        });

        userInfo.changeAvatar(avatar)

        // и тут отрисовка карточек
        defaultPlaceList.renderItems(initCards)
    })
    .catch( error => console.log(`Ошибка при инициализации страницы: ${error}`) )


// класс создания и рендера карточек
const defaultPlaceList = new Section({
    renderer: cardData => {
        const placesCard = new Card({
            data: cardData,

            checkUserLikes: function(likes) {
                const idUser = userInfo.getUserInfo().id;
                const findUserLike = likes.filter( ({ _id }) => _id == idUser);
                this._userLike = !!findUserLike.length;
            },

            checkUserOwner: function() {
                const idUser = userInfo.getUserInfo().id;
                const userOnwer = cardData.owner._id == idUser;
                this._userOwner = !!userOnwer;
            },

            handleCardClick: () => {
                popupWithImage.open({
                    title: cardData.name,
                    link:  cardData.link
                })
            },

            handleLike: function() {
                api.setLikeStatus({
                    link: `/cards/${ cardData._id }/likes`,
                    method: 'PUT'
                })
                    .then( (dataCard) => {
                        this._toggleUserLike( dataCard.likes );
                        this._updateLikeCounter( dataCard.likes )
                    })
                    .catch( error => console.log(`Ошибка при установке на карточку лайка: ${error}`) )
            },
            handleDislike: function() {
                api.setLikeStatus({
                    link: `/cards/${ cardData._id }/likes`,
                    method: 'DELETE'
                })
                    .then( (dataCard) => {
                        this._toggleUserLike( dataCard.likes );
                        this._updateLikeCounter( dataCard.likes )
                    })
                    .catch( error => console.log(`Ошибка при снятии с карточки лайка: ${error}`) )
            },
            handleRemoveClick: function () {

                popupRemoveCard.setElement(this._placeElement);
                popupRemoveCard.idCard = cardData._id;
                popupRemoveCard.open()
            },

            imageForError
        }, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard)
    },

    checkNoPlaces
}, '.elements__collection');


const editAvatarButton = {
    element: document.querySelector('.profile__avatar-group'),
    // Фн-ия открытия попупа Новое Место
    click: function () {
        formEditAvatar.resetForm();
        linkInputAvatar.value = elementAvatar.src;
        popupEditAvatar.open()
    }
};

const addPlaceButton = {
    element: document.querySelector('.profile__add'),
    // Фн-ия открытия попупа Новое Место
    click: function () {
        formAddPlace.resetForm();
        popupAddPlace.open()
    }
};

const editProfileButton = {
    element: document.querySelector('.profile__edit'),
    // Фн-ия открытия попупа Редактирования Профиля
    click: function () {

        formEditProfile.resetForm();

        const dataUser = userInfo.getUserInfo();

        popupEditProfile.setInputValues(dataUser);

        popupEditProfile.open()
    }
};


// обработчик клика кнопки смены Аватара
editAvatarButton.element.addEventListener('click', editAvatarButton.click);

// обработчик клика кнопки Добавление места
addPlaceButton.element.addEventListener('click', addPlaceButton.click);

// обработчик клика кнопки Редактирования Профиля
editProfileButton.element.addEventListener('click', editProfileButton.click );

popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();
popupWithImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupRemoveCard.setEventListeners();