const elementsNoPlaces = document.querySelector('.elements__no-places');
export const elementsContainer = document.querySelector('.elements__collection');

    //###############//
   // Общие функции //
  //###############//

// Фн-ия открытия Попап
export function openPopup(elementForm) {
    elementForm.classList.add("popup_opened");

    document.addEventListener('keydown', closeByEscape);
}

//если нет places(карточек), то показать текст "нет добавленных.."
export function checkNoPlaces() {
    const listItems = [...elementsContainer.querySelectorAll("li")];
    if ( !listItems || !listItems.length ) elementsNoPlaces.removeAttribute('hidden')
    else if ( listItems.length ) elementsNoPlaces.setAttribute('hidden',"true");
}

// ф-ия закрытия попап по нажатию клавиши ESC
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup)
    }
}

// Фн-ия закрытия Попап
export function closePopup(elementPopup) {
    elementPopup.classList.remove("popup_opened");

    document.removeEventListener('keydown', closeByEscape);
}