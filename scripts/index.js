// определяем эл-ты Профиля
let editProfile = document.querySelector('.profile__edit'),
    nameProfile = document.querySelector('.profile__name'),
    jobProfile  = document.querySelector('.profile__job');

// определяем эл-ты попап-окна Редактирования Профиля
let modalPopup = document.querySelector('.popup'),
    namePopup  = modalPopup.querySelector('.popup__input_type_name'),
    jobPopup   = modalPopup.querySelector('.popup__input_type_job'),
    closePopup = modalPopup.querySelector('.popup__close');

// обработчик клика кнопки Редактирования Профиля
editProfile.addEventListener('click', function (event) {
    namePopup.value = nameProfile.textContent;
    jobPopup.value  = jobProfile.textContent;
    showPopup();
});

// Функция открытия попап-окна Редактирования Профиля
function showPopup() {
    modalPopup.classList.add("popup_opened");
}

// обработчик клика кнопки X - закрытия попап-окна Редактирования Профиля
closePopup.addEventListener('click', function () {
    hidePopup();
});

// Функция закрытия попап-окна Редактирования Профиля
function hidePopup() {
    modalPopup.classList.remove("popup_opened");
}

// Функция сохранения данных полей формы попап-окна Редактирования Профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    let nameSaved = namePopup.value,
        jobSaved  = jobPopup.value;

    if ( nameSaved.length && jobSaved.length ) {
        nameProfile.textContent = nameSaved;
        jobProfile.textContent  = jobSaved;
        hidePopup();
    }
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
modalPopup.addEventListener('submit', handleFormSubmit);