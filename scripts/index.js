// эл-ты Набора карточек
const elementsContainer = document.querySelector('.elements__collection'),
      elementsNoPlaces  = document.querySelector('.elements__no-places');

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

const buttonCloseList = document.querySelectorAll('.popup__close');

const placeTemplate = document.querySelector('#place-template').content;


//####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// обработчик клика кнопки Редактирования Профиля
buttonEditProfile.addEventListener('click', function () {
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
    jobProfile.textContent  =  jobEditProfile.value;

    closePopup(popupEditProfile);
}

    //##############################//
   // Попап-окно: Добавление места //
  //##############################//

// обработчик клика кнопки Добавление места
buttonAddPlace.addEventListener('click', function () {
    titleAddPlace.value = '';
    linkAddPlace.value  = '';
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

// обр-ик клика кнопки X (закрытия)

buttonCloseList.forEach(btn => {
    const popup = btn.closest('.popup');
    btn.addEventListener('click', () => closePopup(popup));
})

// Фн-ия открытия Попап
function openPopup(elementForm) {
    elementForm.classList.add("popup_opened")
}

// Фн-ия закрытия Попап
function closePopup(elementForm) {
    elementForm.classList.remove("popup_opened")
}

//если нет places(карточек), то показать текст "нет добавленных.."
function checkNoPlaces() {
    const listItems = [...elementsContainer.querySelectorAll("li")];
    if ( !listItems || !listItems.length ) elementsNoPlaces.removeAttribute('hidden')
    else if ( listItems.length ) elementsNoPlaces.setAttribute('hidden',"true");
}