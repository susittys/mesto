import '../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator";
import { checkNoPlaces } from '../utils/utils.js';
import { options, elementAvatar, formElementAvatar, linkInputAvatar, formElementPlace, formElementEditProfile, nameEditProfile, jobEditProfile } from '../utils/constants.js';

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


// для возможности добавлять body в ручную к запросу
const headers = {
    authorization: '505c032c-e3a0-424b-8a9a-2aeedcf63dbc',
    'Content-Type': 'application/json'
}

// соединение с апи-сервера
const api = new Api();


    /* настройка форм их кнопок submit */

// Обновить аватар
const popupEditAvatar = new PopupWithForm( {
    handleSubmit: ({ avatar }) => {

        popupEditAvatar.showLoading('Обновление..');

        api.updateAvatar({
            data: {
                link: 'https://mesto.nomoreparties.co/v1/cohort-63/users/me/avatar',
                callback: ({ avatar }) => {
                    elementAvatar.src = avatar;

                    popupEditAvatar.close();

                    popupEditAvatar.showLoading('Обновить');
                }
            },
            config: {
                headers,
                method: 'PATCH',
                body: JSON.stringify({avatar})
            }
        })
    }
}, '.popup_type_avatar');

// Новое Место
const popupAddPlace = new PopupWithForm( {
    handleSubmit: ({ name, link }) => {

        popupAddPlace.showLoading('Создание..');

        api.addUserCard({
            data: {
                link: 'https://mesto.nomoreparties.co/v1/cohort-63/cards',
                callback: ( dataCard ) => {
                    defaultPlaceList.renderItems([ dataCard ] );

                    popupAddPlace.close();

                    popupAddPlace.showLoading('Создать')
                }
            },
            config: {
                headers,
                method: 'POST',
                body: JSON.stringify({ name, link })
            }
        })
    }
}, '.popup_type_place');

// Редактировать инфу о пользователе
const popupEditProfile = new PopupWithForm( {

    handleSubmit: ({ name, job }) => {

        popupEditProfile.showLoading('Сохранение..');

        api.editUserProfile({
            data: {
                link: 'https://mesto.nomoreparties.co/v1/cohort-63/users/me',
                callback: ({ name, about}) => {
                    userInfo.setUserInfo({
                        name: name,
                        job:  about
                    })

                    popupEditProfile.close();

                    popupEditProfile.showLoading('Сохранить')
                }
            },
            config: {
                headers,
                method: 'PATCH',
                body: JSON.stringify({
                    name: name,
                    about: job
                })
            }
        })
    }
}, '.popup_type_profile');

// Фулл-изображение из коллекции карточек
const popupWithImage = new PopupWithImage('.popup_type_image');

// Подтверждение удаления
const popupRemoveCard = new PopupWithConfirm({
    handleSubmit: function() {

        popupRemoveCard.showLoading('Удаление..');

        api.removeUserCard({
            data: {
                link: `https://mesto.nomoreparties.co/v1/cohort-63/cards/${this.idCard}`,
                callback: () => {
                    popupRemoveCard.showLoading('Удалить');

                    this.cardElement.remove();
                    checkNoPlaces();
                    popupRemoveCard.close();
                }
            },
            config: {
                headers,
                method: 'DELETE',
            }
        })
    }
}, '.popup_type_confirm');


    /* Инициализация страницы */

// рендер информации о пользователе
api.getUserInfo({
    data: {
        link: 'https://mesto.nomoreparties.co/v1/cohort-63/users/me',
        callback: ({name, about, avatar, _id}) => {
            userInfo.setUserInfo({
                name: name,
                job: about,
                id: _id
            });

            userInfo.changeAvatar(avatar)
        }
    },
    config: {
        headers,
        method: 'GET'
    }
})

// рендер загруженных готовых карточек
api.getInitCards({
    data: {
        link: 'https://mesto.nomoreparties.co/v1/cohort-63/cards',
        callback: (initCards) => defaultPlaceList.renderItems(initCards)
    },
    config: {
        headers,
        method: 'GET'
    }
})

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
                    data: {
                        link: `https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardData._id}/likes`,
                        callback: dataCard => {
                            this._toggleUserLike( dataCard.likes );
                            this._updateLikeCounter( dataCard.likes )
                        }
                    },
                    config: {
                        headers,
                        method: 'PUT'
                    }
                })
            },
            handleDislike: function() {
                api.setLikeStatus({
                    data: {
                        link: `https://mesto.nomoreparties.co/v1/cohort-63/cards/${cardData._id}/likes`,
                        callback: dataCard => {
                            this._toggleUserLike( dataCard.likes );
                            this._updateLikeCounter( dataCard.likes )
                        }
                    },
                    config: {
                        headers,
                        method: 'DELETE',
                    }
                })
            },
            handleRemoveClick: function () {

                popupRemoveCard.setElement(this._placeElement);
                popupRemoveCard.idCard = cardData._id;
                popupRemoveCard.open()
            }
        }, '#place-template').getCard();

        defaultPlaceList.addItem(placesCard)
    }
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

        nameEditProfile.value = dataUser.name;
        jobEditProfile.value  = dataUser.job;

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