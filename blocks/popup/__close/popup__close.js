// определяем кнопку Закрытия попап окна
let profile__close_btn = document.querySelector('.popup__close');

// если есть модальное окно и кнопка закрытия была найдена,
if ( typeof profile__close_btn !== "undefined" && typeof popup_modal !== "undefined" ) {
    //то добавить обротчик клика на найденную кнопку
    profile__close_btn.addEventListener('click', function () {
        // нажав на которую, из модального окна будет удалён класс, который делает его видимым
        popup_modal.classList.remove("popup_opened");
    });
}