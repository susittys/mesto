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

const listCloseButtons = document.querySelectorAll('.popup__close');

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
    // titleAddPlace.value = '';
    // linkAddPlace.value  = '';
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

// обр-ик клика кнопки X (закрытия) и клика по Попап (всем Попап дан атрибут tabindex=0)
// при открытии формы фокус передаётся на вызываемый Попап, где каждой кнопке X..
listCloseButtons.forEach(btn => {
    // ..определяется родительский popup,
    const popup = btn.closest('.popup');

    // Попап слушает нажатия клавиш и кликов по себе
    ['keydown','click'].forEach( act => {
        // исполняется триггер ф-ия actionHandler для каждого действия

        popup.addEventListener(act, actionHandler);
    });

    // каждая кнопка X ожидает "клик" и выполняет ф-ию закрытия Попап
    btn.addEventListener('click', () => closePopup(popup));
});


// Фн-ия для триггеров, назначенных для кнопок закрытия (X) и Попап
function actionHandler(evt) {
    evt.stopPropagation(); // остановка пузырькового распространения события click на input'ы
    // опр-ся элемент формы, по которому произошёл клик
    let elementPopup = evt.target;

    // если была нажата клавиша "Esc"
    if ( evt.key === 'Escape' ) {
        // при этом не обнаружен Попап окно, который нужно закрыть
        if ( !elementPopup.classList.contains('popup') ) {
            // находится ближайший родительский Попап
            elementPopup = elementPopup.closest('.popup')
        }
        // передаётся ф-ии на закрытие найденного Попап
        closePopup(elementPopup);
    // иначе, если был сделан клик только вне форме
    } else if (evt.type === 'click') {
        // Попап будет закрыт
        closePopup(elementPopup);
    }
}


// Фн-ия открытия Попап
function openPopup(elementForm) {
    elementForm.classList.add("popup_opened");
    // из-за анимировании св-ва visable Попап окон, требуется устанавливать отсрочку фокуса равное времени анимации
    setTimeout( ()=> elementForm.focus(), 300);
}

// Фн-ия закрытия Попап
function closePopup(elementPopup) {
    const elementForm = elementPopup.querySelector('.popup__form');
    elementPopup.classList.remove("popup_opened");
    resetForm( elementForm );
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
              errorList = elementForm.querySelectorAll('.popup__error');

        inputList.forEach( elementInput => {
            elementInput.classList.remove('popup__input_type_error');
        });

        errorList.forEach( elementError => {
            elementError.classList.remove('popup__error_visible');
        });
    }
}