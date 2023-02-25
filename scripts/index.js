// эл-ты Набора карточек
const elementsContainer = document.querySelector('.elements__collection'),
      elementsNoPlaces  = document.querySelector('.elements__no-places'),
      popupsList        = document.querySelectorAll('.popup');

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

const popupFullImage = document.querySelector('.popup_type_image'),
      imageFullImage = popupFullImage.querySelector('.popup__full-image'),
      titleFullImage = popupFullImage.querySelector('.popup__subtitle-image');

const listCloseButtons = document.querySelectorAll('.popup__close');

const placeTemplate = document.querySelector('#place-template').content;


    //####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// обработчик клика кнопки Редактирования Профиля
buttonEditProfile.addEventListener('click', function () {
    const comingForm = popupEditProfile.querySelector('.popup__form');
    resetForm( comingForm );

    nameEditProfile.value = nameProfile.textContent;
    jobEditProfile.value  = jobProfile.textContent;

    openPopup(popupEditProfile);
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
    const comingForm = popupAddPlace.querySelector('.popup__form');
    resetForm( comingForm );

    openPopup(popupAddPlace);
});
// обр-ик клика кн-ки "Сохранить"

// обр-ик клика кн-ки "Создать"
formAddPlace.addEventListener('submit', submitAddPlace);

// Фн-ия добавления новой карточки
function submitAddPlace(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    const infoPlace = {};
          infoPlace['name'] = titleAddPlace.value;
          infoPlace['link'] = linkAddPlace.value;

    if ( infoPlace['name'] && infoPlace['link'] ) createPlaces( infoPlace );

    closePopup(popupAddPlace);
}

function renderPlaces(placesCard) {
    elementsContainer.prepend(placesCard);

    // если картинка добавлена, убрать "Нет добавленных.."
    checkNoPlaces();
}

// в случае добавления нового, примет массив с одним объектом
function createPlaces( place = {} ) {
    const placeElement  = placeTemplate.querySelector('.elements__element').cloneNode(true),
          placeImageGrp = placeElement.querySelector('.elements__image-group');

    const buttonLikeElement = placeElement.querySelector('.elements__like'),
        buttonRemoveElement = placeElement.querySelector('.elements__remove'),
        titlePlaceElement   = placeElement.querySelector('.elements__title'),
        imagePlaceElement   = placeElement.querySelector('.elements__image');

    titlePlaceElement.textContent  = place['name'];
    imagePlaceElement.src = place['link'];
    imagePlaceElement.alt = place['name'];

    // обработчики кликов кнопок на наборе карточек с фото
    buttonLikeElement.addEventListener('click', function (likeBtn) {
        likeBtn.target.classList.toggle('elements__like_active');
    });

    buttonRemoveElement.addEventListener('click', function (removeBtn) {
        const listElement = removeBtn.target.closest('.elements__element');
        listElement.remove();
        checkNoPlaces();
    });

    placeImageGrp.addEventListener('click', () => showFullImage(place.name, place.link) );

    renderPlaces(placeElement);
}


    //##################################//
   // Попап-окно: Просмотр изображения //
  //##################################//

// Фн-ия открытия и загрузки данных в попап
function showFullImage(titleImage, linkImage) {
    imageFullImage.src = linkImage;
    imageFullImage.alt = titleImage;
    titleFullImage.textContent = titleImage;
    openPopup(popupFullImage);
}


    //###############//
   // Общие функции //
  //###############//

// при инициализации страницы
initialCards.forEach(createPlaces);

// обработчики ESC и клика по оверлэю попапов
function toggleEventListenerEscapeClose(mode) {
    if ( !mode ) {
        document.removeEventListener('keydown', closeByEscape);
    } else document.addEventListener('keydown', closeByEscape);
}

// обр-ик клика по Попап (всем Попап дан атрибут tabindex="-1" – только программная фокусировка)
Array.from( popupsList ).forEach( popup => {
    popup.addEventListener('click', closeByClick);
});

// обр-ик клика кнопки X (закрытия) и клика
listCloseButtons.forEach(btn => {
    btn.addEventListener('click', closeByClick);
});

// ф-ия закрытия попап по нажатию клавиши ESC
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

// ф-ия закрытия попап по клику на оверлэй
function closeByClick(evt) {
    if ( evt.currentTarget === evt.target ) { // проверка на клик по оверлэю
        evt.stopPropagation(); // остановка пузырькового распространения события click на input'ы
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    } else return false; // если нажат на любой элемент, кроме оверлэя, попап не будет закрыт
}

// Фн-ия открытия Попап
function openPopup(elementForm) {
    elementForm.classList.add("popup_opened");

    toggleEventListenerEscapeClose(true);
}

// Фн-ия закрытия Попап
function closePopup(elementPopup) {
    elementPopup.classList.remove("popup_opened");

    toggleEventListenerEscapeClose(false);
}

//если нет places(карточек), то показать текст "нет добавленных.."
function checkNoPlaces() {
    const listItems = [...elementsContainer.querySelectorAll("li")];
    if ( !listItems || !listItems.length ) elementsNoPlaces.removeAttribute('hidden')
    else if ( listItems.length ) elementsNoPlaces.setAttribute('hidden',"true");
}

function resetForm( elementForm ) {
    if ( elementForm ) {
        elementForm.reset();
        const inputList = elementForm.querySelectorAll('.popup__input'),
              errorList = elementForm.querySelectorAll('.popup__error'),
              buttonElement = elementForm.querySelector('.popup__submit');

        inputList.forEach( elementInput => {
            elementInput.classList.remove('popup__input_type_error');
        });

        errorList.forEach( elementError => {
            elementError.classList.remove('popup__error_visible');
        });

        buttonElement.classList.add('popup__submit_disabled');
        buttonElement.disabled = true;
    }
}