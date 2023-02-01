const initialCards = [
    {
        name: 'Воркута',
        link: './images/cities/vorkuta.jpg',
        descr: 'Город Воркута в республике Коми'
    },
    {
        name: 'Сыктывкар',
        link: './images/cities/syktyvkar.jpg',
        descr: 'Город Сыктывкар в республике Коми'
    },
    {
        name: 'Вуктыл',
        link: './images/cities/vuktyl.jpg',
        descr: 'Город Вуктыл в республике Коми'
    },
    {
        name: 'Усинск',
        link: './images/cities/usinsk.jpg',
        descr: 'Город Усинск в республике Коми'
    },
    {
        name: 'Ухта',
        link: './images/cities/ukhta.jpeg',
        descr: 'Город Ухта в республике Коми'
    },
    {
        name: 'Печора',
        link: './images/cities/pechora.jpg',
        descr: 'Город Печора в республике Коми'
    }
];

// эл-ты Набора карточек
const elementsContainer = document.querySelector('.elements__collection'),
      elementsNoPlaces  = document.querySelector('.elements__no-places');

// эл-ты блока Профиль
const editProfile = document.querySelector('.profile__edit'),
      nameProfile = document.querySelector('.profile__name'),
      jobProfile  = document.querySelector('.profile__job'),
      addPlace    = document.querySelector('.profile__add');

// эл-ты попап-окна Редактирования Профиля
const popupEditProfile = document.querySelector('.popup_type_profile'),
      nameEditProfile  = popupEditProfile.querySelector('.popup__input_type_name'),
      jobEditProfile   = popupEditProfile.querySelector('.popup__input_type_job'),
      closeEditProfile = popupEditProfile.querySelector('.popup__close_type_profile');

// эл-ты попап-окна Добавление места
const popupAddPlace = document.querySelector('.popup_type_place'),
      titleAddPlace = popupAddPlace.querySelector('.popup__input_type_title'),
      linkAddPlace  = popupAddPlace.querySelector('.popup__input_type_link'),
      closeAddPlace = popupAddPlace.querySelector('.popup__close_type_place');

const popupFullImage = document.querySelector('.popup_type_image'),
      imageFullImage = popupFullImage.querySelector('.popup__full-image'),
      titleFullImage = popupFullImage.querySelector('.popup__subtitle-image'),
      closeFullImage = popupFullImage.querySelector('.popup__close_type_image');



    //####################################//
   // Попап-окно: Редактирование профиля //
  //####################################//

// обработчик клика кнопки Редактирования Профиля
editProfile.addEventListener('click', function () {
    nameEditProfile.value = nameProfile.textContent;
    jobEditProfile.value  = jobProfile.textContent;
    togglePopup(popupEditProfile);
});

// обр-ик клика кн-ки "Сохранить"
popupEditProfile.addEventListener('submit', submitEditProfile);

// обр-ик клика кнопки X (закрытия)
closeEditProfile.addEventListener('click', function () {
    togglePopup(popupEditProfile);
});

// Фн-ия сохранения данных полей формы
function submitEditProfile(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    let nameSaved = nameEditProfile.value,
        jobSaved  = jobEditProfile.value;

    if ( nameSaved.length && jobSaved.length ) {
        nameProfile.textContent = nameSaved;
        jobProfile.textContent  = jobSaved;

        togglePopup(popupEditProfile);
    }
}

    //##############################//
   // Попап-окно: Добавление места //
  //##############################//

// обработчик клика кнопки Добавление места
addPlace.addEventListener('click', function () {
    titleAddPlace.value = '';
    linkAddPlace.value  = '';
    togglePopup(popupAddPlace);
});
// обр-ик клика кн-ки "Сохранить"

// обр-ик клика кн-ки "Создать"
popupAddPlace.addEventListener('submit', submitAddPlace);

// обр-ик клика кнопки X (закрытия)
closeAddPlace.addEventListener('click', function () {
    togglePopup(popupAddPlace);
});

// Фн-ия добавления новой карточки
function submitAddPlace(event) {
    event.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    let infoPlace = {};
        infoPlace['name']  = titleAddPlace.value;
        infoPlace['link']  = linkAddPlace.value;
        infoPlace['descr'] = 'Изображение города России';

    if ( infoPlace['name'] && infoPlace['link'] ) addPlaces( infoPlace );

    togglePopup(popupAddPlace);
}

// Фн-ия перебирает набор с городами, в случае инициализации
// в случае добавления нового, примет массив с одним объектом
function addPlaces( place = {} ) {
    if ( Object.entries(place).length ) {
        const placeTemplate = document.querySelector('#place-template').content,
              placeElement  = placeTemplate.querySelector('.elements__element').cloneNode(true),
              placeImageGrp = placeElement.querySelector('.elements__image-group');

        placeElement.querySelector('.elements__title').textContent = place['name'];
        placeElement.querySelector('.elements__image').src = place['link'];
        placeElement.querySelector('.elements__image').alt = place['descr'];

        const likeElement = placeElement.querySelector('.elements__like'),
            removeElement = placeElement.querySelector('.elements__remove');

        // обработчики кликов кнопок на наборе карточек с фото
        likeElement.addEventListener('click', function (likeBtn) {
            likeBtn.target.classList.toggle('elements__like_active');
        });

        removeElement.addEventListener('click', function (removeBtn) {
            let listElement = removeBtn.target.closest('.elements__element');
            listElement.remove();
            checkNoPlaces();
        });

        placeImageGrp.addEventListener('click', function (imageGroup) {
            const imageFather = imageGroup.target.closest('.elements__element'),
                  imageTitle  = imageFather.querySelector('.elements__title').textContent,
                  imageLink   = imageFather.querySelector('.elements__image').src;

            showFullImage(imageTitle,imageLink);
        });

        elementsContainer.prepend(placeElement);
    } else alert('Ошибка: нет названия или ссылки');

    // если картинка добавлена, убрать "Нет добавленных.."
    checkNoPlaces();
}


  //##################################//
 // Попап-окно: Просмотр изображения //
//##################################//

// обр-ик клика кнопки X (закрытия)
closeFullImage.addEventListener('click', function () {

    // при закрытии окна, обнуляется данные формы
    imageFullImage.src = 'images/image_no-places.jpg';
    imageFullImage.alt = 'Изображение города';
    titleFullImage.textContent = 'Описание изображения';

    togglePopup(popupFullImage);
});

// Фн-ия открытия и загрузки данных в попап
function showFullImage(titleImage, linkImage) {
    imageFullImage.src = linkImage;
    titleFullImage.textContent = titleImage;

    togglePopup(popupFullImage);
}


    //###############//
   // Общие функции //
  //###############//

// при инициализации страницы
initialCards.forEach(addPlaces);

// Фн-ия открытия и закрытия Попап
function togglePopup(elementForm = '') {
    if ( elementForm ) elementForm.classList.toggle("popup_opened")
    else alert('Ошибка: не найдена popup-форма');
}

//если нет places(карточек), то показать текст "нет добавленных.."
function checkNoPlaces() {
    const listItems = [...elementsContainer.querySelectorAll("li")];
    if ( !listItems || !listItems.length ) elementsNoPlaces.removeAttribute('hidden')
    else if ( listItems.length ) elementsNoPlaces.setAttribute('hidden',"true");
}